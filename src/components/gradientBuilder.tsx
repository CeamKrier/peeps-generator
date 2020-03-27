import React, { useState, useEffect } from 'react';
import { EditableInput } from 'react-color/lib/components/common';
// @ts-ignore
import CircularSlider from '@fseehawer/react-circular-slider';
import { ColorResult } from 'react-color';
//@ts-ignore
import { isValidHex } from 'react-color/lib/helpers/color';

export const GradientBuilder = () => {
	const [firstColor, setFirstColor] = useState<string>('#ffd402');
	const [secondColor, setSecondColor] = useState<string>('#ff141c');
	const [gradientDegree, setGradientDegree] = useState(0);

	useEffect(() => {
		console.log(
			`background: linear-gradient(${gradientDegree}deg, ${firstColor}, ${secondColor})`
		);
	}, [firstColor, secondColor, gradientDegree]);

	const handleColorChange = (caller: string) => {
		return (color: ColorResult) => {
			if (!isValidHex(color)) {
				return;
			}
			if (caller === 'first') {
				setFirstColor(`${color}`);
			} else {
				setSecondColor(`${color}`);
			}
		};
	};

	const handleMouseWheel = ({ nativeEvent }: React.WheelEvent) => {
		if (nativeEvent?.deltaY < 0) {
			setGradientDegree(degree => (degree + 10 > 360 ? 10 : degree + 10));
		} else {
			setGradientDegree(degree => (degree - 10 < 0 ? 350 : degree - 10));
		}
	};

	return (
		<div className='gradientBlock'>
			<div
				className='gradientPreview'
				style={{
					background: `linear-gradient(${gradientDegree}deg, ${firstColor}, ${secondColor})`
				}}
				onWheel={handleMouseWheel}>
				<CircularSlider
					width={130}
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
				/>
			</div>
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
							boxSizing: 'border-box'
						}
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
							boxSizing: 'border-box'
						}
					}}
				/>
			</div>
		</div>
	);
};
