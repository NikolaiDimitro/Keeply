import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

async function registration({ displayName, email, password }) {

    let userRegistration = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userRegistration.user, { displayName });

    return userRegistration;

}

async function login({ email, password }) {

    let loginReq = await signInWithEmailAndPassword(auth, email, password);
    return loginReq;

}

async function logout() {

    await signOut(auth);

}

async function changingName(displayName) {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error('Няма влязъл потребител.');
    }

    await updateProfile(currentUser, { displayName });

}

let requestApi = {

    registration,
    login,
    logout,
    changingName

}
export default requestApi;