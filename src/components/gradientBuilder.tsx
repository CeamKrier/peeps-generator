import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useProvider } from '../utils/contextProvider';
import { EditableInput } from 'react-color/lib/components/common';
// @ts-ignore
import CircularSlider from './circularSlider';
import { ColorResult } from 'react-color';
//@ts-ignore
import { isValidHex } from 'react-color/lib/helpers/color';
import { GradientType } from 'react-peeps/lib/peeps/types';
import { ColorWheel } from './colorWheel';

export const GradientBuilder = () => {
	const { state, dispatch } = useProvider();
	const { strokeColor, firstColor, secondColor } = state;

	const [gradientDegree, setGradientDegree] = useState(
		(strokeColor as GradientType).degree || 0
	);

	const [firstColorBoxClicked, setFirstColorBoxClicked] = useState<boolean>(
		false
	);
	const [secondColorBoxClicked, setSecondColorBoxClicked] = useState<boolean>(
		false
	);

	useEffect(() => {
		dispatch({
			type: 'SET_STROKE_COLOR',
			payload: {
				degree: gradientDegree,
				firstColor,
				secondColor,
			},
		});
	}, [firstColor, secondColor, gradientDegree, dispatch]);

	const handleColorChange = (caller: string) => {
		return (color: ColorResult) => {
			if (!isValidHex(color)) {
				return;
			}

			const requestType =
				caller === 'first' ? 'SET_FIRST_COLOR' : 'SET_SECOND_COLOR';
			dispatch({
				type: requestType,
				payload: color,
			});
		};
	};

	const handleMouseWheel = useCallback(({ nativeEvent }: React.WheelEvent) => {
		if (nativeEvent?.deltaY < 0) {
			setGradientDegree((degree) => (degree + 10 > 360 ? 10 : degree + 10));
		} else {
			setGradientDegree((degree) => (degree - 10 < 0 ? 350 : degree - 10));
		}
	}, []);

	const handleFirstColorBoxClick = useCallback(() => {
		if (secondColorBoxClicked) {
			setSecondColorBoxClicked(false);
		}
		setFirstColorBoxClicked((state) => !state);
	}, [secondColorBoxClicked]);

	const handleSecondColorBoxClick = useCallback(() => {
		if (firstColorBoxClicked) {
			setFirstColorBoxClicked(false);
		}
		setSecondColorBoxClicked((state) => !state);
	}, [firstColorBoxClicked]);

	const renderColorWheel = useMemo(() => {
		const renderHelper: { color: string; target: 'first' | 'second' } = {
			color: '',
			target: 'first',
		};
		if (firstColorBoxClicked) {
			renderHelper.color = firstColor;
			renderHelper.target = 'first';
		}

		if (secondColorBoxClicked) {
			renderHelper.color = secondColor;
			renderHelper.target = 'second';
		}
		return (
			<>
				{firstColorBoxClicked && (
					<ColorWheel color={renderHelper.color} target={renderHelper.target} />
				)}
				{secondColorBoxClicked && (
					<ColorWheel color={renderHelper.color} target={renderHelper.target} />
				)}
			</>
		);
	}, [firstColorBoxClicked, secondColorBoxClicked, firstColor, secondColor]);

	const renderGradientPreviewer = useMemo(() => {
		let backgroundColor = `linear-gradient(${gradientDegree}deg, ${firstColor}, ${secondColor})`;
		if (firstColorBoxClicked || secondColorBoxClicked) {
			backgroundColor = 'white';
		}
		return (
			<div
				className='gradientPreview'
				style={{
					background: backgroundColor,
					alignItems:
						firstColorBoxClicked || secondColorBoxClicked
							? 'baseline'
							: 'center',
				}}
				onWheel={handleMouseWheel}>
				{
					//@ts-ignore
					<CircularSlider
						width={115}
						min={0}
						max={360}
						direction={-1}
						knobPosition='right'
						progressColorFrom='#FFFFFF'
						progressColorTo='#FFFFFF'
						knobColor='#FFFFFF'
						trackColor='#FFFFFF'
						appendToValue='°'
						valueFontSize='15px'
						trackSize={4}
						progressSize={4}
						onChange={(value: number) => {
							setGradientDegree(value);
						}}
						label=''
						dataIndex={gradientDegree}
						style={{
							display:
								firstColorBoxClicked || secondColorBoxClicked
									? 'none'
									: 'inline-block',
						}}
					/>
				}
				{renderColorWheel}
			</div>
		);
	}, [
		gradientDegree,
		firstColor,
		secondColor,
		firstColorBoxClicked,
		secondColorBoxClicked,
		handleMouseWheel,
	]);

	const renderColorHexInputs = useMemo(() => {
		return (
			<div className='gradientInputWrapper'>
				<EditableInput
					value={firstColor}
					onChange={handleColorChange('first')}
					style={{
						input: {
							width: '90%',
							fontSize: '12px',
							color: '#666',
							border: '0px',
							outline: 'none',
							height: '22px',
							boxShadow: 'inset 0 0 0 1px #ddd',
							borderRadius: '4px',
							padding: '0 7px',
							boxSizing: 'border-box',
						},
					}}
				/>
				<EditableInput
					value={secondColor}
					onChange={handleColorChange('second')}
					style={{
						input: {
							width: '90%',
							fontSize: '12px',
							color: '#666',
							border: '0px',
							outline: 'none',
							height: '22px',
							boxShadow: 'inset 0 0 0 1px #ddd',
							borderRadius: '4px',
							padding: '0 7px',
							boxSizing: 'border-box',
						},
					}}
				/>
			</div>
		);
	}, [firstColor, secondColor]);

	const renderColorBoxes = useMemo(() => {
		return (
			<div className='gradientColorBoxWrapper'>
				<div
					title={firstColor as string}
					className='gradientColorBox'
					style={{
						background: firstColor as string,
						animation: firstColorBoxClicked ? 'pulse 1s infinite' : 'unset',
					}}
					onClick={handleFirstColorBoxClick}
				/>

				<div
					title={secondColor as string}
					className='gradientColorBox'
					style={{
						background: secondColor as string,
						animation: secondColorBoxClicked ? 'pulse 1s infinite' : 'unset',
					}}
					onClick={handleSecondColorBoxClick}
				/>
			</div>
		);
	}, [
		firstColor,
		secondColor,
		handleFirstColorBoxClick,
		handleSecondColorBoxClick,
	]);

	return useMemo(() => {
		return (
			<div className='gradientBlock'>
				{renderGradientPreviewer}

				{renderColorBoxes}

				{renderColorHexInputs}
			</div>
		);
	}, [
		gradientDegree,
		firstColor,
		secondColor,
		gradientDegree,
		firstColorBoxClicked,
		secondColorBoxClicked,
	]);
};
