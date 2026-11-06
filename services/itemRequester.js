import { collection, getDoc, getDocs, setDoc, setDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function getAllItems() {

    const snapshot = await getDocs(collection(db, 'items'));

    try {

        return snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));

    } catch (err) {

        return err;

    }
}

export async function getOneItem(docId) {

    const snapshot = await getDoc(doc(db, 'items', docId));

    try {

        return { docId: snapshot.id, ...snapshot.data() };

    } catch (err) {

        return err;

    }

}

export async function addRequest(data) {

    const snapshot = await setDoc(doc(collection(db, 'items')), data);

    try {

        return { docId: snapshot.id, ...data };

    } catch (err) {

        return err;

    }

}

export async function updateRequest(docId, data) {

    const snapshot = await setDoc(doc(db, 'items', docId), data, { merge: true });

    try {


        return { docId: snapshot.id, ...data };

    } catch (err) {

        return err;

    }

}