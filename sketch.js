const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

let rawImage;
let usedImage;

const reader = new FileReader();

reader.addEventListener('load', () => {
	removeElements();
	localStorage.setItem('recent-image', reader.result);
	rawImage = localStorage.getItem('recent-image');
	usedImage = loadImage(rawImage, () => {
		usedImage.loadPixels();
		usedImage.resize(30, 30);
	});
});

document.querySelector('#FileInput').addEventListener('change', function () {
	reader.readAsDataURL(this.files[0]);
	this.value = null;
});

function CreateAscii() {
	if (usedImage == undefined) return alert('No Image Loaded...');
	for (let j = 0; j < usedImage.height; j++) {
		let text = '';
		for (let i = 0; i < usedImage.width; i++) {
			const pixelIndex = (i + j * usedImage.width) * 4;
			const r = usedImage.pixels[pixelIndex + 0];
			const g = usedImage.pixels[pixelIndex + 1];
			const b = usedImage.pixels[pixelIndex + 2];

			const avg = (r + g + b) / 3;

			const len = density.length;
			const charIndex = floor(map(avg, 0, 255, 0, len));

			const c = density.charAt(charIndex);
			if (c == '') text += '&nbsp;';
			else text += c;
		}
		let row = createDiv(text);
		row.parent('#container');
	}
}

function ClearAscii() {}

function setup() {
	noCanvas();
	noLoop();
}
