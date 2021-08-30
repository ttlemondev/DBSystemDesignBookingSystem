const model = require('../model');
const { v4: uuidv4 } = require('uuid');

let
    User = model.user,
    Filmlist = model.filmlist,
    Order = model.order;

var CR_GetOrderList = async(ctx, next) => {
    var requestBody;
    if(typeof ctx.request.body == 'string') {
        requestBody = JSON.parse(ctx.request.body);
    } else {
        requestBody = ctx.request.body;
    }
    let
        username = requestBody.username || '';
    var userinfo = await User.findAll({
        where: {
            username: username
        }
    });
    let userid = userinfo[0].id;
    var filmlist = await Filmlist.findAll();
    let orderlist = await Order.findAll({
        where: {
            userid: userid
        }
    });
    var result = [];
    for(let i in orderlist) {
        let filmid = orderlist[i].filmid;
        for(let j in filmlist) {
            if(filmlist[j].id == filmid) {
                result.push(filmlist[j]);
                break
            }
        }
    }

    //console.log(filmlist)
    ctx.response.body = JSON.stringify(result)
    ctx.response.status = 200
}

module.exports = {
    'GET /getorderlist' : CR_GetOrderList,
    'POST /getorderlist' : CR_GetOrderList
};