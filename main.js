"use strict";


const videoElement = document.querySelector("video");
const dialog = document.querySelector("dialog");
const a = document.querySelector("a");
const button = document.querySelector("button")

button.addEventListener('click', e => dialog.close());

const main = async () => {

  let constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment",
        width: 80,
        height: 60
      }
    }
  };

  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;

    const detector = new BarcodeDetector({
      formats: ['qr_code']
    });

    let detectionList = null;

    setInterval(async () => {
      detectionList = await detector.detect(videoElement);
      a.href = a.textContent = detectionList[0].rawValue;
      dialog.showModal();
    }, 100); 

  } catch(err) {
    console.log(err);

  }

};

main();