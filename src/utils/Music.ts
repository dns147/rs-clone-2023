export default class Music {
  music: HTMLAudioElement;
  isMusic: boolean;

  constructor(musicSrc: string) {
    this.music = new Audio();
    this.music.src = musicSrc;
    this.isMusic = JSON.parse(localStorage.getItem('isMusic') || '{}');
    localStorage.removeItem('isPlayMusic');    

    window.addEventListener('hashchange', () => {
      this.stopMusic();
    });
  }

  playMusic(volume?: number) {
    this.updateIsMusic();
    if (this.isMusic) {
      this.music.play();
      this.music.volume = volume || 0.2;

      localStorage.setItem('isPlayMusic', 'true');
    }
  }

  stopMusic() {
    this.updateIsMusic();
    this.music.pause();
    this.music.currentTime = 0;

    localStorage.removeItem('isPlayMusic');
  }

  updateIsMusic() {
    this.isMusic = JSON.parse(localStorage.getItem('isMusic') || '{}');
  }
}
