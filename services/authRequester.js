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

let requestApi = {

    registration,
    login,
    logout

}
export default requestApi;