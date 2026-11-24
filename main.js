const keyMap = new Map();

document.querySelectorAll(".btn").forEach((key) => {
  key.addEventListener("click", () => {
    playNote(key);
  });

  if (key.dataset.key) {
    keyMap.set(key.dataset.key.toLowerCase(), key);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.repeat) return;

  const targetButton = keyMap.get(event.key.toLowerCase());
  if (targetButton) {
    playNote(targetButton);
    targetButton.classList.add("active");
  }
});

document.addEventListener("keyup", (event) => {
  const targetButton = keyMap.get(event.key.toLowerCase());
  if (targetButton) {
    targetButton.classList.remove("active");
  }
});

function playNote(key) {
  const frequency = parseFloat(key.dataset.frequency);
  if (Number.isNaN(frequency)) return;

  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const volume = 0.4;
  const duration = 1;

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.0041,
    audioContext.currentTime + duration,
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);

  oscillator.onended = () => {
    audioContext.close();
  };
}