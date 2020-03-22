import express, { Request, Response } from 'express'
const path = require('path');
const server = express();
const port = process.env.PORT || 8080;

server.use(express.static(path.join(__dirname, 'build')));
console.log(path.join(__dirname, 'build'));

server.get('/', (req: Request, res: Response) => {
	res.sendfile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => {
	console.log('Server is up and running on port ' + port);
});
