import express from 'express';
import path from 'path';
import compression from 'compression';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { PeepsGenerator } from '../src/components/App';
import { Provider } from '../src/utils/contextProvider';

const server = express();
const port = process.env.PORT || 8080;

server.use(compression());

server
	.disable('x-powered-by')
	.use(express.static(path.resolve('./build'), { index: false }))
	.get('/', (req, res) => {
		fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
			if (err) {
				res.status(500).send('Could not read the public file');
			}
			return res.send(
				data.replace(
					'<div id="main"></div>',
					`<div id="main">${ReactDOMServer.renderToString(
						<Provider>
							<PeepsGenerator />
						</Provider>
					)}</div>`
				)
			);
		});
	});

server.listen(port, () => {
	console.log('Server is up and running on port ' + port);
});
