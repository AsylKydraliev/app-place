const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require("./config");

const users = require('./routes/user');
const places = require('./routes/place');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/users', users);
app.use('/places', places);
app.use(express.static('public'));

const run = async() => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`App listen on port ${port}!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
}

run().catch(e => console.error(e));