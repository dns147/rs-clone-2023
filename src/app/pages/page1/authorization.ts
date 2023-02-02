import { IUser } from "./types-auth-form";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { myAuth } from "../../firebase";

export default class Authorization {
	loginUser(user: IUser) {

		console.log(user)

		signInWithEmailAndPassword(myAuth, user.email, user.password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user)
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode)
				console.log(errorMessage)
			});
  }

	createUser(user: IUser) {
		createUserWithEmailAndPassword(myAuth, user.email, user.password)
			.then((userCredential) => {
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	}
}