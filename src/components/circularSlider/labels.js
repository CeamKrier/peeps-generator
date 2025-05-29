import React from 'react';

const Labels = ({
	labelColor,
	labelBottom,
	labelFontSize,
	valueFontSize,
	appendToValue,
	prependToValue,
	verticalOffset,
	hideLabelValue,
	label,
	value,
}) => {
	// Static styles that do not depend on props
	const staticStyles = {
		appended: {
			position: 'absolute',
			right: '0',
			top: '0',
			transform: 'translate(100%, 0)',
		},
		prepended: {
			position: 'absolute',
			left: '0',
			top: '0',
			transform: 'translate(-100%, 0)',
		},
		hide: {
			display: 'none',
		},
	};

	// Dynamic styles that depend on props
	const dynamicStyles = {
		labels: {
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			color: `${labelColor}`,
			userSelect: 'none',
			zIndex: 1,
		},
		value: {
			fontSize: `${valueFontSize}`,
			position: 'relative',
		},
		bottomMargin: {
			marginBottom: `calc(${verticalOffset})`,
		},
	};

	return (
		<div style={{ ...dynamicStyles.labels, ...(hideLabelValue && staticStyles.hide) }}>
			{labelBottom || <div style={{ fontSize: labelFontSize }}>{label}</div>}
			<div
				style={{ ...dynamicStyles.value, ...(!labelBottom && dynamicStyles.bottomMargin) }}>
				<code>
					<span style={staticStyles.prepended}>{prependToValue}</span>
					{value}
					<span style={staticStyles.appended}>{appendToValue}</span>
				</code>
			</div>
			{labelBottom && <div style={{ fontSize: labelFontSize }}>{label}</div>}
		</div>
	);
};

export default Labels;
