import React from 'react';
import { HuePicker, CustomPicker } from 'react-color';
import Saturation from 'react-color/lib/components/common/Saturation';
import ChromePointerCircle from 'react-color/lib/components/chrome/ChromePointerCircle';

const GradientColorPicker = ({ hsl, hsv, hex, onChange }) => {
	const styles = {
		saturation: {
			width: '100%',
			paddingBottom: '60%',
			position: 'relative',
			borderRadius: '6px 6px 0 0',
			overflow: 'hidden',
		},
		Saturation: {
			radius: '6px 6px 0 0',
		},
	};
	return (
		<div style={{ width: '100%' }}>
			<div style={styles.saturation}>
				<Saturation
					style={styles.Saturation}
					hsl={hsl}
					hsv={hsv}
					pointer={ChromePointerCircle}
					onChange={onChange}
				/>
			</div>
			<div style={{ display: 'flex', marginTop: '.5em' }}>
				<div style={{ flex: 1 }}>
					<div
						style={{
							position: 'relative',
							display: 'flex',
							justifyContent: 'center',
						}}>
						<HuePicker width='90%' color={hex} onChange={onChange} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomPicker(GradientColorPicker);
