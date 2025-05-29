import React from 'react';

const Svg = ({
         width,
         label,
         direction,
         strokeDasharray,
         strokeDashoffset,
         progressColorFrom,
         progressColorTo,
         trackColor,
         progressSize,
         trackSize,
         svgFullPath,
         radiansOffset,
         progressLineCap,
     }) => {

    // Static part of styles
    const staticStyles = {
        svg: {
            position: 'relative',
            zIndex: 2
        },
    };

    // Dynamic part of styles, memoized as it depends on props
    const dynamicPathStyle = React.useMemo(() => ({
        transform: `rotate(${radiansOffset}rad) ${direction === -1 ? 'scale(-1, 1)' : 'scale(1, 1)'}`,
        transformOrigin: 'center center'
    }), [radiansOffset, direction]);

    const halfTrack = trackSize / 2;
    const radius = width / 2 - halfTrack;

    return (
        <svg
            width={`${width}px`}
            height={`${width}px`}
            viewBox={`0 0 ${width} ${width}`}
            overflow="visible"
            style={staticStyles.svg}
        >
            <defs>
                <linearGradient id={label} x1="100%" x2="0%">
                    <stop offset="0%" stopColor={progressColorFrom}/>
                    <stop offset="100%" stopColor={progressColorTo}/>
                </linearGradient>
            </defs>
            <circle
                strokeWidth={trackSize}
                fill="none"
                stroke={trackColor}
                cx={width / 2}
                cy={width / 2}
                r={radius}
            />
            <path
                style={dynamicPathStyle}
                ref={svgFullPath}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeWidth={progressSize}
                strokeLinecap={progressLineCap !== 'round' ? 'butt' : 'round'}
                fill="none"
                stroke={`url(#${label})`}
                d={`
                        M ${width / 2}, ${width / 2}
                        m 0, -${width / 2 - halfTrack}
                        a ${width / 2 - halfTrack},${width / 2 - halfTrack} 0 0,1 0,${width - halfTrack*2}
                        a -${width / 2 - halfTrack},-${width / 2 - halfTrack} 0 0,1 0,-${width - halfTrack*2}
                    `}/>
        </svg>
    );
};

export default Svg;
