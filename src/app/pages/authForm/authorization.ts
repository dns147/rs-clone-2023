import { IUser } from "./types-auth-form";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { myAuth } from "../../firebase";
import { changeSignInButton, hideRegistrationForm, removeUserInfo, setUserName, showForm, showLoginError } from "./utils-auth-form";

export default class Authorization {
	async loginUser(user: IUser): Promise<void> {
		await signInWithEmailAndPassword(myAuth, user.email, user.password)
			.then((userCredential) => {
				const user = userCredential.user;
        hideRegistrationForm();
				setUserName(user.displayName);
				changeSignInButton(true);
				// user.getIdToken().then((idToken) => {
				// 	//setUserName(user.uid, idToken);
				// })
				// .catch((error) => {
				// 	//return getErrorMessage(error);
				// });
			})
			.catch((error) => {
				console.log(error.message);
				showForm();
      	showLoginError('Wrong e-mail or password');
			});
  }

	async createUser(user: IUser): Promise<void> {
		await createUserWithEmailAndPassword(myAuth, user.email, user.password)
			.then((userCredential) => {
				const user = userCredential.user;
				//localStorage.setItem('userName', JSON.stringify(user.displayName));
				// localStorage.setItem('userInfo', JSON.stringify(user));
      	// localStorage.setItem('userId', user.uid);
        hideRegistrationForm();
				changeSignInButton(true);
			})
			.catch((error) => {
				console.log(error.message);
				showForm();
      	showLoginError('Error in e-mail or it is already taken');
			});

		if (myAuth.currentUser !== null) {
			await updateProfile(myAuth.currentUser, {
				displayName: user.name,
			}).then(() => {
        setUserName(user.name ?? '');
			}).catch((error) => {
				console.log(error.message);
			});
		}
	}

  async userSignOut(): Promise<void> {
    signOut(myAuth).then(() => {
    }).catch((error) => {
      console.log(error.message);
    });
  }
}