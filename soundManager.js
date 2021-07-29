class SoundManager {

  constructor() {
    this.currentSound = null;

  }

  play(sound, force = false) {

    if (this.currentSound != null && this.currentSound.isPlaying) {
      if (force) {
        this.currentSound.stop();
      } else {
        return;
      }
    }

    this.currentSound = resources[sound].sound;
    this.currentSound.volume = volume;
    this.currentSound.play();

  }

  stop() {

    if (this.currentSound != null) {
      this.currentSound.stop();
    }

  }

  pause() {

    if (this.currentSound != null) {
      this.currentSound.pause();
    }
  }

  resume() {

    if (this.currentSound != null) {
      this.currentSound.resume();
    }
  }

}