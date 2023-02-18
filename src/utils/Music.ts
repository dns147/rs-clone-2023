export default class Music {
  music: HTMLAudioElement;
  isMusic: boolean;

  constructor(musicSrc: string) {
    this.music = new Audio();
    this.music.src = musicSrc;
    this.isMusic = JSON.parse(localStorage.getItem('isMusic') || '{}');
  }
  playMusic() {
    this.updateIsMusic();
    if (this.isMusic) this.music.play();
  }
  stopMusic() {
    this.updateIsMusic();
    this.music.pause();
  }
  updateIsMusic() {
    this.isMusic = JSON.parse(localStorage.getItem('isMusic') || '{}');
  }
}