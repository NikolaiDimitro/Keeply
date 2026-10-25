
import { initializeApp, getApp, getApps } from 'firebase/app';
import {
    initializeAuth,
    getReactNativePersistence,
    getAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAiivDh3vWdmBNrUMWzlCtxMSD7iXvVKAs",
    authDomain: "keeply-52c11.firebaseapp.com",
    projectId: "keeply-52c11",
    storageBucket: "keeply-52c11.firebasestorage.app",
    messagingSenderId: "51703984564",
    appId: "1:51703984564:web:9872f8bff81c9838c902e1"
    
};

const app = getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

let auth;

try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} catch (error) {
    auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
