import React, { Fragment } from 'react';

const Knob = ({
	isDragging,
	knobPosition,
	knobColor,
	knobRadius = 12,
	knobSize = 36,
	onMouseDown,
	trackSize,
	children,
}) => {
	// Static styles that do not depend on props
	const staticStyles = {
		dragging: {
			cursor: 'grabbing',
		},
		pause: {
			animationPlayState: 'paused',
		},
		animation: {
			transformOrigin: '50% 50%',
			animationTimingFunction: 'ease-out',
			animation: 'pulse 1500ms infinite',
		},
	};

	// Dynamic style part that depends on props
	const knobDynamicStyle = {
		position: 'absolute',
		left: `-${knobSize / 2 - trackSize / 2}px`,
		top: `-${knobSize / 2 - trackSize / 2}px`,
		cursor: 'grab',
		zIndex: 3,
	};

	const defaultKnobIcon = () => {
		return (
			<Fragment>
				<rect fill='#FFFFFF' x='14' y='14' width='8' height='1' />
				<rect fill='#FFFFFF' x='14' y='17' width='8' height='1' />
				<rect fill='#FFFFFF' x='14' y='20' width='8' height='1' />
			</Fragment>
		);
	};

	const customKnobIcon = () => children;

	return (
		<div
			style={{
				transform: `translate(${knobPosition.x}px, ${knobPosition.y}px)`,
				...knobDynamicStyle, // Apply dynamic styles
				...(isDragging && staticStyles.dragging), // Apply static conditional style
			}}
			onMouseDown={onMouseDown}
			onTouchStart={onMouseDown}>
			<svg
				width={`${knobSize}px`}
				height={`${knobSize}px`}
				viewBox={`0 0 ${knobSize} ${knobSize}`}>
				<circle
					style={{ ...staticStyles.animation, ...(isDragging && staticStyles.pause) }} // Apply static conditional styles
					fill={knobColor}
					fillOpacity='0.2'
					stroke='none'
					cx={knobSize / 2}
					cy={knobSize / 2}
					r={knobSize / 2}
				/>
				<circle
					fill={knobColor}
					stroke='none'
					cx={knobSize / 2}
					cy={knobSize / 2}
					r={knobRadius}
				/>
				{children ? customKnobIcon() : defaultKnobIcon()}
			</svg>
		</div>
	);
};

export default Knob;
