import React, { useState, useMemo } from 'react';
import { ColorResult, BlockPicker } from 'react-color';
import { GradientBuilder } from './gradientBuilder';
import { useProvider } from '../utils/contextProvider';

type ColoringType = 'basic' | 'gradient';

const ColorPicker = () => {
	const { state, dispatch } = useProvider();
	const { strokeColor } = state;
	const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
	const [colorType, setColorType] = useState<ColoringType>('basic');
	const initialColors = [
		'#4D4D4D',
		'#999999',
		'#2e8a57',
		'#FE9200',
		'#fe1694',
		'#33cd33',
		'#8a2ae3',
		'#68CCCA',
		'#73D8FF',
		'#AEA1FF',
		'#7f8000',
		'#000000',
		'#81087f',
		'#cccccc',
		'#D33115'
	];

	const handleColorChange = (color: ColorResult) => {
		dispatch({
			type: 'SET_STROKE_COLOR',
			payload: color.hex
		});
	};

	const handlePickerVisibiltyChange = (isVisible?: boolean) => {
		return () => {
			isVisible === false
				? setDisplayColorPicker(isVisible)
				: setDisplayColorPicker(!displayColorPicker);
		};
	};

	const adjustStrokeColor = () => {
		return typeof strokeColor === 'object'
			? `linear-gradient(${strokeColor.degree || 0}, ${
					strokeColor.firstColor
			  }, ${strokeColor.secondColor})`
			: strokeColor;
	};

	const handleColorTypeChange = (type: ColoringType) => {
		return () => {
			setColorType(type);
		};
	};

	const renderBasicPalette = useMemo(() => {
		return (
			<div className='basicPicker'>
				<BlockPicker
					triangle='hide'
					color={adjustStrokeColor()}
					onChange={handleColorChange}
					colors={initialColors}
				/>
				<div
					className='colorTypeChangeButton gradientColorButton'
					onClick={handleColorTypeChange('gradient')}>
					G
				</div>
			</div>
		);
	}, [initialColors]);

	const renderGradientPalette = useMemo(() => {
		return (
			<div className='gradientPicker'>
				<GradientBuilder />
				<div
					className='colorTypeChangeButton basicColorButton'
					onClick={handleColorTypeChange('basic')}>
					B
				</div>
			</div>
		);
	}, []);

	return useMemo(() => {
		return (
			<div className='colorIndicator'>
				<div
					className='colorSwatch'
					style={{
						boxShadow: `0 0 0 2px ${adjustStrokeColor()}`
					}}
					onClick={handlePickerVisibiltyChange()}>
					<div
						className='pickedColor'
						style={{
							background: adjustStrokeColor()
						}}
					/>
				</div>
				{displayColorPicker ? (
					<div className='colorPopover'>
						<div
							className='colorCover'
							onClick={handlePickerVisibiltyChange(false)}
						/>
						{colorType === 'basic' ? renderBasicPalette : renderGradientPalette}
					</div>
				) : null}
			</div>
		);
	}, [displayColorPicker, initialColors, colorType]);
};

export default ColorPicker;
