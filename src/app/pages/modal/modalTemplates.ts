const modalTemplateSettings = `
  <div class="settings">
    <div class="settings__title title-modal">Settings</div>
    <div class="settings__container">
      <div>
        <button class="settings__btn settings__btn--sound btn btn--col-3 accent-font sound-btn"><span></span> Sound effects on/off</button>
      </div>
        <button class="settings__btn settings__btn--music btn btn--col-3 accent-font music-btn"><span></span> Music on/off</button>
        
        <a href="#/chooseGames" class="settings__btn btn accent-font accent-font--upper">play games</a>
        <a href="#/results" class="settings__btn btn accent-font accent-font--upper">results</a>
        <a href="#" class="settings__btn btn accent-font accent-font--upper">On main page</a>
      </div>
  </div>
`;

export default {
  modalTemplateSettings,
};
