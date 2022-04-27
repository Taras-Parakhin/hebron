const express = require('express');
const hbs = require('express-handlebars');
const {engine} = require("express-handlebars");
const DBUsers = require('./dataBase/users');
const DBCars = require('./dataBase/cars');

const app = express();

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

app.get('/', (req, res) => {
    res.render('welcome');
});

app.get('/users', (req, res) => {
    res.render('users', {DBUsers});
});

app.get('/users/:userIndex', (req, res) =>{
    const {userIndex} = req.params;
    res.json(DBUsers[userIndex]);
});

app.get('/cars', (req, res) => {
    res.render('cars', {DBCars});
});

app.get('/cars/:carIndex', (req, res) =>{
    const {carIndex} = req.params;
    res.json(DBCars[carIndex]);
});

app.listen(5000, () => {
    console.log('App listen 5000');
});

