import express from 'express';
import path from 'path';
import compression from 'compression';
import HomeRoute from './routes/home';
import Config from './config';

const server = express();
const port = process.env.PORT || 8080;

server.use(compression());

server
	.disable('x-powered-by')
	.use(express.static(path.resolve(Config.BUILD_FOLDER_PATH), { index: false }))
	.get('*', HomeRoute);

server.listen(port, () => {
	console.log('Server is up and running on port ' + port);
});
