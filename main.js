const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiV1 = require('./api/v1.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/v1', apiV1);
app.use(cors());

const server = app.listen(8081, ()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Your application is running at ${host}:${port}`);
})

app.get('/',(req, res) => {
    res.sendfile(`${__dirname}/template/list.html`);
    res.setHeader('Content-Type', 'text/html');
})
app.get('/list',(req, res) => {
    res.sendfile(`${__dirname}/template/list.html`);
    res.setHeader('Content-Type', 'text/html');
})
app.get('/add',(req, res) => {
    res.sendfile(`${__dirname}/template/add.html`);
    res.setHeader('Content-Type', 'text/html');
})
app.get('/edit',(req, res) => {
    res.sendfile(`${__dirname}/template/edit.html`);
    res.setHeader('Content-Type', 'text/html');
})

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
