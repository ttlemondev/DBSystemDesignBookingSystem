const db = require('../db');

module.exports = db.defineModel('user', {
    username: {
        type: db.STRING(100)
    }
});