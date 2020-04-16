import React, { useEffect } from 'react';
import { useProvider } from '../utils/contextProvider';
import { ColorResult, ChromePicker } from 'react-color';

interface ColorWheelType {
	color: string;
	target: 'first' | 'second';
}

export const ColorWheel: React.FC<ColorWheelType> = ({ color, target }) => {
	const { dispatch } = useProvider();

	useEffect(() => {
		document.querySelectorAll('.flexbox-fix')[1].remove();
	}, []);

	return (
		<ChromePicker
			disableAlpha
			color={color}
			onChange={(pickedColor: ColorResult) => {
				const requestType =
					target === 'first' ? 'SET_FIRST_COLOR' : 'SET_SECOND_COLOR';
				dispatch({
					type: requestType,
					payload: pickedColor.hex,
				});
			}}
		/>
	);
};
