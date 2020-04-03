import React, { Suspense } from 'react';
import Peep from 'react-peeps';
import { useProvider } from '../utils/contextProvider';
import { Footer } from './footer';
import { adjustPeepsViewbox } from '../utils/viewbox';

const LeftMenu = React.lazy(() => import('./leftMenu'));
const RightMenu = React.lazy(() => import('./rightMenu'));
const ColorPicker = React.lazy(() => import('./colorPicker'));

const styles = {
	peepStyle: {
		width: 390,
		height: 390,
		justifyContent: 'center',
		alignSelf: 'center',
		transform: 'unset'
	}
};

export const PeepsGenerator: React.FC = () => {
	const { state, dispatch } = useProvider();

	const {
		pickedAccessory,
		pickedBody,
		pickedFace,
		pickedFacialHair,
		pickedHair,
		strokeColor
	} = state;

	const handleMouseEnter = () => {
		(document.getElementsByClassName('svgWrapper')[0] as HTMLElement).focus();
	};

	const handleMouseLeave = () => {
		(document.getElementsByClassName('header')[0] as HTMLElement).focus();
		dispatch({
			type: 'SET_WHEEL_DIRECTION',
			payload: undefined
		});
		dispatch({
			type: 'SET_PRESSED_KEY',
			payload: undefined
		});
	};

	const handleKeyDown = ({ nativeEvent }: React.KeyboardEvent) => {
		if (state.pressedKey === nativeEvent.key) {
			return;
		}
		dispatch({
			type: 'SET_PRESSED_KEY',
			payload: nativeEvent.key
		});
	};

	const handleKeyUp = () => {
		dispatch({
			type: 'SET_PRESSED_KEY',
			payload: undefined
		});
	};

	const handleMouseWheel = ({ nativeEvent }: React.WheelEvent) => {
		dispatch({
			type: 'SET_IS_WHEEL_ACTIVE',
			payload: true
		});
		if (nativeEvent.deltaY > 0) {
			dispatch({
				type: 'SET_WHEEL_DIRECTION',
				payload: 'down'
			});
		} else {
			dispatch({
				type: 'SET_WHEEL_DIRECTION',
				payload: 'up'
			});
		}
		setTimeout(() => {
			dispatch({
				type: 'SET_IS_WHEEL_ACTIVE',
				payload: false
			});
		}, 0);
	};

	return (
		<>
			<a className='header' href='/'>
				<h1>peeps generator</h1>
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
						width: styles.peepStyle.width * state.scaleVector,
						height: styles.peepStyle.height * state.scaleVector,
						transform: `${state.svgTransform?.rotate || ''} ${state.svgTransform
							?.flip || ''}`
					}}
					accessory={pickedAccessory}
					body={pickedBody}
					face={pickedFace}
					hair={pickedHair}
					facialHair={pickedFacialHair}
					strokeColor={strokeColor}
					viewBox={adjustPeepsViewbox(pickedBody)}
				/>
				<Suspense fallback>
					<ColorPicker />
				</Suspense>
			</div>

			<Suspense fallback>
				<LeftMenu />
			</Suspense>

			<Suspense fallback>
				<RightMenu />
			</Suspense>

			<Suspense fallback>
				<Footer />
			</Suspense>
		</>
	);
};
