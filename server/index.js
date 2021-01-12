require('ignore-styles');

require('@babel/register')({
	ignore: [/(node_modules)/],
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	extensions: ['.tsx', '.js'],
});

require('./server');
