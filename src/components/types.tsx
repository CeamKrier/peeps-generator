export type SectionValues =
	| 'Accessories'
	| 'Body'
	| 'Face'
	| 'FacialHair'
	| 'Hair';

export type PieceKeyType = {
	hairKeys: string[];
	bodyKeys: string[];
	faceKeys: string[];
	facialHairKeys: string[];
	accessoryKeys: string[];
};

export type SvgTransformInputType = {
	scale?: string;
	rotate?: string;
	flip?: string;
};

export type FlipDirectionType = 1 | -1;
