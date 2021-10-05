var username = require("../controllers/Username.Controller");
const { check, validationResult } = require('express-validator');

module.exports = (app) => {
    app.post("/username", [
        check('username').exists().trim().escape()
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        username.processUsername(req, res)
    });

    app.get("/usernames", (req, res) => {
        username.getAllUsernames(req, res)
    });
};