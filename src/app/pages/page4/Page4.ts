import Modal from '../modal/modal';
import ModalMessage from '../modalMessage/modalMessage';

export default class Page4 {
  constructor() {}

  listenPage() {
    const page4 = document.querySelector('.page-4') as HTMLElement;
    const btnShowModalMessage = page4.querySelector('.test-modal-message') as HTMLElement;
    const btnShowModal = page4.querySelector('.test-modal') as HTMLElement;

    btnShowModalMessage.addEventListener('click', () => {
      const modalMessage = new ModalMessage();
      modalMessage.drawModalMessage(
        `
          <p>Attention on page 4!</p>
          <p>In 3 seconds, switch to page 3 or close!</p>  
          <button class="btn">Кнопка-auto-width</button>  
        `,
        true,
        'page3'
      );
    });

    btnShowModal.addEventListener('click', () => {
      const modal = new Modal();
      modal.drawModal(this.modalTemplatePage4());
    });
  }

  modalTemplatePage4(): string {
    return `
        <h2>Some info on Page 4</h2>
        <form>Какая-то форма</form>
    `;
  }

  render(): string {
    return `
        <div class="container page-4">
            <button class="btn">Кнопка</button>
            <button class="btn">Кнопка-auto-width ModalMessage</button>
            <button class="btn btn--mini">mini</button>
            <button class="btn btn--round">3</button>
            <button class="btn btn--big">Кнопка 4 big</button>
            <button class="btn btn--col-7">Кнопка btn--col-7 </button>
            <button class="btn btn--col-5">Кнопка btn--col-5</button>
            <button class="btn btn--col-3">Button btn--col-3</button>
            <button class="btn btn--transp">Кнопка btn--border</button><br><br>  
            <button class="btn btn--col-7 test-modal-message">Test ModalMessage</button>
            <button class="btn btn--col-5 accent-font test-modal">Test modal</button>

            <button class="btn btn--start-game btn--fixed-center start-game-btn ">Start Game</button>
            <button class="btn accent-font">Music on/off</button>
            <button class="btn music-btn btn--start-game">Music on/off</button>
            <button class="btn sound-btn btn--col-3 accent-font">Sound effects on/off</button>
      </div>
    `;
  }

  init(): void {
    this.listenPage();
  }
}
