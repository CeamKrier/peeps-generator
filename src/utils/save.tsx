import * as FileSaver from 'file-saver';

export const saveSvg = (svgEl: HTMLElement, name: string) => {
	svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	const svgData = svgEl.outerHTML;
	const preface = '<?xml version="1.0" standalone="no"?>\r\n';
	const svgBlob = new Blob([preface, svgData], {
		type: 'image/svg+xml',
	});
	downloadResource(svgBlob, name);
};

export const savePng = (
	svgEl: HTMLElement,
	name: string,
	scaleVector: number
) => {
	svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	const svgData = svgEl.outerHTML;
	const preface = '<?xml version="1.0" standalone="no"?>\r\n';
	const canvas = document.createElement('canvas');
	canvas.width = svgEl.getBoundingClientRect().width * scaleVector;
	canvas.height = svgEl.getBoundingClientRect().height * scaleVector;

	const canvasContext = canvas.getContext('2d');

	const DOMURL = window.self.URL || window.self.webkitURL || window.self;
	const image = new Image();
	const svgBlob = new Blob([preface, svgData], {
		type: 'image/svg+xml',
	});
	const url = DOMURL.createObjectURL(svgBlob);

	canvas.style.display = 'none';
	document.body.appendChild(canvas);

	image.onload = () => {
		if (!canvasContext) {
			return;
		}

		const userAgent = window.navigator.userAgent;
		if (
			userAgent.indexOf('Safari') !== -1 &&
			userAgent.indexOf('Chrome') === -1
		) {
			canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);
		} else {
			canvasContext.drawImage(image, 0, 0);
		}

		DOMURL.revokeObjectURL(url);
		canvas.toBlob((pngBlob) => {
			pngBlob && downloadResource(pngBlob, name);
			document.body.removeChild(canvas);
		});
	};

	image.src = url;
};

const downloadResource = (resource: Blob, name: string) => {
	FileSaver.saveAs(resource, name);
};
