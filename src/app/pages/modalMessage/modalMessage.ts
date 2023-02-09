import { createElem } from '../../../utils/createElem';
import './modalMessage.scss';

export default class ModalMessage {
  drawModalMessage(myMessage: string, toPage?: string) {
    const modalMessage = createElem('div', 'popup popup-message', document.body);
    modalMessage.innerHTML = this.render(myMessage);

    setTimeout(() => {
      modalMessage.remove();

      if (toPage) {
        window.location.hash = `/${toPage}`;
      }
    }, 3000);
  }

  render(message: string): string {
    return `
      <div class="popup-message__content">
        <div class="popup-message__message-info">${message}</div>
      </div>
    `;
  }
}
