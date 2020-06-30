const net = require('net');

const client = new net.Socket();
client.connect(8124,'ec2-3-121-109-138.eu-central-1.compute.amazonaws.com', () => {
    console.log('client connecting...');
    //client.write('Hello, server! from client');
});

client.on('data', (data) => {
    console.log('server sends back: ' + data);
});

client.on('close', () => {
    console.log('Connection closed');
});

// send data from sensor to server
setInterval(() => {
    let data = Math.round(Math.random() * 10);
    let JSONData = JSON.stringify(data);
    client.write(JSONData);
    console.log('...sending data ' + JSONData);
}, 1000)