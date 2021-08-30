const model = require('../model');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const {Sequelize} = require("sequelize");

let
    User = model.user,
    Filmlist = model.filmlist,
    Order = model.order;

var CR_InitUser = async(ctx, next) => {
    var requestBody;
    if(typeof ctx.request.body == 'string') {
        requestBody = JSON.parse(ctx.request.body);
    } else {
        requestBody = ctx.request.body;
    }
    //let requestBody = JSON.parse(ctx.request.body);
    //let requestBody = ctx.request.body;
    let
        username = requestBody.username || '';
    try {
        const _result = await db.sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
            var userinfo = await User.findAll({
                where: {
                    username: username
                }
            });
            if(userinfo.length <= 0) {
                var result = await User.create({
                    username: username
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
    ctx.response.status = 200
}

module.exports = {
    'GET /inituser' : CR_InitUser,
    'POST /inituser' : CR_InitUser
};