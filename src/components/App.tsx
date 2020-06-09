import React, { useEffect } from 'react';
import Peep from 'react-peeps';
import { useProvider } from '../utils/contextProvider';
import LeftMenu from './leftMenu';
import RightMenu from './rightMenu';
import { Footer } from './footer';
import { adjustPeepsViewbox } from '../utils/viewbox';

const styles = {
	peepStyle: {
		width: 390,
		height: 390,
		justifyContent: 'center',
		alignSelf: 'center',
		transform: 'unset',
	},
};

export const PeepsGenerator: React.FC = () => {
	const { state, dispatch } = useProvider();

	const {
		pickedAccessory,
		pickedBody,
		pickedFace,
		pickedFacialHair,
		pickedHair,
		strokeColor,
		pressedKey,
		scaleVector,
		svgTransform,
		isFrameTransparent,
		backgroundBasicColor,
	} = state;

	useEffect(() => {
		const peepGroupWrapper = document.querySelector(
			'.svgWrapper > svg > g'
		) as SVGGraphicsElement;
		const { width, height } = peepGroupWrapper.getBBox();
		peepGroupWrapper.setAttribute(
			'transform',
			`rotate(${svgTransform?.rotate || '0'} ${width / 2} ${height / 2})`
		);
	}, [svgTransform]);

	const handleMouseEnter = () => {
		(document.getElementsByClassName('svgWrapper')[0] as HTMLElement).focus();
	};

	const handleMouseLeave = () => {
		(document.getElementsByClassName('header')[0] as HTMLElement).focus();
		dispatch({
			type: 'SET_WHEEL_DIRECTION',
			payload: undefined,
		});
		dispatch({
			type: 'SET_PRESSED_KEY',
			payload: undefined,
		});
	};

	const handleKeyDown = ({ nativeEvent }: React.KeyboardEvent) => {
		if (pressedKey === nativeEvent.key) {
			return;
		}
		dispatch({
			type: 'SET_PRESSED_KEY',
			payload: nativeEvent.key,
		});
	};

	const handleKeyUp = () => {
		dispatch({
			type: 'SET_PRESSED_KEY',
			payload: undefined,
		});
	};

	const handleMouseWheel = ({ nativeEvent }: React.WheelEvent) => {
		dispatch({
			type: 'SET_IS_WHEEL_ACTIVE',
			payload: true,
		});
		if (nativeEvent.deltaY > 0) {
			dispatch({
				type: 'SET_WHEEL_DIRECTION',
				payload: 'down',
			});
		} else {
			dispatch({
				type: 'SET_WHEEL_DIRECTION',
				payload: 'up',
			});
		}
		setTimeout(() => {
			dispatch({
				type: 'SET_IS_WHEEL_ACTIVE',
				payload: false,
			});
		}, 0);
	};

	return (
		<>
			<a className='header' href='/'>
				<h1>open peeps generator</h1>
			</a>

			<div
				className='svgWrapper'
				tabIndex={0}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				onWheel={handleMouseWheel}>
				<Peep
					style={{
						...styles.peepStyle,
						width: styles.peepStyle.width * scaleVector,
						height: styles.peepStyle.height * scaleVector,
						transform: `${svgTransform?.flip || ''}`,
					}}
					accessory={pickedAccessory}
					body={pickedBody}
					face={pickedFace}
					hair={pickedHair}
					facialHair={pickedFacialHair}
					strokeColor={strokeColor}
					viewBox={adjustPeepsViewbox(pickedBody)}
					wrapperBackground={
						isFrameTransparent ? undefined : backgroundBasicColor
					}
				/>
			</div>

			<LeftMenu />

			<RightMenu />

			<Footer />
		</>
	);
};
