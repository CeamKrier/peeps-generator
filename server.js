const express = require('express');
const path = require('path');
const compression = require('compression')
const server = express();
const port = process.env.PORT || 8080;

server.use(compression())
server.use(express.static(path.join(__dirname, 'build')));

server.get('*', (req, res) => {
	res.sendfile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => {
	console.log('Server is up and running on port ' + port);
});
