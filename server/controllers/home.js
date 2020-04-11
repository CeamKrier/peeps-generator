import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import fs from 'fs';
import Config from '../config';

import { PeepsGenerator } from '../../src/components/App';
import { Provider } from '../../src/utils/contextProvider';

const renderAppToString = () => {
	return ReactDOMServer.renderToString(
		<Provider>
			<PeepsGenerator />
		</Provider>
	);
};

export const serveApp = (req, res) => {
	fs.readFile(path.resolve(Config.HTML_FILE_PATH), 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send('Public folder could not accessed');
		}
		return res.send(
			data.replace(
				'<div id="main"></div>',
				`<div id="main">${renderAppToString()}</div>`
			)
		);
	});
};
