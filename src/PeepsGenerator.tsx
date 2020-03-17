import React, { useState, useEffect } from 'react';
import Peep, {
  Accessories,
  Body,
  Face,
  FacialHair,
  Hair,
  AccessoryType,
  BodyType,
  FaceType,
  FacialHairType,
  HairType
} from 'react-peeps';
import { saveSvg, savePng } from './utils/save';

// @ts-ignore
import CircularSlider from '@fseehawer/react-circular-slider';
// @ts-ignore
import Slider from 'rc-slider';

const styles = {
  peepStyle: {
    width: 390,
    height: 390,
    justifyContent: 'center',
    alignSelf: 'center',
    transform: 'unset'
  }
};

type SectionValues = 'Accessories' | 'Body' | 'Face' | 'FacialHair' | 'Hair';
type PieceKeyType = {
  hairKeys: string[];
  bodyKeys: string[];
  faceKeys: string[];
  facialHairKeys: string[];
  accessoryKeys: string[];
};
type SvgTransformInputType = {
  scale?: string;
  rotate?: string;
  flip?: string;
};

type FlipDirectionType = 1 | -1;

export const PeepsGenerator: React.FC = () => {
  const [pickedHair, setPickedHair] = useState<HairType>('Long');
  const [pickedBody, setPickedBody] = useState<BodyType>('Shirt');
  const [pickedFace, setPickedFace] = useState<FaceType>('Smile');
  const [pickedFacialHair, setPickedFacialHair] = useState<FacialHairType>(
    'Goatee'
  );
  const [pickedAccessory, setPickedAccessory] = useState<AccessoryType>(
    'GlassRoundThick'
  );
  const [pickedSection, setPickedSection] = useState<SectionValues>(
    'Accessories'
  );
  const [pieceKeys, setPieceKeys] = useState<PieceKeyType>();
  const [rotationDegree, setRotationDegree] = useState(0);
  const [scaleVector, setScaleVector] = useState(1.0);
  const [flipDirection, setFlipDirection] = useState<FlipDirectionType>(1);
  const [svgTransform, setSvgTransform] = useState<SvgTransformInputType>();
  const [pressedKey, setPressedKey] = useState<string>();
  const [wheelDirection, setWheelDirection] = useState<string>();
  const [wheelActive, setWheelActive] = useState<boolean>(false);
  const [leftMenuVisibility, setLeftMenuVisibility] = useState<boolean>(false);

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

    // removes the ripple animation of circular slider
    (document.querySelector(
      '.rotateWrapper > div > div > div > svg > circle'
    ) as HTMLElement)?.remove();

    // removes the stripes from the circular slide knob
    document
      .querySelectorAll('.rotateWrapper > div > div > div > svg > rect')
      .forEach(rect => rect?.remove());
  }, []);

  useEffect(() => {
    setSvgTransform({
      ...svgTransform,
      rotate: `rotate(${rotationDegree}deg)`
    });
  }, [rotationDegree]);

  useEffect(() => {
    setSvgTransform({
      ...svgTransform,
      flip: `scale(${flipDirection}, 1)`
    });
  }, [flipDirection]);

  useEffect(() => {
    if (!(pressedKey && wheelDirection && wheelActive)) {
      return;
    }

    switch (pressedKey) {
      case 'r':
        // rotate
        if (wheelDirection === 'up') {
          setRotationDegree((degree: number) => {
            return degree + 10 > 360 ? 10 : degree + 10;
          });
        } else {
          setRotationDegree((degree: number) => {
            return degree - 10 < 0 ? 350 : degree - 10;
          });
        }

        break;
      case 'f':
        // flip
        if (wheelDirection === 'up') {
          flipDirection === 1 && setFlipDirection(-1);
        } else {
          flipDirection === -1 && setFlipDirection(1);
        }

        break;
      case 's':
        // scale
        if (wheelDirection === 'up') {
          scaleVector > 0.5 &&
            setScaleVector(scaleVector <= 0.5 ? 0.5 : scaleVector - 0.25);
        } else {
          scaleVector < 1.5 &&
            setScaleVector(scaleVector >= 1.5 ? 1.5 : scaleVector + 0.25);
        }

        break;

      default:
        break;
    }
  }, [pressedKey, wheelDirection, wheelActive]);

  const randomizePeep = () => {
    if (!pieceKeys) {
      return;
    }
    setPickedHair(
      pieceKeys.hairKeys[
        Math.floor(Math.random() * pieceKeys.hairKeys.length)
      ] as HairType
    );

    setPickedBody(
      pieceKeys.bodyKeys[
        Math.floor(Math.random() * pieceKeys.bodyKeys.length)
      ] as BodyType
    );

    setPickedFace(
      pieceKeys.faceKeys[
        Math.floor(Math.random() * pieceKeys.faceKeys.length)
      ] as FaceType
    );

    setPickedFacialHair(
      pieceKeys.facialHairKeys[
        Math.floor(Math.random() * pieceKeys.facialHairKeys.length)
      ] as FacialHairType
    );

    setPickedAccessory(
      pieceKeys.accessoryKeys[
        Math.floor(Math.random() * pieceKeys.accessoryKeys.length)
      ] as AccessoryType
    );
  };

  const renderPieceSections = (sections: Array<string>) => {
    return sections.map((section, index) => {
      return (
        <li
          className='pieceSectionItem'
          key={index}
          onClick={() => {
            setPickedSection(section as SectionValues);
          }}>
          <div
            className={`pieceSectionButton ${
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
        return React.createElement(Body[piece as BodyType]);
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
                setPickedAccessory(piece as AccessoryType);
                break;
              case 'Body':
                setPickedBody(piece as BodyType);
                break;
              case 'Hair':
                setPickedHair(piece as HairType);
                break;
              case 'FacialHair':
                setPickedFacialHair(piece as FacialHairType);
                break;
              case 'Face':
                setPickedFace(piece as FaceType);
                break;
              default:
                break;
            }
          }}>
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
                viewBox={adjustSvgViewbox()}
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

  return (
    <>
      <a className='header' href='/'>
        <h1>peeps generator</h1>
      </a>

      <div
        className='svgWrapper'
        tabIndex={0}
        onMouseEnter={() => {
          (document.getElementsByClassName(
            'svgWrapper'
          )[0] as HTMLElement).focus();
        }}
        onMouseLeave={() => {
          (document.getElementsByClassName('header')[0] as HTMLElement).focus();
          setWheelDirection(undefined);
          setPressedKey(undefined);
        }}
        onKeyDown={({ nativeEvent }) => {
          if (pressedKey === nativeEvent.key) {
            return;
          }
          setPressedKey(nativeEvent.key);
        }}
        onKeyUp={() => {
          setPressedKey(undefined);
        }}
        onWheel={({ nativeEvent }) => {
          setWheelActive(true);
          if (nativeEvent.deltaY > 0) {
            setWheelDirection('down');
          } else {
            setWheelDirection('up');
          }
          setTimeout(() => {
            setWheelActive(false);
          }, 0);
        }}>
        <Peep
          style={{
            ...styles.peepStyle,
            width: styles.peepStyle.width * scaleVector,
            height: styles.peepStyle.height * scaleVector,
            transform: `${svgTransform?.rotate || ''} ${svgTransform?.flip ||
              ''}`
          }}
          accessory={Accessories[pickedAccessory]}
          body={Body[pickedBody]}
          face={Face[pickedFace]}
          hair={Hair[pickedHair]}
          facialHair={FacialHair[pickedFacialHair]}
          viewBox={{ x: '-250', y: '-150', width: '1250', height: '1400' }}
        />
      </div>

      <div className={`leftMenu ${leftMenuVisibility ? '' : 'drawerClosed'}`}>
        <div className='leftMenuContentWrapper'>
          <div
            className='scaleWrapper'
            onWheel={({ nativeEvent }) => {
              if (nativeEvent.deltaY > 0) {
                setScaleVector(scaleVector <= 0.5 ? 0.5 : scaleVector - 0.25);
              } else {
                setScaleVector(scaleVector >= 1.5 ? 1.5 : scaleVector + 0.25);
              }
            }}>
            <span className='scaleTitle'>Scale</span>
            <Slider
              value={scaleVector}
              min={0.5}
              max={1.5}
              defaultValue={1}
              onChange={(vector: number) => {
                setScaleVector(vector);
              }}
              marks={{ 0.5: 0.5, 0.75: 0.75, 1.0: 1.0, 1.25: 1.25, 1.5: 1.5 }}
              step={null}
              railStyle={{
                position: 'absolute',
                width: '100%',
                backgroundColor: '#f1f3f4',
                height: '8px',
                borderRadius: '6px'
              }}
              trackStyle={{
                position: 'absolute',
                left: 0,
                height: '8px',
                borderRadius: '6px',
                backgroundColor: '#FCCE5A'
              }}
              dotStyle={{
                position: 'absolute',
                bottom: '-7px',
                marginLeft: '-8px',
                width: '14px',
                height: '14px',
                border: '2px solid #e9e9e9',
                backgroundColor: '#fff',
                cursor: 'pointer',
                borderRadius: '50%',
                verticalAlign: 'middle'
              }}
              activeDotStyle={{
                position: 'absolute',
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                marginTop: '-5px',
                borderRadius: '50%',
                border: 'solid 2px #000',
                backgroundColor: '#000',
                touchAction: 'pan-x',
                bottom: '-8px',
                marginLeft: '-9px',
                zIndex: 2
              }}
            />
            <div className='scaleShortcutWrapper'>
              <span>or</span>
              <span className='boldText'>press s</span>
              <span>+</span>
              <span className='boldText'>scroll on illustration</span>
            </div>
          </div>

          <div
            className='rotateWrapper'
            onWheel={({ nativeEvent }) => {
              setTimeout(() => {
                if (nativeEvent.deltaY > 0) {
                  setRotationDegree((degree: number) => {
                    return degree + 10 > 360 ? 10 : degree + 10;
                  });
                } else {
                  setRotationDegree((degree: number) => {
                    return degree - 10 < 0 ? 350 : degree - 10;
                  });
                }
              }, 0);
            }}>
            <span className='rotateTitle'>Rotate</span>
            <div className='rotateRow'>
              <CircularSlider
                width={100}
                min={0}
                max={360}
                direction={-1}
                knobPosition='right'
                knobColor='#000000'
                trackColor='#f1f3f4'
                progressColorFrom='#FDE7AB'
                progressColorTo='#FCCE5A'
                appendToValue='°'
                valueFontSize='15px'
                onChange={(val: number) => {
                  setRotationDegree(val);
                }}
                label='Degree'
                dataIndex={rotationDegree}
              />
              <span>or</span>
              <div className='rotateShortcutWrapper'>
                <span className='boldText'>press r</span>
                <span>+</span>
                <span className='boldText'>scroll on</span>
                <span className='boldText'>illustration</span>
              </div>
            </div>
          </div>

          <div className='flipWrapper'>
            <div
              className='flipButton'
              onClick={() => {
                setFlipDirection(-flipDirection as FlipDirectionType);
              }}>
              <span style={{ textAlign: 'center' }}>Flip</span>
            </div>
            <span>or</span>
            <div className='rotateShortcutWrapper'>
              <span className='boldText'>press f</span>
              <span>+</span>
              <span className='boldText'>scroll on illustration</span>
            </div>
          </div>
        </div>
        <div
          className='leftMenuDrawerButton'
          onClick={() => {
            setLeftMenuVisibility(!leftMenuVisibility);
          }}>
          {leftMenuVisibility ? 'Close' : 'Open'}
        </div>
      </div>

      <div className='rigthMenu'>
        <div className='listWrapper'>
          <ul className='pieceList'>
            {renderPieceList(pickedSectionObject() as string[])}
          </ul>
          <ul className='sectionList'>
            {renderPieceSections([
              'Accessories',
              'Body',
              'Face',
              'FacialHair',
              'Hair'
            ])}
          </ul>
        </div>

        <div
          className='shuffleButton'
          onClick={() => {
            randomizePeep();
          }}>
          <span style={{ textAlign: 'center' }}>Shuffle</span>
        </div>
        <div
          className='shuffleButton'
          onClick={() => {
            saveSvg(
              document.querySelector('.svgWrapper > svg') as HTMLElement,
              'peep.svg'
            );
          }}>
          Save as SVG
        </div>
        <div
          className='shuffleButton'
          onClick={() => {
            savePng(
              document.querySelector('.svgWrapper > svg') as HTMLElement,
			  'peep.png',
			  scaleVector
            );
          }}>
          Save as PNG
        </div>

      </div>
    </>
  );
};
