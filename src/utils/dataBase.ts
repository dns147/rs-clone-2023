import { myDatabase } from '../app/firebase';
import { ref, set, onValue } from 'firebase/database';
import { DataFromDb, ResultGame } from '../spa/coreTypes';

export default class DataBase {
  results: DataFromDb;

  constructor() {
    this.results = {};
  }
  saveToStorage(result: ResultGame): void {
    const { id, name, game, score, level, time } = result;

    if (localStorage['userName']) {
      set(ref(myDatabase, `users/${id}/${game}/`), {
        name: name,
        game: game,
        score: score,
        level: level,
        time: time,
      })
        .then(() => {
          console.log('Data saved successfully!');
        })
        .catch((error) => {
          console.error('The write failed: ', error);
        });
    } else {
      console.log('User not registered');
    }
  }
}
