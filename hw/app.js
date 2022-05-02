const express = require('express');
const {engine} = require("express-handlebars");

const {PORT} = require('/config/config');
const userRouter = require('./routes/user.router');
const carRouter = require('./routes/car.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

app.use('/users', userRouter);
app.use('/cars', carRouter);

app.get('/', (req, res) => {
    res.render('welcome');
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
