const model = require('../model');
const { v4: uuidv4 } = require('uuid');

let
    User = model.user,
    Filmlist = model.filmlist;

var CR_AddFilm = async(ctx, next) => {
    var requestBody;
    if(typeof ctx.request.body == 'string') {
        requestBody = JSON.parse(ctx.request.body);
    } else {
        requestBody = ctx.request.body;
    }
    //let requestBody = JSON.parse(ctx.request.body);
    //let requestBody = ctx.request.body;
    let
        name = requestBody.name || '',
        director = requestBody.director || '',
        time = requestBody.time || '',
        theater = requestBody.theater || '',
        ticket = requestBody.ticket || 0,
        price = requestBody.price || 0;
    console.log(typeof(requestBody))
    console.log(name)


    var newFilm = await Filmlist.create({
        name: name,
        director: director,
        time: time,
        theater: theater,
        ticketSum: ticket,
        ticketRemain: ticket,
        price: price
    });
    ctx.response.status = 200
}

module.exports = {
    'GET /addfilm' : CR_AddFilm,
    'POST /addfilm' : CR_AddFilm
};