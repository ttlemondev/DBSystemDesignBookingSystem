const db = require('../db');

module.exports = db.defineModel('filmlist', {
    name: {
        type: db.STRING(100)
    },
    director: {
        type: db.STRING(10)
    },
    theater: {
        type: db.STRING(10)
    },
    time: {
        type: db.STRING(100)
    },
    ticketSum: {
        type: db.INTEGER(10)
    },
    ticketRemain: {
        type: db.INTEGER(10)
    },
    price: {
        type: db.INTEGER(10)
    }
});