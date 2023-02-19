import { createElem } from '../../../utils/createElem';
import './modal.scss';
import soundSettingsSrc from '../../../assets/audio/effects/settings-1.mp3';

export default class Modal {
  drawModal(myModalTemplate: string) {
    const popup = createElem('div', 'popup', document.body);
    popup.innerHTML = this.render(myModalTemplate);

    //close modal-window on click on dark area
    popup.addEventListener('click', (e) => {
      const clickedElem = e.target as HTMLElement;
      if (clickedElem.classList.contains('popup') || clickedElem.classList.contains('popup__close-btn')) {
        const soundSettings = new Audio();
        soundSettings.src = soundSettingsSrc;
        soundSettings.play();

        popup.remove();
      }
    });

    window.addEventListener('hashchange', () => {
      console.log('The hash has changed!');
      popup.remove();
    });
  }

  drawModalWithoutClose(myModalTemplate: string) {
    const popup = createElem('div', 'popup', document.body);
    popup.innerHTML = this.render(myModalTemplate);

    popup.addEventListener('click', (e) => {
      const clickedElem = e.target as HTMLElement;
      if (clickedElem.classList.contains('exit')) {
        popup.remove();
      }
    });
  }

  render(modalTemplate: string): string {
    return `
      <div class="popup__content">
        ${modalTemplate}
        <div class="popup__close-btn btn btn--round">X<div>
      </div>
    `;
  }
}
