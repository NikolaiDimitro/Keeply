import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

export async function registration({ displayName, email, password }) {

    let userRegistration = await createUserWithEmailAndPassword( auth, email, password );
    await updateProfile(userRegistration.user, { displayName });

    return userRegistration;

}