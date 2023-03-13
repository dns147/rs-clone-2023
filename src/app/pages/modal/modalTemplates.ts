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
    <p>You need to save the pumpkin from Halloween Monsters.</p>
    <p>You have unlimited gourd bullets and limited fireball bullets.</p>
    <p>Also you have the ability to temporarily freeze monsters and the ability to blow up all monsters. Such activities are limited.</p>
    <p>Collect falling items to replenish your ammo.</p>
    <p>Use keys 1 and 2 to switch between bullets. Use key 3 to activate freeze and key 4 to activate bomb explosion.</p>
  </div>
`;

export default {
  modalTemplateSettings,
  gameInfoModalTemplate,
};
