import { createElem } from '../../../utils/createElem';
import './modal.scss';

export default class Modal {
  drawModal(myModalTemplate: string) {
    const popup = createElem('div', 'popup', document.body);
    popup.innerHTML = this.render(myModalTemplate);

    //close modal-window on click on dark area
    popup.addEventListener('click', (e) => {
      const clickedElem = e.target as HTMLElement;
      if (clickedElem.classList.contains('popup')) {
        popup.remove();
      }
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
      </div>
    `;
  }
}
