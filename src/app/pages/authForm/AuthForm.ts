import './style-auth-form.scss';
import './loader.scss';

export default class AuthForm {
  constructor() {
  }

  render(): string {
    return `
      <div class="registration-container">
        <form class="registration-form">
          <div class="form-content">
            <div class="block-headers">
              <div class="registration-block">
                <h2>Зарегистрироваться</h2>
              </div>
              <div class="authorization-block">
                <h2>Войти в аккаунт</h2>
              </div>
              <span class="errorMsg">Неправильный e-mail или пароль</span>
            </div>
            <div class="form-fields">
              <input type="text" id="name" name="username" placeholder="Имя" class="registration-block">
              <div class="email-field field">
                <input type="email" id="email" name="email" required placeholder="E-mail*">
                <span>Поле заполнено неверно!</span>
              </div>
              <div class="pwd-field field">
                <input type="password" id="password" name="password" required placeholder="Пароль*" minlength="8">
                <span>Минимальная длина пароля - 6 символов</span>
              </div>
            </div>
            <p>* - поля, обязательные для заполнения</p>
            <div class="registration-block">
              <a class="registration-btn disabled">Зарегистрироваться</a>
              <div class="auth-link">
                <span>Уже зарегистрированы?</span>
                <button class="link-btn login-link" type="button">Да, войти!</button>
              </div>
            </div>
            <div class="authorization-block">
              <a class="authorization-btn disabled">Войти</a>
              <div class="registration-link">
                <span>Нет аккаунта?</span>
                <button class="link-btn reg-link" type="button">Зарегистрироваться</button>
              </div>
            </div>
          </div>
          <div class="close-registration-form">
            <i class="fa-solid fa-circle-xmark"></i>
          </div>
        </form>
      </div>
    `;
  }

  init(): void {}
}
