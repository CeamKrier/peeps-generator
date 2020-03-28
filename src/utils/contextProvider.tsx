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
	strokeColor: '#000000'
};

export const Context = React.createContext<ContextProps>({
	state: initialState,
	dispatch: () => {}
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
			state.strokeColor = action.payload;
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
