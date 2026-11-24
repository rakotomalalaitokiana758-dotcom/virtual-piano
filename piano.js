let btn = document.getElementById("btn");

document.querySelectorAll("#btn").forEach((key)=>{
  key.addEventListener("click", () => {
  const audiContext = new AudioContext();
  const oscillator = audiContext.createOscillator();
  const gain = audiContext.createGain();
  const volume = 5;
  oscillator.frequency.value = key.dataset.frequency;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(volume, audiContext.currentTime);

  oscillator.connect(gain);

  gain.connect(audiContext.destination);

  gain.gain.exponentialRampToValueAtTime(0.0041, audiContext.currentTime + 1);
  oscillator.start();
  oscillator.stop(audiContext.currentTime + 1);
  //   oscillator.stop(audiContext.currentTime + 1);
})});
