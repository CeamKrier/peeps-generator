import React, {useEffect, useReducer, useCallback, useRef} from 'react';
import reducer from "./reducer";
import useEventListener from "./useEventListener";
import Knob from "./knob";
import Labels from "./labels";
import Svg from "./svg";

// mock window object for SSR
let winObj = {
    pageXOffset: 0,
    pageYOffset: 0
};

let docObj = {
    documentElement: {
        scrollLeft: 0,
        scrollTop: 0
    }
};

if (typeof window !== 'undefined') {
    winObj = window;
    docObj = document;
}

const touchSupported = ('ontouchstart' in winObj);
const SLIDER_EVENT = {
    DOWN: touchSupported ? 'touchstart' : 'mousedown',
    UP: touchSupported ? 'touchend' : 'mouseup',
    MOVE: touchSupported ? 'touchmove' : 'mousemove',
};

const spreadDegrees = 360;
const knobOffset = {
    top: Math.PI / 2,
    right: 0,
    bottom: -Math.PI / 2,
    left: -Math.PI
};

const getSliderRotation = (number) => {
    if(number < 0) return -1;
    return 1;
};

const getRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

const generateRange = (min, max) => {
    let rangeOfNumbers = [];
    for(let i = min; i <= max; i++) {
        rangeOfNumbers.push(i);
    }
    return rangeOfNumbers;
};

const offsetRelativeToDocument = (ref) => {
    const rect = ref.current.getBoundingClientRect();
    const scrollLeft = winObj.pageXOffset || docObj.documentElement.scrollLeft;
    const scrollTop = winObj.pageYOffset || docObj.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
};

const styles = ({
    circularSlider: {
        position: 'relative',
        display: 'inline-block',
        opacity: 0,
        transition: 'opacity 1s ease-in'
    },

    mounted: {
        opacity: 1
    },
});

const CircularSlider = ({
        label = 'ANGLE',
        width = 280,
        direction = 1,
        min = 0,
        max = 360,
        knobColor = '#4e63ea',
        knobPosition = 'top',
        labelColor = '#272b77',
        labelBottom = false,
        labelFontSize = '1rem',
        valueFontSize = '3rem',
        appendToValue = '',
        prependToValue = '',
        verticalOffset = '1.5rem',
        hideLabelValue = false,
        progressColorFrom = '#80C3F3',
        progressColorTo = '#4990E2',
        progressSize = 8,
        trackColor = '#DDDEFB',
        trackSize = 8,
        data = [],
        dataIndex = 0,
        progressLineCap = 'round',
        children,
        onChange = value => {},
        style = {}
    }) => {
    const initialState = {
        mounted: false,
        isDragging: false,
        width: width,
        radius: width / 2,
        knobPosition: knobPosition,
        label: 0,
        data: data,
        radians: 0,
        offset: 0,
        knob: {
            x: 0,
            y: 0,
        },
        dashFullArray: 0,
        dashFullOffset: 0
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const circularSlider = useRef(null);
    const svgFullPath = useRef(null);

    const setKnobPosition = useCallback((radians) => {
        const radius = state.radius - trackSize / 2;
        const offsetRadians = radians + knobOffset[knobPosition];
        let degrees = (offsetRadians > 0 ? offsetRadians
            :
            ((2 * Math.PI) + offsetRadians)) * (spreadDegrees / (2 * Math.PI));
        // change direction
        const dashOffset = (degrees / spreadDegrees) * state.dashFullArray;
        degrees = (getSliderRotation(direction) === -1 ? spreadDegrees - degrees : degrees);

        const pointsInCircle = (state.data.length - 1) / spreadDegrees;
        const currentPoint = Math.round(degrees * pointsInCircle);

        if(state.data[currentPoint] !== state.label) {
            // props callback for parent
            onChange(state.data[currentPoint]);
        }

        dispatch({
            type: 'setKnobPosition',
            payload: {
                dashFullOffset: getSliderRotation(direction) === -1 ? dashOffset : state.dashFullArray - dashOffset,
                label: state.data[currentPoint],
                knob: {
                    x: (radius * Math.cos(radians) + radius),
                    y: (radius * Math.sin(radians) + radius),
                }
            }
        });
    }, [state.dashFullArray, state.radius, state.data, state.label, knobPosition, direction, onChange]);

    const onMouseDown = () => {
        dispatch({
            type: 'onMouseDown',
            payload: {
                isDragging: true
            }
        });
    };

    const onMouseUp = () => {
        dispatch({
            type: 'onMouseUp',
            payload: {
                isDragging: false
            }
        });
    };

    const onMouseMove = useCallback((event) => {
        if (!state.isDragging) return;

        event.preventDefault();

        let touch;
        if (event.type === 'touchmove') {
            touch = event.changedTouches[0];
        }

        const mouseXFromCenter = (event.type === 'touchmove' ? touch.pageX : event.pageX) -
            (offsetRelativeToDocument(circularSlider).left + state.radius);
        const mouseYFromCenter = (event.type === 'touchmove' ? touch.pageY : event.pageY) -
            (offsetRelativeToDocument(circularSlider).top + state.radius);

        const radians = Math.atan2(mouseYFromCenter, mouseXFromCenter);
        setKnobPosition(radians);
    }, [state.isDragging, state.radius, setKnobPosition]);

    // Get svg path length onmount
    useEffect(() => {
        dispatch({
            type: 'init',
            payload: {
                mounted: true,
                data: state.data.length ? [...state.data] : [...generateRange(min, max)],
                dashFullArray: svgFullPath.current.getTotalLength ? svgFullPath.current.getTotalLength() : 0,
            }
        });
        // eslint-disable-next-line
    }, [max, min]);

    // Set knob position
    useEffect(() => {
        const dataArrayLength = state.data.length;
        const knobPositionIndex = (dataIndex > dataArrayLength - 1) ? dataArrayLength - 1 : dataIndex;

        if(!!dataArrayLength) {
            const pointsInCircle = spreadDegrees / dataArrayLength;
            const offset = getRadians(pointsInCircle) / 2;

            dispatch({
                type: 'setInitialKnobPosition',
                payload: {
                    radians: Math.PI / 2 - knobOffset[state.knobPosition],
                    offset
                }
            });

            if(knobPositionIndex) {
                const degrees = getSliderRotation(direction) * knobPositionIndex * pointsInCircle;
                const radians = getRadians(degrees) - knobOffset[state.knobPosition];

                return setKnobPosition(radians+(offset*getSliderRotation(direction)));
            }
            setKnobPosition(-(knobOffset[state.knobPosition]*getSliderRotation(direction))+(offset*getSliderRotation(direction)));
        }

        // eslint-disable-next-line
    }, [state.dashFullArray, state.knobPosition, state.data.length, dataIndex, direction]);

    useEventListener(SLIDER_EVENT.MOVE, onMouseMove);
    useEventListener(SLIDER_EVENT.UP, onMouseUp);

    return (
        <div style={{...styles.circularSlider, ...style, ...(state.mounted && styles.mounted)}} ref={circularSlider}>
            <Svg
                width={width}
                label={label.split(" ").join("")}
                direction={direction}
                strokeDasharray={state.dashFullArray}
                strokeDashoffset={state.dashFullOffset}
                svgFullPath={svgFullPath}
                progressSize={progressSize}
                progressColorFrom={progressColorFrom}
                progressColorTo={progressColorTo}
                progressLineCap={progressLineCap}
                trackColor={trackColor}
                trackSize={trackSize}
                radiansOffset={state.radians}
            />
            <Knob
                isDragging={state.isDragging}
                knobPosition={{ x: state.knob.x, y: state.knob.y }}
                knobColor={knobColor}
                trackSize={trackSize}
                onMouseDown={onMouseDown}
            >
                {children}
            </Knob>
            <Labels
                label={label}
                labelColor={labelColor}
                labelBottom={labelBottom}
                labelFontSize={labelFontSize}
                verticalOffset={verticalOffset}
                valueFontSize={valueFontSize}
                appendToValue={appendToValue}
                prependToValue={prependToValue}
                hideLabelValue={hideLabelValue}
                value={`${state.label}`}
            />
        </div>
    );
};

export default CircularSlider;
