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
	openFullscreen();

}
function changeImage() {
	if (currentImage >= images.length) {
		currentImage = 0;
	}
	document.getElementById("img").src = images[currentImage];
	currentImage++;
}

document.addEventListener("keypress", function (event) {
	console.log(event.keyCode);
	if (event.keyCode == 113) {
		closeFullscreen();
		location.reload();
	}
});

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}
