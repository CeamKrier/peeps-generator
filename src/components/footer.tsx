import React from 'react';

export const Footer = () => {
	return (
		<div className='footer'>
			<div>
				library available for both{' '}
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
		</div>
	);
};
