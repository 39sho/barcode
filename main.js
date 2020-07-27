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

    const detector = new BarcodeDetector({
      formats: ['qr_code']
    });

    let detectionList = null;

    setInterval(async () => {
      detectionList = await detector.detect(videoElement);
      for (const detected of detectionList) {
        a.href = a.textContent = detected.rawValue;
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