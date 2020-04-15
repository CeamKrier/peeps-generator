import React, {
	useEffect,
	useRef,
	RefObject,
	MutableRefObject,
	createRef,
} from 'react';
import { useProvider } from '../utils/contextProvider';
//@ts-ignore
import iro from '@jaames/iro';

interface ColorWheelType {
	color: string;
	target: 'first' | 'second';
}

interface IroColorPicker {
	on: (action: string, callback: Function) => void;
	color: {
		hexString: string;
	};
}

export const ColorWheel: React.FC<ColorWheelType> = ({ color, target }) => {
	const { dispatch } = useProvider();
	const divElement: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
	const colorWheel: MutableRefObject<IroColorPicker | null> = useRef<IroColorPicker | null>(
		null
	);

	useEffect(() => {
		colorWheel.current = new iro.ColorPicker(divElement.current, {
			color: color,
			width: 160,
			layout: [
				{
					component: iro.ui.Slider,
					options: {
						sliderType: 'hue',
					},
				},
				{
					component: iro.ui.Slider,
					options: {
						sliderType: 'saturation',
					},
				},
				{
					component: iro.ui.Slider,
					options: {
						sliderType: 'value',
					},
				},
			],
		});

		if (!colorWheel.current) {
			return;
		}

		colorWheel.current.on('color:change', (color: { hexString: string }) => {
			const requestType =
				target === 'first' ? 'SET_FIRST_COLOR' : 'SET_SECOND_COLOR';
			dispatch({
				type: requestType,
				payload: color.hexString,
			});
		});
	}, [target]);

	return (
		<>
			<div ref={divElement} />
			{/* <div>
				<div>Left</div>
				<div>Right</div>
			</div> */}
		</>
	);
};
