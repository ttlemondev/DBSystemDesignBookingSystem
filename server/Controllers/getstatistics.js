const model = require('../model');
const { v4: uuidv4 } = require('uuid');

let
    User = model.user,
    Filmlist = model.filmlist,
    Order = model.order;

var CR_GetStatisticsList = async(ctx, next) => {
    var filmlist = await Order.findAll({
        group: "filmid",
        raw: true
    });
    var orderlist = await Order.count({
        group: "filmid"
    });
    for(let i in filmlist) {
        filmlist[i].count = orderlist[i].count
    }


    //console.log(filmlist)
    filmlist.sort((a,b) => {return (b.count - a.count)})

    var flist = await  Filmlist.findAll(({
        raw: true
    }))

    var result = [];
    for(let i in filmlist) {
        let filmid = filmlist[i].filmid;
        for(let j in flist) {
            if(flist[j].id == filmid) {
                let temp = flist[j];
                temp.count = filmlist[i].count;
                result.push(temp);
                break
            }
        }
    }

    ctx.response.body = JSON.stringify(result)
    ctx.response.status = 200
}

module.exports = {
    'GET /getstatisticslist' : CR_GetStatisticsList,
    'POST /getstatisticslist' : CR_GetStatisticsList
};