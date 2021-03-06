const model = require('../model');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const {Sequelize} = require("sequelize");

let
    User = model.user,
    Filmlist = model.filmlist,
    Order = model.order;

var CR_OrderFilm = async(ctx, next) => {
    var requestBody;
    if(typeof ctx.request.body == 'string') {
        requestBody = JSON.parse(ctx.request.body);
    } else {
        requestBody = ctx.request.body;
    }
    //let requestBody = JSON.parse(ctx.request.body);
    //let requestBody = ctx.request.body;
    let
        username = requestBody.username || '',
        filmid = requestBody.filmid || 0;

    try {
        const _result = await db.sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
            var userinfo = await User.findAll({
                where: {
                    username: username
                }
            });
            let userid = userinfo[0].id;
            var filminfo = await Filmlist.findAll({
                where: {
                    id: filmid
                }
            });
            var ticketRemain = filminfo[0].ticketRemain;
            ticketRemain = ticketRemain - 1;
            var updateresult = await Filmlist.update({
                ticketRemain: ticketRemain
            }, {
                where: {
                    id: filmid
                }
            })

            var newOrder = await Order.create({
                userid: userid,
                filmid: filmid
            });
        })
    } catch (error) {
        console.log(error);
    }

    ctx.response.status = 200
}

module.exports = {
    'GET /orderfilm' : CR_OrderFilm,
    'POST /orderfilm' : CR_OrderFilm
};