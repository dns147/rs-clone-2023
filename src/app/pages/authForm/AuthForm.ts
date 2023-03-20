import './style-auth-form.scss';
import './loader.scss';

export default class AuthForm {
  constructor() {}

  render(): string {
    return `
      <div class="registration-container">
        <form class="registration-form">
          <div class="form-content">
            <div class="block-headers">
              <div class="registration-block">
                <h2 class="title-modal title--dark">Register</h2>
              </div>
              <div class="authorization-block">
                <h2 class="title-modal title--dark">Sign in</h2>
              </div>
              <span class="errorMsg">Wrong e-mail or password</span>
            </div>
            <div class="form-fields">
              <input type="text" id="name" name="username" placeholder="Name" class="registration-block">
              <div class="email-field field">
                <input type="email" id="email" name="email" required placeholder="E-mail*">
                <span>The field is filled incorrectly!</span>
              </div>
              <div class="pwd-field field">
                <input type="password" id="password" name="password" required placeholder="Password*" minlength="6">
                <span>Min password length - 6 symbols</span>
              </div>
            </div>
            <p>* - required fields</p>
            <div class="registration-block">
              <a class="registration-btn btn btn--col-3 accent-font accent-font--upper disabled">Register</a>
              <div class="auth-link">
                <span>Already registered?</span>
                <button class="link-btn login-link" type="button">Yes, sign in!</button>
              </div>
            </div>
            <div class="authorization-block">
              <a class="authorization-btn btn btn--col-3 accent-font accent-font--upper disabled">Sign in</a>
              <div class="registration-link">
                <span>Don't have an account?</span>
                <button class="link-btn reg-link" type="button">Register</button>
              </div>
            </div>
          </div>
          <div class="close-registration-form btn btn--round btn--col-3">X</div>
        </form>
      </div>
    `;
  }

  init(): void {}
}
