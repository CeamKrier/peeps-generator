import * as FileSaver from 'file-saver';

export const saveSvg = (svgEl: HTMLElement, name: string) => {
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const svgData = svgEl.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgBlob = new Blob([preface, svgData], {
    type: 'image/svg+xml;charset=utf-8'
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
  const canvas = document.createElement('canvas')
  canvas.width = 390 * scaleVector
  canvas.height = 390 * scaleVector

  const canvasContext = canvas.getContext('2d');

  const DOMURL = self.URL || self.webkitURL || self;
  const image = new Image();
  const svgBlob = new Blob([preface, svgData], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = DOMURL.createObjectURL(svgBlob);

  canvas.style.display = 'none';
  document.body.appendChild(canvas)

  image.onload = () => {
    canvasContext?.drawImage(image, 0, 0);
    DOMURL.revokeObjectURL(url);
    canvas.toBlob(pngBlob => {
      pngBlob && downloadResource(pngBlob, name);
      document.body.removeChild(canvas)
    });
  };
  
  image.src = url;
};

const downloadResource = (resource: Blob, name: string) => {
  FileSaver.saveAs(resource, name);
};
