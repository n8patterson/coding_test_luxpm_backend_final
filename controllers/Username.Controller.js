const db = require('../config/sequelize');
const Username = db.usernames;
const {spawn} = require('child_process');

let runProcessUserName = (username) => {
    return new Promise((resolve, reject) => {
        const processedStringProg = spawn('python', ['./encrypt.py', '--string', username])

        processedStringProg.stdout.on('data', (data) => {   
            resolve(JSON.parse(data));
        });

        processedStringProg.stderr.on('data', (data) => {
            reject('Could not encrypt string');
        });   
    })
}

exports.processUsername = async (req, res) => {
    const data = await runProcessUserName(req.body.username);
    Username.findOne({ where: { raw_username: req.body.username } })
        .then((usernameExists) => {
            if (usernameExists) {
                return res.status(200).send(usernameExists);
            }
            let splitLettersCharacter = Username.setLettersAndCharacters(data.processed_string);
            return Username.create({
                    raw_username: req.body.username,
                    characters: splitLettersCharacter.characters.join(','),
                    letters: splitLettersCharacter.letters.join(','), 
                    username_json: data
                })
                .then((newUser) => {
                    return res.status(200).send(newUser);   
                });
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
};

exports.getAllUsernames = async (req, res) => {
    Username.findAll()
        .then((usernamesData) => {
            if (usernamesData) {
                return res.status(200).send(usernamesData);
            }
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
};