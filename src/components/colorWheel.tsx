import React from 'react';
import { useProvider } from '../utils/contextProvider';
import GradientColorPicker from './gradientColorPicker';

interface ColorWheelType {
	color: string;
	target: 'first' | 'second';
}

export const ColorWheel: React.FC<ColorWheelType> = ({ color, target  }) => {
	const { dispatch } = useProvider();

	return (
		//@ts-ignore
		<GradientColorPicker color={color} onChange={(pickedColor) => {
			const requestType =
				target === 'first' ? 'SET_FIRST_COLOR' : 'SET_SECOND_COLOR';
			dispatch({
				type: requestType,
				payload: pickedColor.hex,
			});
		}} />
	);
};

