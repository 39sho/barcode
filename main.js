'use strict';

const videoElement = document.querySelector('video');
const dialog = document.querySelector('dialog');
const a = document.querySelector('a');
const button = document.querySelector('button')

button.addEventListener('click', e => {
  videoElement.play();
  dialog.close()
});

const main = async () => {

  let constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: 'environment'
      },
      width: 480,
      height: 480,
      frameRate: 20
    }
  };

  try {

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;

/*
    const detector = new BarcodeDetector({
      formats: ['qr_code']
    });
*/
    const detector = new BarcodeDetector();

    let detectionList = null;

    setInterval(async () => {
      detectionList = await detector.detect(videoElement);
      for (const detected of detectionList) {
        if (detected.format === 'qr_code') {
          a.href = a.textContent = detected.rawValue;
        }else {
          a.textContent = `「${detected.rawValue}」で検索`;
          a.href = a.textContent = `https://www.google.com/search?q=${detected.rawValue}`;
        }
        if (!dialog.hasAttribute('open')) {
          videoElement.pause();
          dialog.showModal();
        }
      }
    }, 500); 
  } catch(err) {
    
    console.error(err);

  }
};

main();
