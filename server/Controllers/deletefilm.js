const model = require('../model');
const { v4: uuidv4 } = require('uuid');

let
    User = model.user,
    Filmlist = model.filmlist,
    Order = model.order;

var CR_DeleteFilm = async(ctx, next) => {
    var requestBody;
    if(typeof ctx.request.body == 'string') {
        requestBody = JSON.parse(ctx.request.body);
    } else {
        requestBody = ctx.request.body;
    }
    let filmid = requestBody.filmid || '-1';
    let fresult = await Filmlist.destroy({
        where: {
            id: filmid
        }
    })
    let oresult = await Order.destroy({
        where: {
            filmid: filmid
        }
    })
    ctx.response.status = 200
}

module.exports = {
    'GET /deletefilm' : CR_DeleteFilm,
    'POST /deletefilm' : CR_DeleteFilm
};