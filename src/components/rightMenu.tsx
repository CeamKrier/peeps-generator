import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
	Accessories,
	BustPose,
	Face,
	FacialHair,
	Hair,
	AccessoryType,
	BustPoseType,
	FaceType,
	FacialHairType,
	HairType,
	SittingPoseType,
	StandingPose,
	StandingPoseType,
	SittingPose,
} from 'react-peeps';
import { saveSvg, savePng } from '../utils/save';
import { PieceKeyType, SectionValues } from './types';
import { useProvider } from '../utils/contextProvider';
import ColorModal from './colorModal';
import { distinguishBodyViewbox } from '../utils/viewbox';

const RightMenu = () => {
	const { state, dispatch } = useProvider();

	const {
		pickedAccessory,
		pickedBody,
		pickedFace,
		pickedFacialHair,
		pickedHair,
		pickedSection,
		scaleVector,
		isFrameTransparent,
	} = state;

	const [pieceKeys, setPieceKeys] = useState<PieceKeyType>();

	useEffect(() => {
		const keys = {
			hairKeys: [''],
			bodyKeys: [''],
			faceKeys: [''],
			facialHairKeys: [''],
			accessoryKeys: [''],
		};
		keys.hairKeys = Object.keys(Hair);
		keys.bodyKeys = [
			...Object.keys(BustPose),
			...Object.keys(SittingPose),
			...Object.keys(StandingPose),
		];
		keys.faceKeys = Object.keys(Face);
		keys.facialHairKeys = Object.keys(FacialHair);
		keys.accessoryKeys = Object.keys(Accessories);
		setPieceKeys(keys);
	}, []);

	const updateHair = (hair: HairType) => {
		dispatch({
			type: 'SET_HAIR',
			payload: hair,
		});
	};

	const updateBody = (body: BustPoseType) => {
		dispatch({
			type: 'SET_BODY',
			payload: body,
		});
	};

	const updateFace = (face: FaceType) => {
		dispatch({
			type: 'SET_FACE',
			payload: face,
		});
	};

	const updateFacialHair = (facialHair: FacialHairType) => {
		dispatch({
			type: 'SET_FACIAL_HAIR',
			payload: facialHair,
		});
	};

	const updateFrameType = useCallback(
		(isTransparent) => () => {
			isTransparent !== isFrameTransparent &&
				dispatch({
					type: 'SET_FRAME_TYPE',
					payload: isTransparent,
				});
		},
		[isFrameTransparent]
	);

	const updateAccessory = (accessory: AccessoryType) => {
		dispatch({
			type: 'SET_ACCESSORY',
			payload: accessory,
		});
	};

	const updateSection = (section: SectionValues) => {
		dispatch({
			type: 'SET_PIECE_SECTION',
			payload: section,
		});
	};

	const randomizePeep = useCallback(() => {
		if (!pieceKeys) {
			return;
		}
		updateHair(
			pieceKeys.hairKeys[
				Math.floor(Math.random() * pieceKeys.hairKeys.length)
			] as HairType
		);

		updateBody(
			pieceKeys.bodyKeys[
				Math.floor(Math.random() * pieceKeys.bodyKeys.length)
			] as BustPoseType & SittingPoseType & StandingPoseType
		);

		updateFace(
			pieceKeys.faceKeys[
				Math.floor(Math.random() * pieceKeys.faceKeys.length)
			] as FaceType
		);

		updateFacialHair(
			pieceKeys.facialHairKeys[
				Math.floor(Math.random() * pieceKeys.facialHairKeys.length)
			] as FacialHairType
		);

		updateAccessory(
			pieceKeys.accessoryKeys[
				Math.floor(Math.random() * pieceKeys.accessoryKeys.length)
			] as AccessoryType
		);
	}, [pieceKeys]);

	const handlePieceSectionClick = (section: string) => {
		return () => {
			updateSection(section as SectionValues);
		};
	};

	const renderPieceSections = (sections: Array<string>) => {
		return sections.map((section, index) => {
			return (
				<li
					className='pieceSectionItem'
					key={index}
					onClick={handlePieceSectionClick(section)}>
					<div
						className={`pieceSectionButton ${section} ${
							pickedSection === section ? 'pickedSection' : ''
						}`}>
						<span>{section}</span>
					</div>
				</li>
			);
		});
	};

	const renderPiece = (piece: string) => {
		switch (pickedSection) {
			case 'Accessories':
				return React.createElement(Accessories[piece as AccessoryType]);
			case 'Body':
				return React.createElement(
					BustPose[piece as BustPoseType] ||
						SittingPose[piece as SittingPoseType] ||
						StandingPose[piece as StandingPoseType]
				);
			case 'Hair':
				return React.createElement(Hair[piece as HairType]);
			case 'FacialHair':
				return React.createElement(FacialHair[piece as FacialHairType]);
			case 'Face':
				return React.createElement(Face[piece as FaceType]);
			default:
				break;
		}
	};

	const isPieceChecked = (piece: string) => {
		switch (pickedSection) {
			case 'Accessories':
				return piece === pickedAccessory;
			case 'Body':
				return piece === pickedBody;
			case 'Hair':
				return piece === pickedHair;
			case 'FacialHair':
				return piece === pickedFacialHair;
			case 'Face':
				return piece === pickedFace;
			default:
				break;
		}
	};

	const adjustSvgViewbox = (piece: string) => {
		switch (pickedSection) {
			case 'Accessories':
				return '-75 -125 500 400';
			case 'Body':
				return distinguishBodyViewbox(piece);
			case 'Hair':
				return '0 -100 550 750';
			case 'FacialHair':
				return '-50 -100 500 400';
			case 'Face':
				return '0 -20 300 400';
			default:
				break;
		}
	};

	const handlePieceItemClick = (piece: string) => {
		return () => {
			switch (pickedSection) {
				case 'Accessories':
					updateAccessory(piece as AccessoryType);
					break;
				case 'Body':
					updateBody(
						piece as BustPoseType & SittingPoseType & StandingPoseType
					);
					break;
				case 'Hair':
					updateHair(piece as HairType);
					break;
				case 'FacialHair':
					updateFacialHair(piece as FacialHairType);
					break;
				case 'Face':
					updateFace(piece as FaceType);
					break;
				default:
					break;
			}
		};
	};

	const renderPieceList = (pieces: Array<string>) => {
		return pieces.map((piece, index) => {
			return (
				<li
					key={index}
					className='pieceListItem'
					onClick={handlePieceItemClick(piece)}>
					<div className='pieceListWrapper'>
						<input
							className='pieceListRadioButton'
							type='radio'
							name={pickedSection}
							checked={isPieceChecked(piece)}
							readOnly
						/>
						<div className='selectionIndicator' />
						<div>
							<svg
								className='pieceListSvg'
								viewBox={adjustSvgViewbox(piece)}
								width='70'
								height='70'>
								{renderPiece(piece)}
							</svg>
						</div>
						<span className='pieceText'>{piece}</span>
					</div>
				</li>
			);
		});
	};

	const handleSaveSvgButtonClick = useCallback(() => {
		saveSvg(
			document.querySelector('.svgWrapper > svg') as HTMLElement,
			'peep.svg'
		);
	}, []);

	const handleSavePngButtonClick = useCallback(() => {
		savePng(
			document.querySelector('.svgWrapper > svg') as HTMLElement,
			'peep.png',
			scaleVector
		);
	}, [scaleVector]);

	const pickedSectionObject = () => {
		switch (pickedSection) {
			case 'Accessories':
				return Object.keys(Accessories);
			case 'Body':
				return [
					...Object.keys(BustPose),
					...Object.keys(SittingPose),
					...Object.keys(StandingPose),
				];
			case 'Hair':
				return Object.keys(Hair);
			case 'FacialHair':
				return Object.keys(FacialHair);
			case 'Face':
				return Object.keys(Face);
			default:
				break;
		}
	};

	const renderSelectedPieceSet = useMemo(() => {
		return (
			<div className='listWrapper'>
				<ul className={`pieceList ${pickedSection}`}>
					{renderPieceList(pickedSectionObject() as string[])}
				</ul>
				<ul className='sectionList'>
					{renderPieceSections([
						'Accessories',
						'Body',
						'Face',
						'FacialHair',
						'Hair',
					])}
				</ul>
			</div>
		);
	}, [pickedSection, renderPieceList]);

	const renderSaveButtons = useMemo(() => {
		return (
			<div className='saveButtonWrapper'>
				<div className='saveButton' onClick={handleSaveSvgButtonClick}>
					Save as SVG
				</div>
				<div className='saveButton' onClick={handleSavePngButtonClick}>
					Save as PNG
				</div>
			</div>
		);
	}, [handleSaveSvgButtonClick, handleSavePngButtonClick]);

	const rendererRandomizerButton = useMemo(() => {
		return (
			<div className='shuffleButton' onClick={randomizePeep}>
				<span style={{ textAlign: 'center' }}>Shuffle</span>
			</div>
		);
	}, [randomizePeep]);

	const renderColorPicker = useMemo(() => {
		return <ColorModal />;
	}, []);

	const renderFrameOptions = useMemo(() => {
		return (
			<div className='frameOptionsWrapper'>
				<span className='marginRightOneEM'>Background</span>
				<div
					className={`frameOptionButton ${
						isFrameTransparent && 'deactiveFrameOptionButton'
					}`}
					onClick={updateFrameType(true)}>
					transparent
				</div>
				<div
					className={`frameOptionButton ${
						!isFrameTransparent && 'deactiveFrameOptionButton'
					}`}
					onClick={updateFrameType(false)}>
					colorful
				</div>
			</div>
		);
	}, [isFrameTransparent]);

	return useMemo(() => {
		return (
			<div className='rigthMenu'>
				{renderSelectedPieceSet}
				{renderFrameOptions}
				{renderColorPicker}

				{rendererRandomizerButton}

				{renderSaveButtons}
			</div>
		);
	}, [
		pickedSection,
		randomizePeep,
		pickedAccessory,
		pickedBody,
		pickedFace,
		pickedFacialHair,
		pickedHair,
		scaleVector,
		isFrameTransparent,
	]);
};

export default RightMenu;
