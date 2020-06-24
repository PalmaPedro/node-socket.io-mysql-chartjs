const net = require('net');

const client = new net.Socket();
client.connect(8124,'localhost', () => {
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
    const data = Math.round(Math.random() * 10);
    const JSONData = JSON.stringify(data);
    client.write(JSONData);
    console.log('...sending data ' + JSONData);
}, 1000)