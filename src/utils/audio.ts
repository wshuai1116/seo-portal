
export function playAudio(audio: HTMLAudioElement) {
  var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended
    && audio.readyState > audio.HAVE_CURRENT_DATA;
  if (!isPlaying) {
    let playPromise = audio.play();
    if (playPromise) {
      playPromise.then(_ => {
      })
        .catch(error => {
        });
    }
  }
}

export function pauseAudio(audio: HTMLAudioElement) {
  audio.pause();
}

export function replayAudio(audio: HTMLAudioElement) {
  audio.pause()
  audio.currentTime = 0;
  playAudio(audio)
}