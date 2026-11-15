import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
} from 'firebase/auth';
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

async function changingPassword({ user, currentPassword, password }) {
    if (!user?.email) {
        throw new Error('Няма влязъл потребител с имейл.');
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, password);
}

let requestApi = {

    registration,
    login,
    logout,
    changingName,
    changingPassword

}
export default requestApi;