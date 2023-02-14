import { Header } from '../app/components';

export class TypeOfClasses {
  constructor() {}
  render(): string {
    return '';
  }
  init(): void {}
}

export type Routes = { [key: string]: typeof TypeOfClasses };
export type Components = { [key: string]: typeof Header };
export type MousePos = { [key: string]: number };
export type ControlKeys = { [key: string]: boolean };

export interface ISpa {
  container: string;
  routes: Routes;
  components: Components;
}
