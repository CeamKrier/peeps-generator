import React from 'react';

export const Footer = () => {
	return (
		<div className='footer'>
			<div>
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://github.com/CeamKrier/peeps-generator'
					className='boldText removeDefaultAnchorStyle'>
					open source
				</a>{' '}
				and libraries available for{' '}
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://github.com/CeamKrier/react-peeps'
					className='boldText removeDefaultAnchorStyle'>
					react
				</a>{' '}
				and{' '}
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://github.com/CeamKrier/react-native-peeps'
					className='boldText removeDefaultAnchorStyle'>
					react native
				</a>
			</div>
			<div className='signature'>
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://ceamkrier.github.io/'
					className='boldText removeDefaultAnchorStyle'>
					ceamkrier
				</a>
			</div>
		</div>
	);
};
