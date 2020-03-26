import React from 'react';
import ReactDOM from 'react-dom';
import { PeepsGenerator } from './components/App';
import { Provider } from './utils/contextProvider';
import * as serviceWorker from './serviceWorker';

import 'rc-slider/assets/index.css';
import './styles/index.css';

ReactDOM.render(
	<Provider>
		<PeepsGenerator />
	</Provider>,
	document.getElementById('main')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
