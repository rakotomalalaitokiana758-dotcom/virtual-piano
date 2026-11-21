let btn = document.getElementById("windows");

btn.addEventListener("keydown", () => {
  const audiContext = new AudioContext();
  const oscillator = audiContext.createOscillator();
  const gain = audiContext.createGain();
  const volume = 5;
  oscillator.frequency.value = "393.88";
  oscillator.type = "sine";

  gain.gain.setValueAtTime(volume, audiContext.currentTime);

  oscillator.connect(gain);

  gain.connect(audiContext.destination);

  gain.gain.exponentialRampToValueAtTime(0.1, audiContext.currentTime + 1);
  oscillator.start();

  //   oscillator.stop(audiContext.currentTime + 1);
  btn.addEventListener("keyup", () => {
    oscillator.stop(audiContext.currentTime + 0.5);
  });
});
