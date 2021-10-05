module.exports = (sequelize, Sequelize) => {
    const Username = sequelize.define('username', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        raw_username: { type: Sequelize.STRING, allowNull: false },
        characters: { type: Sequelize.STRING, allowNull: false },
        letters: { type: Sequelize.STRING, allowNull: false },
        username_json: { type: Sequelize.JSON, allowNull: false },

        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });

    Username.setLettersAndCharacters = function (username) {
        let splitCharacterArray = username.match(/[a-z]+|[^a-z]+/gi);
        let characters = [];
        let letters = [];

        for(let i = 0; i < splitCharacterArray.length; i++){
            if(i%2 === 0){
                characters.push(splitCharacterArray[i]);
            }else{
                letters.push(splitCharacterArray[i]);
            }
        }

        return {
            characters: characters,
            letters: letters
        }
    };

    return Username;
}