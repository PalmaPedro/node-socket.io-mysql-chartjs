const express = require('express');
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);
const net = require('net');
const Data = require('./models/Data.js');

const fs = require('fs');
const dashboardPage = fs.readFileSync("./public/dashboard.html", "utf8");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup objection and knex
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);

Model.knex(knex);

// get incoming data, store it in db and send it to the browser
const netServer = net.createServer((socket) => {
    console.log('client connected');
    socket.on('data', (incomingJSONData) => {
        temperature = JSON.parse(incomingJSONData);
        try {
            // store data in db before sending to browser
            Data.query().insert({ temperature }).then(data => {
                console.log('Storing data...' + temperature);
            })
        } catch (error) {
            console.error("Error inserting data.");
        }  
    });
});

// socket.io
io.on('connection', socket => {
    socket.on('temperature', value => {
        io.emit('temperature', value)
    });
});

/*
let id = 0;
// fetch data from db and send it to the browser to be rendered
setInterval(() => {
    if (id++) {
        try {
            Data.query().select('data.*').where({ 'id': id }).then((results) => {
                const temperature = results[0].temperature;
                console.log('sending data to browser...' + temperature);
                io.emit('temperature', temperature);
            });
        } catch (error) {
            console.log('error sending data to browser');
        }
    }
}, 1000); */

// session

// add routes
app.get('/', (req, res) => {
    return res.send(dashboardPage);
});

// server is listening for incoming connection from a sensor
const SENSOR_PORT = 8124;
netServer.listen(SENSOR_PORT, 'localhost', () => {
    console.log('waiting for client...');
});

// start webserver
const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log('Server is running on port', PORT);
});