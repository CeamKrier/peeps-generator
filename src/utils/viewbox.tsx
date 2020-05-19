import {
	SittingPose,
	SittingPoseType,
	StandingPoseType,
	StandingPose,
	BustPose,
	BustPoseType
} from 'react-peeps';

export const isSittingPose = (pose: any): pose is SittingPoseType =>
	Object.keys(SittingPose).includes(pose);

export const isStandingPose = (pose: any): pose is StandingPoseType =>
	Object.keys(StandingPose).includes(pose);

export const isBustPose = (pose: any): pose is BustPoseType =>
	Object.keys(BustPose).includes(pose);

export const adjustPeepsViewbox = (bodyPiece: string) => {
	let x = '-235',
		y = '-150',
		width = '1250',
		height = '1400';
	if (isSittingPose(bodyPiece)) {
		x = '-800';
		y = '-300';
		width = '2600';
		height = '2600';
		if (
			bodyPiece === 'MediumBW' ||
			bodyPiece === 'MediumWB' ||
			bodyPiece === 'OneLegUpBW' ||
			bodyPiece === 'OneLegUpWB'
		) {
      x = '-1000'
    }
    if (bodyPiece === 'WheelChair') {
      x = '-700'
      y = '-150'
    }
    if (bodyPiece === 'Bike') {
      x = '-1200'
      width = '3600'
      height = '3600'
    }
	} else if (isStandingPose(bodyPiece)) {
		x = '-1300';
		y = '-200';
		width = '3300';
		height = '3300';
	}
	return { x, y, width, height };
};

export const distinguishBodyViewbox = (bodyPiece: string) => {
	if (isStandingPose(bodyPiece)) {
		return '-300 350 2500 2500';
	} else if (isSittingPose(bodyPiece)) {
		if (bodyPiece === 'Bike') {
			return '-500 300 3000 3000';
		}
		if (
			bodyPiece === 'MediumBW' ||
			bodyPiece === 'MediumWB' ||
			bodyPiece === 'OneLegUpBW' ||
			bodyPiece === 'OneLegUpWB' ||
			bodyPiece === 'WheelChair'
		) {
			return '-300 250 2000 2000';
		}
		return '0 300 2000 2000';
	} else {
		return '0 150 1200 1200';
	}
};
