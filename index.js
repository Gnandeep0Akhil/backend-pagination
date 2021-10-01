const express = require('express');
const port = process.env.PORT || 5000;
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var Router = require('./route/main')
app.use('/', Router)

app.listen(port, ()=>{
    console.log('Listining to port:', port);
})