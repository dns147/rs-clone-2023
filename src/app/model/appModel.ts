import AppView from '../view/AppView';

export default class AppModel {
  view: AppView;

  constructor(view: AppView) {
    this.view = view;
  }
}
