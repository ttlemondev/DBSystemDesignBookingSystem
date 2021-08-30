const db = require('../db');

module.exports = db.defineModel('order', {
    userid: {
        type: db.INTEGER()
    },
    filmid: {
        type: db.INTEGER()
    }
});