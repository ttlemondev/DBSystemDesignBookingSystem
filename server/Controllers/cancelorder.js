const model = require('../model');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const {Sequelize} = require("sequelize");

let
    User = model.user,
    Filmlist = model.filmlist,
    Order = model.order;

var CR_CancelOrder = async(ctx, next) => {
    var requestBody;
    if(typeof ctx.request.body == 'string') {
        requestBody = JSON.parse(ctx.request.body);
    } else {
        requestBody = ctx.request.body;
    }
    let filmid = requestBody.filmid || '-1',
        username = requestBody.username || '';

    try {
        const _result = await db.sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
            let uresult = await User.findAll({
                where: {
                    username: username
                }
            })
            let userid = uresult[0].id;
            let oresult = await Order.destroy({
                where: {
                    filmid: filmid,
                    userid: userid
                },
                limit: 1
            })

            var filminfo = await Filmlist.findAll({
                where: {
                    id: filmid
                }
            });
            var ticketRemain = filminfo[0].ticketRemain;
            ticketRemain = ticketRemain + 1;
            var updateresult = await Filmlist.update({
                ticketRemain: ticketRemain
            }, {
                where: {
                    id: filmid
                }
            })
        });
    } catch (error) {
        console.log(error)
    }

    ctx.response.status = 200
}

module.exports = {
    'GET /cancelorder' : CR_CancelOrder,
    'POST /cancelorder' : CR_CancelOrder
};