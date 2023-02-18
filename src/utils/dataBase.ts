import { myDatabase } from '../app/firebase';
import { ref, set, onValue } from "firebase/database";
import { DataFromDb, ResultGame } from '../spa/coreTypes';

export default class DataBase {
  results: DataFromDb;

  constructor() {
    this.results = {};
  }
  saveToStorage(result: ResultGame): void {
    const { id, name, game, score, level, time } = result;

    if (localStorage['userName']) {
      set(ref(myDatabase, 'users/' + id), {
        name: name,
        game: game,
        score: score,
        level: level,
        time: time
      })
      .then(() => {
        console.log("Пользователь добавлен в коллецию Records");
      })
      .catch((error) => {
        console.error("Ошибка добавления пользователя: ", error);
      });
    } else {
      console.log('Пользователь не зарегистрирован');
    }
  }

  getFromStorage(): void {
    const dataFromDb = ref(myDatabase, 'users/');

    onValue(dataFromDb, function(snapshot) {
      const resultData = snapshot.val();
      localStorage.setItem('dataFromDb', JSON.stringify(resultData));
    });
  }
}