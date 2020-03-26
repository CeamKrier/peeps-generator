import React, { useState, useEffect } from 'react';
import { ColorResult, BlockPicker } from 'react-color';
import { useProvider } from '../utils/contextProvider';

export const ColorPicker = () => {
	const { state, dispatch } = useProvider();
	const { strokeColor } = state;
	const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
	const [rgbColorString, setRgbColorString] = useState('rgba(0 0 0 1)')
	const initialColors = [
		'#4D4D4D',
		'#999999',
		'#F44E3B',
		'#FE9200',
		'#FCDC00',
		'#DBDF00',
		'#A4DD00',
		'#68CCCA',
		'#73D8FF',
		'#AEA1FF',
		'#FDA1FF',
		'#333333',
		'#808080',
		'#cccccc',
		'#D33115'
	];

	useEffect(() => {
		setRgbColorString(`rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${strokeColor.a})`)
	}, [strokeColor])

	const handleColorChange = (color: ColorResult) => {
		dispatch({
			type: 'SET_STROKE_COLOR',
			payload: color.rgb
		});
	};

	const handlePickerVisibiltyChange = (isVisible?: boolean) => {
		return () => {
			isVisible === false
				? setDisplayColorPicker(isVisible)
				: setDisplayColorPicker(!displayColorPicker);
		};
	};
	return (
		<div className='colorIndicator'>
			<div
				className='colorSwatch'
				style={{
					boxShadow: `0 0 0 2px ${rgbColorString}`
				}}
				onClick={handlePickerVisibiltyChange()}>
				<div
					className='pickedColor'
					style={{
						background: rgbColorString
					}}
				/>
			</div>
			{displayColorPicker ? (
				<div className='colorPopover'>
					<div
						className='colorCover'
						onClick={handlePickerVisibiltyChange(false)}
					/>
					<BlockPicker
						triangle='hide'
						color={strokeColor}
						onChange={handleColorChange}
						colors={initialColors}
					/>
				</div>
			) : null}
		</div>
	);
};
