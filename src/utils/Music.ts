export default class Music {
  music: HTMLAudioElement;
  isMusic: boolean;

  constructor(musicSrc: string) {
    this.music = new Audio();
    this.music.src = musicSrc;
    //this.music.volume = 0.2;
    this.isMusic = JSON.parse(localStorage.getItem('isMusic') || '{}');

    window.addEventListener('hashchange', () => {
      this.stopMusic();
    });
  }
  playMusic(volume?: number) {
    this.updateIsMusic();
    if (this.isMusic) {
      this.music.play();
      this.music.volume = volume || 0.2;
    }
  }
  stopMusic() {
    this.updateIsMusic();
    this.music.pause();
    this.music.currentTime = 0;
  }
  updateIsMusic() {
    this.isMusic = JSON.parse(localStorage.getItem('isMusic') || '{}');
  }
}
