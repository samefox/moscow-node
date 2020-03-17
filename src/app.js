const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    const origins = [
        'http://localhost:3000'
    ];

    for(let i = 0; i < origins.length; i++) {
        let origin = origins[i];

        if (req.headers.origin.indexOf(origin) > -1) {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});
app.use('/', routes);

mongoose.set('useCreateIndex', true);
mongoose.connect(
    'mongodb://localhost:27017/moscow-test-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function (error) {
        if (error) {
            return console.log(error);
        }
        app.listen(3001);
    }
);

module.exports = app;
