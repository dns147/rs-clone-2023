const modalTemplateSettings = `
  <div class="settings">
    <div class="settings__title title-modal">Settings</div>
    <div class="settings__container">
      <div>
        <button class="settings__btn settings__btn--sound btn btn--col-3 accent-font sound-btn"><span></span> Sound effects on/off</button>
      </div>
        <button class="settings__btn settings__btn--music btn btn--col-3 accent-font music-btn"><span></span> Music on/off</button>
        
        <a href="#/chooseGames" class="settings__btn btn accent-font accent-font--upper">games</a>
        <a href="#/results" class="settings__btn btn accent-font accent-font--upper">results</a>
      </div>
  </div>
`;

const gameInfoModalTemplate = `
  <h2 class="title-modal">About game</h2>
  <div class="game-info-modal">
    <h3 class="subtitle-modal">Subtitle</h3>
    <p>Info about game</p>
    <p>Bla-bla-bla</p>
    <p>Bla-bla-bla</p>
    <p>Bla-bla-bla</p>
    
    <h3 class="subtitle-modal">Subtitle</h3>
    <p>Bla-bla-bla</p>
    <p>Bla-bla-bla</p>
  </div>
`;

export default {
  modalTemplateSettings,
  gameInfoModalTemplate,
};
