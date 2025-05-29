import express from 'express';
import path from 'path';
import compression from 'compression';
import HomeRoute from './routes/home';
import Config from './config';

const server = express();
const port = process.env.PORT || 8080;

// It's good practice to use helmet for security headers
// import helmet from 'helmet';
// server.use(helmet());

server.use(compression());

// Body parsing middleware - uncomment if you need to handle POST/PUT requests with JSON or URL-encoded data
// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

server
	.disable('x-powered-by')
	.use(express.static(path.resolve(Config.BUILD_FOLDER_PATH), { index: false }))
	.get('*', HomeRoute);

// Centralized error handling middleware
server.use((err, req, res, next) => {
	console.error(err.stack);
	// Send a generic error response
	// In a real application, you might want to send different responses based on error type or environment
	res.status(500).send('Something broke!');
});

server.listen(port, () => {
	console.log('Server is up and running on port ' + port);
});
