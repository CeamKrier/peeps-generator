import { ReactElement } from 'react';
import {
	HairType,
	BustPoseType,
	FaceType,
	FacialHairType,
	AccessoryType,
	SittingPoseType,
	StandingPoseType
} from 'react-peeps';
import { SectionValues } from '../components/types';

export interface ProviderProps {
	children: ReactElement;
}

export type ReducerAction =
	| 'SET_ROTATION_DEGREE'
	| 'SET_FLIP_DIRECTION'
	| 'SET_PRESSED_KEY'
	| 'SET_WHEEL_DIRECTION'
	| 'SET_IS_WHEEL_ACTIVE'
	| 'SET_SCALE_VECTOR'
	| 'SET_SVG_TRANSFORM'
	| 'SET_HAIR'
	| 'SET_BODY'
	| 'SET_FACE'
	| 'SET_FACIAL_HAIR'
	| 'SET_ACCESSORY'
	| 'SET_PIECE_SECTION'
	| 'SET_STROKE_COLOR'
	| 'SET_FOREGROUND_FIRST_COLOR'
	| 'SET_FOREGROUND_SECOND_COLOR'
	| 'SET_FRAME_TYPE'
	| 'SET_BACKGROUND_BASIC_COLOR'
	| 'SET_BACKGROUND_FIRST_GRADIENT_COLOR'
	| 'SET_BACKGROUND_SECOND_GRADIENT_COLOR';

export interface DispatchParameters {
	type: ReducerAction;
	payload: any;
}

type GradientType = {
	degree?: number;
	firstColor: string;
	secondColor: string;
};

export interface StateKeys {
	rotationDegree: number;
	flipDirection: number;
	pressedKey: string;
	wheelDirection: string;
	wheelActive: boolean;
	scaleVector: number;
	svgTransform: { rotate?: string; flip?: string; scale?: string };
	pickedHair: HairType;
	pickedBody: BustPoseType | SittingPoseType | StandingPoseType;
	pickedFace: FaceType;
	pickedFacialHair: FacialHairType;
	pickedAccessory: AccessoryType;
	pickedSection: SectionValues;
	strokeColor: string | GradientType;
	firstColor: string;
	secondColor: string;
	backgroundBasicColor: string | GradientType;
	backgroundFirstGradientColor: string;
	backgroundSecondGradientColor: string;
	isFrameTransparent: boolean;
}

export interface ContextProps {
	state: StateKeys;
	dispatch: ({ type, payload }: DispatchParameters) => void;
}
