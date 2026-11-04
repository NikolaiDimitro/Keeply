import { collection, getDoc, getDocs, setDoc, setDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function getAllRequest() {

    const snapshot = await getDocs(collection(db, 'request'));

    if (snapshot.empty) {

        return null;

    } else {

        return snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));

    }
}

export async function getOneItem(docId) {

    const snapshot = await getDoc(doc(docId));

    return snapshot.exists() ? { docId: snapshot.id, ...snapshot.data() } : null;

}

export async function addRequest(data) {

    const snapshot = await setDoc(doc(collection(db, 'request')), data);

    if (!snapshot) {

        return null;

    }

    return { docId: snapshot.id, ...data };

}

export async function updateRequest(docId, data) {

    const snapshot = await setDoc(doc(db, 'request', docId), data, { merge: true }).then;

    if (!snapshot) {

        return null;

    }

    return { docId, ...data };

}