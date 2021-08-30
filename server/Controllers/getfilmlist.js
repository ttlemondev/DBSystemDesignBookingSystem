const model = require('../model');
const { v4: uuidv4 } = require('uuid');

let
    User = model.user,
    Filmlist = model.filmlist;

var CR_GetFilmList = async(ctx, next) => {
    var requestBody;
    if(typeof ctx.request.body == 'string') {
        requestBody = JSON.parse(ctx.request.body);
    } else {
        requestBody = ctx.request.body;
    }
    let filmid = requestBody.filmid || '-1';
    var filmlist;

    if(filmid != '-1') {
        filmlist = await Filmlist.findAll({
            where: {
                id: filmid
            }
        })
    } else {
        filmlist = await Filmlist.findAll()
    }

    //console.log(filmlist)
    ctx.response.body = JSON.stringify(filmlist)
    ctx.response.status = 200
}

module.exports = {
    'GET /getfilmlist' : CR_GetFilmList,
    'POST /getfilmlist' : CR_GetFilmList
};