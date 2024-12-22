// mode 0: Just show CPS
// mode 1: 5 second speed test
// mode 2: 60 second speed test
// mode 3: go to "more tools"
var mode = 0;

var started;
var clicks = 0;

// intervals
var cpsInterval = setInterval(updateCPS, 250), timerInterval;

// multible cp makes cps shower be smoother. Change currentCps to change CPS.
var currentCps = 0, cps1 = 0, cps2 = 0, cps3 = 0;

// too hard to explain.
var timeFinish, currentTime, totalTimeInSeconds;

function modeSwitch(newMode) {
    let oldMode = mode;
    mode = newMode;
    switch (mode) {
        case 0:
			// mode 0: Just show CPS
            document.getElementById("text1").innerHTML = "0 cps";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "";
            currentCps, cps1, cps2, cps3 = 0, clicks = 0;
            clearInterval(cpsInterval);
            clearInterval(timerInterval);
            cpsInterval = setInterval(updateCPS, 250);
            break;
        case 1:
			// mode 1: 5 second speed test
            document.getElementById("text1").innerHTML = "Click to Start";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "0 cps";
            currentCps, cps1, cps2, cps3 = 0, clicks = 0, started = false;
            timeFinish = 100,  currentTime= 150, totalTimeInSeconds = 5;
            clearInterval(cpsInterval);
            clearInterval(timerInterval);
            break;
        case 2:
			// mode 2: 60 second speed test
            document.getElementById("text1").innerHTML = "Click to Start";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "0 cps";
            currentCps, cps1, cps2, cps3 = 0, clicks = 0, started = false;
            timeFinish = 1000,  currentTime= 1600, totalTimeInSeconds = 60;
            clearInterval(cpsInterval);
            clearInterval(timerInterval);
            break;
        case 3:
			// mode 3: go to "more tools"
            mode = oldMode;
			window.open("https://clutools.github.io/", "_blank");
            popup(true, "custom");
            return;
    }
	// add borders
    document.getElementById("mb" + oldMode).classList.remove("buttonBorder");
    document.getElementById("mb" + mode).classList.add("buttonBorder");
}

document.getElementById("clickCounter").addEventListener('click', function (e) {
	click()
	summonCircle(e.clientX, e.clientY);
});

//count clicks
function click() {
	if (mode == 0) {
        clicks++;
        document.getElementById("text2").innerHTML = clicks + " clicks";
        currentCps++;
    } else {
        if (started) {
            currentCps++;
            clicks++;
            document.getElementById("text2").innerHTML = clicks + " clicks";
        } else {
            currentCps++;
            clicks++;
            document.getElementById("text2").innerHTML = clicks + " clicks";
            started = true;
            cpsInterval = setInterval(updateCPS, 250);
            timerInterval = setInterval(timer, 100);
        }
    }
}

//timer
function timer() {
    currentTime--;
    document.getElementById("text1").innerHTML = ((currentTime + "").slice(1, -1) + "." + (currentTime + "").slice(-1, currentTime.length)) + "s left";
    if (currentTime == timeFinish) {
        clearInterval(timerInterval);
        popup(true, "result");
        started = false;
    }
}

function updateCPS() {
    if (mode == 0) {
        document.getElementById("text1").innerHTML = (currentCps + cps1 + cps2 + cps3) + " cps";
    } else {
        document.getElementById("text3").innerHTML = (currentCps + cps1 + cps2 + cps3) + " cps";
    }
    cps3 = cps2;
    cps2 = cps1;
    cps1 = currentCps;
    currentCps = 0;
}

function popup(toOpen, id) {
    if (toOpen) {
        document.getElementById(id + "Back").style.display = "block";
        document.getElementById(id).style.display = "block";
        if (id == "result") {
            document.getElementById("resultTitle").innerHTML = (Math.round((clicks / totalTimeInSeconds) * 1000) / 1000)  + " CPS";
            document.getElementById("resultClicks").innerHTML = clicks + ` <span class="c">CLICK${(clicks != 1) ? "S" : ""} IN</span> ${totalTimeInSeconds} <span class='c'>SECONDS</span>`;
            modeSwitch(mode); // reset
            clickProjection();
        }
    } else {
		// close
        document.getElementById(id + "Back").style.display = "none";
        document.getElementById(id).style.display = "none";
    }
}
// this makes it so you dont click on ad or close result on accident
function clickProjection() {
    document.getElementById("clickProtector").style.display = "block";
    setTimeout(function() {document.getElementById("clickProtector").style.display = "none";}, 1000);
}

document.getElementById("clickCounter").addEventListener('contextmenu', function(e) {
    e.preventDefault();
	click();
	summonCircle(e.clientX, e.clientY);
}, false);

var colors = ["#f00", "#0f0", "#00f", "#ff0", "#fff", "#ff0", "#ff0", "#ff0"], prevColor = "#ff0";

function summonCircle(x, y) {
	let circle = document.createElement("div");
	circle.classList.add("circle");
	circle.style.left = x + "px";
	circle.style.top = y + "px";
	if ((Math.random() * 3) < 1) {
		circle.style.backgroundColor = prevColor;
	} else {
		prevColor = colors[Math.floor(Math.random() * 11)];
		circle.style.backgroundColor = prevColor;
	}
	console.log(colors[Math.floor(Math.random() * 8)]);
	document.getElementById("circles").appendChild(circle);
	setTimeout(function() {
		document.getElementById("circles").children[0].remove();
	}, 1000);
}