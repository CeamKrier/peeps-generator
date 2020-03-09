import React, { useState } from 'react';
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
		height: '-webkit-fill-available'
	},
	pieceListContentWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginTop: 20,
		marginLeft: 20
	},
	pieceListItem: { width: '280px' },
	pieceText: { alignSelf: 'center', marginLeft: 10 },
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

type HairValues = "Afro" | "Bald" | "BaldSides" | "BaldTop" | "Bangs" | "BangsFilled" | "Bear" | "Bun" | "BunCurly" | "Buns" | "FlatTop" | "FlatTopLong" | "HatHip" | "Long" | "LongAfro" | "LongBangs" | "LongCurly" | "Medium" | "MediumBangs" | "MediumBangsFilled" | "MediumLong" | "MediumShort" | "MediumStraight" | "Mohawk" | "MohawkDino" | "Pomp" | "ShavedRight" | "ShavedSides" | "ShavedWavy" | "Short" | "ShortCurly" | "ShortMessy" | "ShortScratch" | "ShortVolumed" | "ShortWavy"
const PeepsGenerator: React.FC = () => {
	const [pickedHair, setPickedHair] = useState<HairValues>('Long');

	const [pickedSection, setPickedSection] = useState('Hair');

	const renderPieceSections = (sections: Array<string>) => {
		return sections.map((section, index) => {
			return (
				<li
					className='pieceSection'
					key={index}
					onClick={() => {
						setPickedSection(section);
					}}>
					<div
						style={{
							...styles.pieceSection,
							backgroundColor:
								pickedSection === section ? '#d3d3d3' : '#FFFFFF',
							border: pickedSection === section ? '1px solid black' : undefined
						}}>
						<span style={{ textAlign: 'center' }}>{section}</span>
					</div>
				</li>
			);
		});
	};
  console.log(Hair)
	const renderPieceList = (pieces: Array<string>) => {
		return pieces.map((piece, index) => {
			return (
				<li
					key={index}
					className='pieceListItem'
					onClick={() => {
						setPickedHair(piece as HairValues);
					}}>
					<div style={styles.pieceListContentWrapper}>
						<input
							className='pieceListRadioButton'
							type='radio'
							name='hair'
							checked={piece === pickedHair}
							readOnly
						/>
						<span style={styles.pieceText}>{piece}</span>
					</div>
				</li>
			);
		});
	};

	return (
		<>
			<div style={styles.showcaseWrapper}>
				<Peep
          style={styles.peepStyle}
          accessory={Accessories.GlassRoundThick}
          body={Body.PointingUp}
          face={Face.Cute}
          hair={Hair[pickedHair]}
        />
			</div>
			<ul
				style={{
					position: 'absolute',
					top: 100,
					right: 120,
					width: 280,
					height: 500,
					backgroundColor: '#FFFFFF',
					borderRadius: 20,
					listStyle: 'none',
					paddingLeft: 0,
					overflow: 'auto'
				}}>
				{renderPieceList(Object.keys(Hair))}
			</ul>
			<div>
				<ul
					style={{
						position: 'absolute',
						top: 100,
						right: 20,
						listStyle: 'none'
					}}>
					{renderPieceSections(['Accessories', 'Body', 'Face', 'FacialHair', 'Hair'])}
				</ul>
			</div>
		</>
	);
};

ReactDOM.render(<PeepsGenerator />, document.getElementById('main'));
