import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import firebase from 'firebase/compat/app';


export async function registration(name, email, password) {



    let userRegistration = await firebase.auth().createUserWithEmailAndPassword(email, password);


    try {

        if (userRegistration.user) {

            setAuthenticated(true);

        }

    } catch {



    }

}