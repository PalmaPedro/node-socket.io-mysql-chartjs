# node-socket.io-mysql-chartjs

Project with nodejs-socket.io-mysql-chartjs (using objection for ORM)

First run server.js and then client.js

The client will start to generate random numbers and send them to the server using plain sockets. When the server starts receiving data sent from the client, stores it to db and after
sends them, using socket.io to the browser. This data will be rendered using the library chartjs into a graphic, which will be displayed in the browser.
