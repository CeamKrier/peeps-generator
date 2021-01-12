import React, { useEffect, useMemo } from 'react';
import { useProvider } from '../utils/contextProvider';
import { ColorResult, ChromePicker } from 'react-color';
import { ReducerAction } from '../utils/types';

interface ColorWheelType {
	color: string;
	target: 'first' | 'second';
	type?: 'Background' | 'Foreground'
}

export const ColorWheel: React.FC<ColorWheelType> = ({ color, target, type }) => {
	const { dispatch } = useProvider();

	useEffect(() => {
		document.querySelectorAll('.flexbox-fix')[1].remove();
	}, []);

	const colorDispatchKeyHolder = useMemo(() => {
		const keys = {firstColor: '', secondColor: ''}
		if (type === 'Background') {
			keys.firstColor = 'SET_BACKGROUND_FIRST_GRADIENT_COLOR';
			keys.secondColor = 'SET_BACKGROUND_SECOND_GRADIENT_COLOR';
		} else {
			keys.firstColor = 'SET_FOREGROUND_FIRST_COLOR';
			keys.secondColor = 'SET_FOREGROUND_SECOND_COLOR';
		}
		return keys
	}, [color])

	return (
		<ChromePicker
			disableAlpha
			color={color}
			onChange={(pickedColor: ColorResult) => {
				const requestType =
					target === 'first' ? colorDispatchKeyHolder.firstColor : colorDispatchKeyHolder.secondColor;
				dispatch({
					type: requestType as ReducerAction,
					payload: pickedColor.hex,
				});
			}}
		/>
	);
};
