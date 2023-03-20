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

export type ResultGame = {
  id: string;
  name: string;
  game: string;
  score: number;
  level?: number;
  time?: string;
};

export type DataFromDbInner = { [key: string]: ResultGame };
export type DataFromDb = { [key: string]: DataFromDbInner };
