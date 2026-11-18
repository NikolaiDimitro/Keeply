import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

function getCurrentUserId() {
    const userId = auth.currentUser?.uid;

    if (!userId) {
        throw new Error('Трябва да влезеш в профила си, за да управляваш вещите.');
    }

    return userId;
}

function getItemsCollection() {
    return collection(db, 'users', getCurrentUserId(), 'items');
}

function getItemDocument(itemId) {
    return doc(db, 'users', getCurrentUserId(), 'items', itemId);
}

export async function getAllItems() {
    const snapshot = await getDocs(getItemsCollection());

    return snapshot.docs.map((itemDoc) => ({
        docId: itemDoc.id,
        ...itemDoc.data(),
    }));
}

export async function getOneItem(docId) {
    const snapshot = await getDoc(getItemDocument(docId));

    if (!snapshot.exists()) {
        return null;
    }

    return { docId: snapshot.id, ...snapshot.data() };
}

export async function addRequest(data) {
    const itemRef = await addDoc(getItemsCollection(), data);

    return itemRef.id;
}

export async function updateRequest(id, data) {
    await updateDoc(getItemDocument(id), data);
}
