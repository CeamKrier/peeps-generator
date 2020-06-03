import React, { useReducer, useContext } from 'react';
import { StateKeys, ContextProps, ProviderProps } from './types';

const initialState: StateKeys = {
	rotationDegree: 0,
	flipDirection: 1,
	pressedKey: '',
	wheelDirection: '',
	wheelActive: false,
	scaleVector: 1,
	svgTransform: {},
	pickedHair: 'HatHip',
	pickedBody: 'PointingUp',
	pickedFace: 'Smile',
	pickedFacialHair: 'None',
	pickedAccessory: 'None',
	pickedSection: 'Accessories',
	strokeColor: '#000000',
	firstColor: '#81087F',
	secondColor: '#ffd402',
	isFrameTransparent: true
};

export const Context = React.createContext<ContextProps>({
	state: initialState,
	dispatch: () => {},
});

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_ROTATION_DEGREE':
			state.rotationDegree = action.payload;
			return Object.assign({}, state);
		case 'SET_FLIP_DIRECTION':
			state.flipDirection = action.payload;
			return Object.assign({}, state);
		case 'SET_PRESSED_KEY':
			state.pressedKey = action.payload;
			return Object.assign({}, state);
		case 'SET_WHEEL_DIRECTION':
			state.wheelDirection = action.payload;
			return Object.assign({}, state);
		case 'SET_IS_WHEEL_ACTIVE':
			state.wheelActive = action.payload;
			return Object.assign({}, state);
		case 'SET_SVG_TRANSFORM':
			state.svgTransform = action.payload;
			return Object.assign({}, state);
		case 'SET_SCALE_VECTOR':
			state.scaleVector = action.payload;
			return Object.assign({}, state);
		case 'SET_HAIR':
			state.pickedHair = action.payload;
			return Object.assign({}, state);
		case 'SET_BODY':
			state.pickedBody = action.payload;
			return Object.assign({}, state);
		case 'SET_FACE':
			state.pickedFace = action.payload;
			return Object.assign({}, state);
		case 'SET_FACIAL_HAIR':
			state.pickedFacialHair = action.payload;
			return Object.assign({}, state);
		case 'SET_ACCESSORY':
			state.pickedAccessory = action.payload;
			return Object.assign({}, state);
		case 'SET_PIECE_SECTION':
			state.pickedSection = action.payload;
			return Object.assign({}, state);
		case 'SET_STROKE_COLOR':
			let updatedState = action.payload;
			// check if payload comes from the colorWheel
			if (typeof action.payload === 'object' && !action.payload.degree) {
				updatedState.degree = state.strokeColor.degree;

				// Find which color has updated on the gradient builder's color picker
				if (!updatedState.secondColor) {
					// assing back the original second color
					updatedState.secondColor = state.strokeColor.secondColor;
				}
				if (!updatedState.firstColor) {
					// assing back the original first color
					updatedState.firstColor = state.strokeColor.firstColor;
				}
			}
			state.strokeColor = updatedState;
			return Object.assign({}, state);
		case 'SET_FIRST_COLOR':
			state.firstColor = action.payload;
			return Object.assign({}, state);
		case 'SET_SECOND_COLOR':
			state.secondColor = action.payload;
			return Object.assign({}, state);
		case 'SET_FRAME_TYPE': 
			state.isFrameTransparent = action.payload;
			return Object.assign({}, state);
		default:
			break;
	}
};

export const Provider: React.FC<ProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
	);
};

export const useProvider = () => useContext(Context);
