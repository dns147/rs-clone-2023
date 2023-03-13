import CONST from './../../../spa/coreConst';

const userName: string = localStorage['userName'] ? JSON.parse(localStorage['userName']) : CONST.unknownUserName;
const userTemplate = `
  <button class="main-user user-sign-in btn btn--col-3 accent-font" data-tooltip='sign in'>
    <div class="main-user-icon"></div>
    <span class="main-user-name">${userName}</span>
  </button>
  `;

export const settingsBtnTemplate = `
  <button class="btn-nav btn-nav--settings settings-btn"></button>
`;

export const gameInfoBtnTemplate = `
  <button class="btn-nav btn-nav--game-info game-info-btn hide"></button>
`;

export const homeBtnTemplate = `
  <a href="#" class="btn-nav btn-nav--home home-btn"></a>
`;

export const navBlockTemplate = `
  <div class="nav-block container">
    <div class="nav-block__left">      
    </div>

    <div class="nav-block__right">
    ${gameInfoBtnTemplate}
    ${settingsBtnTemplate}
    ${userTemplate}
    ${homeBtnTemplate}
    </div>
  </div>
`;
