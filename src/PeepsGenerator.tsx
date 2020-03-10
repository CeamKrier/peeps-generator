import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Peep, {
	Accessories,
	Body,
	Face,
	FacialHair,
	Hair,
	CirclePeep
} from 'react-peeps';
import './css/index.css';

const styles = {
	peepStyle: {
		width: 300,
		height: 300,
		justifyContent: 'center',
		alignSelf: 'center',
		overflow: 'initial'
	},
	circleStyle: {
		backgroundColor: '#F3D34A',
		width: 270,
		height: 270,
		alignSelf: 'center',
		borderRadius: 135,
		overflow: 'hidden',
		borderWidth: 3,
		borderColor: 'black',
		borderStyle: 'solid'
	},
	showcaseWrapper: {
		display: 'flex',
		justifyContent: 'center',
		height: '-webkit-fill-available',
		marginTop: -20
	},
	pieceListContentWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginTop: 20,
		marginLeft: 20
	},
	pieceListItem: { width: '280px' },
	pieceText: { alignSelf: 'center', marginLeft: 20 },
	pieceSection: {
		width: 70,
		height: 70,
		borderRadius: 20,
		marginBottom: 15,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex'
	},
	placeInnerPeace: {
		outline: '1px dashed #fff',
		outlineOffset: '-10px'
	}
};

type HairValues =
	| 'Afro'
	| 'Bald'
	| 'BaldSides'
	| 'BaldTop'
	| 'Bangs'
	| 'BangsFilled'
	| 'Bear'
	| 'Bun'
	| 'BunCurly'
	| 'Buns'
	| 'FlatTop'
	| 'FlatTopLong'
	| 'HatHip'
	| 'Long'
	| 'LongAfro'
	| 'LongBangs'
	| 'LongCurly'
	| 'Medium'
	| 'MediumBangs'
	| 'MediumBangsFilled'
	| 'MediumLong'
	| 'MediumShort'
	| 'MediumStraight'
	| 'Mohawk'
	| 'MohawkDino'
	| 'Pomp'
	| 'ShavedRight'
	| 'ShavedSides'
	| 'ShavedWavy'
	| 'Short'
	| 'ShortCurly'
	| 'ShortMessy'
	| 'ShortScratch'
	| 'ShortVolumed'
	| 'ShortWavy';

type BodyValues =
	| 'BlazerBlackTee'
	| 'Bust'
	| 'ButtonShirt'
	| 'Dress'
	| 'Gaming'
	| 'Geek'
	| 'Hoodie'
	| 'PointingUp'
	| 'Selena'
	| 'Thunder'
	| 'Turtleneck';
type AccessoryValues =
	| 'Eyepatch'
	| 'GlassRoundThick'
	| 'SunglassClubmaster'
	| 'SunglassWayfarer';
type FaceValues =
	| 'Angry'
	| 'Blank'
	| 'Calm'
	| 'Cheeky'
	| 'Concerned'
	| 'Contempt'
	| 'Cute'
	| 'Driven'
	| 'EatingHappy'
	| 'EyesClosed'
	| 'OldAged'
	| 'Serious'
	| 'Smile'
	| 'Solemn'
	| 'Suspicious'
	| 'Tired'
	| 'VeryAngry';
type FacialHairValues =
	| 'Chin'
	| 'Full'
	| 'FullMajestic'
	| 'FullMedium'
	| 'Goatee'
	| 'GoateeCircle'
	| 'MoustacheDali'
	| 'MoustacheHandlebar'
	| 'MoustacheImperial'
	| 'MoustachePainters'
	| 'MoustachePaintersFilled'
	| 'MoustacheSwashbuckler'
	| 'MoustacheThin'
	| 'MoustacheYosemite';

type SectionValues = 'Accessories' | 'Body' | 'Face' | 'FacialHair' | 'Hair';
const PeepsGenerator: React.FC = () => {
	const [pickedHair, setPickedHair] = useState<HairValues>('Long');
	const [pickedBody, setPickedBody] = useState<BodyValues>('Bust');
	const [pickedFace, setPickedFace] = useState<FaceValues>('Smile');
	const [pickedFacialHair, setPickedFacialHair] = useState<FacialHairValues>(
		'Goatee'
	);
	const [pickedAccessory, setPickedAccessory] = useState<AccessoryValues>(
		'GlassRoundThick'
	);

	const [pickedSection, setPickedSection] = useState<SectionValues>('Hair');

	const [pieceKeys, setPieceKeys] = useState();

	useEffect(() => {
		const keys = {
			hairKeys: [''],
			bodyKeys: [''],
			faceKeys: [''],
			facialHairKeys: [''],
			accessoryKeys: ['']
		};
		keys.hairKeys = Object.keys(Hair);
		keys.bodyKeys = Object.keys(Body);
		keys.faceKeys = Object.keys(Face);
		keys.facialHairKeys = Object.keys(FacialHair);
		keys.accessoryKeys = Object.keys(Accessories);
		setPieceKeys(keys);
	}, []);

	const randomizePeep = () => {
		setPickedHair(
			pieceKeys.hairKeys[
				Math.floor(Math.random() * pieceKeys.hairKeys.length)
			] as HairValues
		);

		setPickedBody(
			pieceKeys.bodyKeys[
				Math.floor(Math.random() * pieceKeys.bodyKeys.length)
			] as BodyValues
		);

		setPickedFace(
			pieceKeys.faceKeys[
				Math.floor(Math.random() * pieceKeys.faceKeys.length)
			] as FaceValues
		);

		setPickedFacialHair(
			pieceKeys.facialHairKeys[
				Math.floor(Math.random() * pieceKeys.facialHairKeys.length)
			] as FacialHairValues
		);

		setPickedAccessory(
			pieceKeys.accessoryKeys[
				Math.floor(Math.random() * pieceKeys.accessoryKeys.length)
			] as AccessoryValues
		);
	};

	const renderPieceSections = (sections: Array<string>) => {
		return sections.map((section, index) => {
			return (
				<li
					className='pieceSection'
					key={index}
					onClick={() => {
						setPickedSection(section as SectionValues);
					}}>
					<div
						className='pieceSectionDiv'
						style={{
							...styles.pieceSection,
							backgroundColor: pickedSection === section ? '#fdd365' : '#FFFFFF'
						}}>
						<span style={{ textAlign: 'center' }}>{section}</span>
					</div>
				</li>
			);
		});
	};

	const renderPiece = (piece: string) => {
		switch (pickedSection) {
			case 'Accessories':
				return React.createElement(Accessories[piece as AccessoryValues]);
			case 'Body':
				return React.createElement(Body[piece as BodyValues]);
			case 'Hair':
				return React.createElement(Hair[piece as HairValues]);
			case 'FacialHair':
				return React.createElement(FacialHair[piece as FacialHairValues]);
			case 'Face':
				return React.createElement(Face[piece as FaceValues]);
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

	const pickedSectionObject = () => {
		switch (pickedSection) {
			case 'Accessories':
				return Object.keys(Accessories);
			case 'Body':
				return Object.keys(Body);
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

	const adjustSvgViewbox = () => {
		switch (pickedSection) {
			case 'Accessories':
				return '-75 -125 500 400';
			case 'Body':
				return '0 350 800 800';
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

	const renderPieceList = (pieces: Array<string>) => {
		return pieces.map((piece, index) => {
			return (
				<li
					key={index}
					className='pieceListItem'
					onClick={() => {
						switch (pickedSection) {
							case 'Accessories':
								setPickedAccessory(piece as AccessoryValues);
								break;
							case 'Body':
								setPickedBody(piece as BodyValues);
								break;
							case 'Hair':
								setPickedHair(piece as HairValues);
								break;
							case 'FacialHair':
								setPickedFacialHair(piece as FacialHairValues);
								break;
							case 'Face':
								setPickedFace(piece as FaceValues);
								break;
							default:
								break;
						}
					}}>
					<div style={styles.pieceListContentWrapper}>
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
								style={{ overflow: 'initial' }}
								viewBox={adjustSvgViewbox()}
								width='70'
								height='70'>
								{renderPiece(piece)}
							</svg>
						</div>
						<span style={styles.pieceText}>{piece}</span>
					</div>
				</li>
			);
		});
	};

	return (
		<>
			<a className='header' href='/'>
				<h1>peeps generator</h1>
			</a>
			<div style={styles.showcaseWrapper}>
				<Peep
					style={styles.peepStyle}
					accessory={Accessories[pickedAccessory]}
					body={Body[pickedBody]}
					face={Face[pickedFace]}
					hair={Hair[pickedHair]}
					facialHair={FacialHair[pickedFacialHair]}
				/>
			</div>
			<ul
				style={{
					position: 'absolute',
					top: '11em',
					right: '12em',
					width: 310,
					height: 500,
					backgroundColor: '#FFFFFF',
					borderRadius: 20,
					listStyle: 'none',
					paddingLeft: 0,
					overflow: 'auto',
					boxShadow: '3px 3px 10px 3px #ccc',
					fontSize: 'larger'
				}}>
				{renderPieceList(pickedSectionObject() as string[])}
			</ul>
			<div>
				<ul
					style={{
						position: 'absolute',
						top: '12em',
						right: '5em',
						listStyle: 'none',
						fontSize: 'larger'
					}}>
					{renderPieceSections([
						'Accessories',
						'Body',
						'Face',
						'FacialHair',
						'Hair'
					])}
				</ul>
				<div
					className='pieceSectionDiv'
					style={{
						...styles.pieceSection,
						backgroundColor: '#fdd365',
						position: 'absolute',
						bottom: '8em',
						right: '14.2em',
						cursor: 'pointer',
						width: 310,
						height: 50
					}}
					onClick={() => {
						randomizePeep();
					}}>
					<span style={{ textAlign: 'center' }}>Shuffle</span>
				</div>
			</div>
		</>
	);
};

ReactDOM.render(<PeepsGenerator />, document.getElementById('main'));
