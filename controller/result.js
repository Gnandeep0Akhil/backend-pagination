const { populationModel } = require('../model/model');

const results = function (value) {

    var state = value.state.toUpperCase();
    var city = value.city.toUpperCase();
    var sortField = value.sortField;
    var sortOrder = parseInt(value.sortOrder);
    var rows = parseInt(value.rowNumb);
    var pageNumb = parseInt(value.pageNumb);
    var sort; var match;

    switch (sortField) {
        case 'state':
            sort = { 'state': sortOrder }
            break;
        case 'city':
            sort = { 'city': sortOrder }
            break;
        case 'pop':
            sort = { 'pop': sortOrder };
            break;
        default:
            sort = { 'pop': -1 };
    }

    if( state !== "" && city !== ""){
        match = {
            'state': state,
            'city': city
        }
    }else if( state !== "" ){
        match = {
            'state': state
        }
    }else if(city !== ""){
        match = {
            'city': city
        }
    }else{
        match = {
            'state': "",
            'city': ""
        }
    }

    var pipeline = [
    {
        '$match': match
    }, {
        '$sort': sort
    }, {
        '$skip': (pageNumb -1)*rows
    }, {
        '$limit': rows
    }
    ];

    return new Promise ((resolve, reject) => {

        populationModel.aggregate(pipeline).exec()
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject (err);
            })
     })
}

module.exports.results = results;


const cities = function (numb) {
    var many = parseInt(numb.numb);

    var pipe = [
        {
            '$group': {
            '_id': '$city', 
            'pop': {
                '$sum': '$pop'
            }
            }
        }, {
            '$sort': {
            'pop': -1
            }
        }, {
            '$limit': many
        }
        ];

    return new Promise ((resolve, reject) => {

        populationModel.aggregate(pipe).exec()
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject (err);
            })
     })
}

module.exports.cities = cities;
