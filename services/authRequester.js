import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

export async function registerUser(name, email, password) {

    const registry = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(registry.user, { displayName: name });
    return registry;
    
}