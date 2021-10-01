var express = require('express');
var router = express.Router();
var { results, cities } = require('../controller/result');


router.get('/get/max', (req, res)=>{
    var numb = req.query;

    cities(numb)
        .then((sites) => {
            res.render('max', { sites: sites });
        })
        .catch(() => {
            res.send('Revisit and Check in form details.');
        })
})

router.get('/get', (req, res)=>{
    var value = req.query;

    results(value)
        .then((docs) => {
            res.render('table', { docs: docs });
        })
        .catch(() => {
            res.send('Revisit and Check in form details.');
        })
})

router.get('/', (req, res)=>{
    res.render('init');
})

module.exports = router;