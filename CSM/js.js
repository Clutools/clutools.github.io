var delay, images, currentImage = 0;
function start() {
	document.getElementById("start").style.display = "none";
	document.getElementById("outer").style.display = "block";
	delay = document.getElementById("delay").value;
	images = [];
	var imagesHTML = document.getElementById("files");
	for (var i = 0; i < imagesHTML.files.length; i++) {
		images.push(URL.createObjectURL(imagesHTML.files[i]));
	}
	changeImage();
	setInterval(changeImage, delay * 1000);
}
function changeImage() {
	if (currentImage >= images.length) {
		currentImage = 0;
	}
	document.getElementById("img").src = images[currentImage];
	currentImage++;
}