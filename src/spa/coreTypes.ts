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

export interface ISpa {
  container: string;
  routes: Routes;
  components: Components;
}
