let constraints = { video: true, audio: true };

let videoPlayer = document.querySelector("video");
let audioPlayer = document.querySelector("audio");
let vidRecBtn = document.querySelector("#record-video");

let captureBtn = document.querySelector("#click-picture");

let recordState = false;
let mediaRecorder;
let chunks = [];

captureBtn.addEventListener("click", function () {
    capture();
})

vidRecBtn.addEventListener("click", function () {
    if (!recordState) {
        mediaRecorder.start();
        recordState = true;
        vidRecBtn.innerText = "Recording...";
    } else {
        mediaRecorder.stop();
        recordState = false;
        vidRecBtn.innerText = "Record";
    }
});

navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    videoPlayer.srcObject = mediaStream;
    audioPlayer.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    }

    mediaRecorder.onstop = function () {
        let blob = new Blob(chunks, { type: "video/mp4" });
        chunks = [];
        let blobUrl = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = blobUrl;
        a.download = "vid.mp4";
        a.click();
    }
});

function capture() {
    let canvas = document.createElement("canvas");
    canvas.width = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;
    // console.log(videoPlayer.videoWidth, videoPlayer.videoHeight);

    let ctx = canvas.getContext("2d");
    ctx.drawImage(videoPlayer, 0, 0);
    if (filter != "") {
        ctx.fillStyle = filter;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    let link = document.createElement("a");
    link.download = "img.png";
    // toDataURL creating url.. 
    link.href = canvas.toDataURL();
    link.click();
}

let filter = "";

let allFilters = document.querySelectorAll(".filter");
for (let i of allFilters) {
    i.addEventListener("click", function (e) {
        filter = e.currentTarget.style.backgroundColor;
        addFilterToScreen(filter);
    });
}

function addFilterToScreen(filter) {
    let previousScreenFilter = document.querySelector(".screen-filter");
    if (previousScreenFilter) {
        previousScreenFilter.remove();
    }
    let filterScreen = document.createElement("div");
    filterScreen.classList.add("screen-filter");
    filterScreen.style.height = videoPlayer.offsetHeight + "px";
    filterScreen.style.width = videoPlayer.offsetWidth + "px";
    filterScreen.style.backgroundColor = filter;
    document.querySelector(".filter-screen-parent").append(filterScreen);
}