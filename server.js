const express = require('express');
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const net = require('net');
const shortid = require('shortid');

const fs = require('fs');
const navbarPage = fs.readFileSync("./public/navbar.html", "utf8");
const dashboardPage = fs.readFileSync("./public/dashboard.html", "utf8");
const footerPage = fs.readFileSync("./public/footer.html", "utf8");
const homePage = fs.readFileSync("./public/home.html", "utf8");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

// session
const session = require('express-session');

// You need to copy the config.template.json file and fill out your own secret
const config = require('./config/config.json');

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}));

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 8 // limit each IP to 8 requests per windowMs
});

// setup objection and knex
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');
const Data = require('./models/Data.js');
const Sensor = require('./models/Sensor.js');

const knex = Knex(knexFile.development);

Model.knex(knex);

const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const sensorsRoute = require('./routes/sensors.js');
const dashboardsRoute = require('./routes/dashboards.js');
app.use(authRoute);
app.use(usersRoute);
app.use(sensorsRoute);
app.use(dashboardsRoute);

// add routes
app.get('/', (req, res) => {
  return res.send(navbarPage + homePage + footerPage);
});

app.get('/dashboard', (req, res) => {
    return res.send(navbarPage + dashboardPage);
});

// socket.io
io.on('connection', socket => {
    socket.on('temperature', value => {
        io.emit('temperature', value)
    });
});

// get incoming data, store it in db and send it to the browser
const netServer = net.createServer((socket) => {
    // generate socket id and store it in db
    socket.id = shortid.generate();
    serial_no = socket.id;
    let sens;
    try {
      Sensor.query().insert({ serial_no }).then((sensor) => {
          sens = sensor;
          console.log(`client connected [id=${sensor.serial_no}]`);
        });
    } catch (error) {
      console.log("error inserting data");
    }
    // get temperature data
    socket.on("data", (incomingJSONData) => {
      temperature = JSON.parse(incomingJSONData);
      try {
        // store data in db before sending to browser
        Data.query().insert({ temperature, sensor_id: sens.id }).then((data) => {
            console.log("storing data..." + temperature);
            console.log("sending data to browser..." + temperature);
            io.emit("temperature", temperature);
          });
      } catch (error) {
        console.error("Error inserting data.");
      }
    });
  });


// server is listening for incoming connection from a sensor
const SENSOR_PORT = 8124;
netServer.listen(SENSOR_PORT, 'ec2-3-121-109-138.eu-central-1.compute.amazonaws.com', () => {
    console.log('waiting for client...');
});

// start webserver
server.listen(3000, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("The server is running on port", 3000);
  });