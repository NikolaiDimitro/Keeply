import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';

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

export function createItemId() {
    return doc(getItemsCollection()).id;
}

export async function addRequest(data, itemId) {
    if (itemId) {
        await setDoc(doc(getItemsCollection(), itemId), data);
        return itemId;
    }

    const itemRef = await addDoc(getItemsCollection(), data);
    return itemRef.id;
}

export async function uploadItemAttachments(itemId, files) {
    const userId = getCurrentUserId();
    const uploaded = [];
    const attachments = [];

    try {
        for (const [index, file] of files.entries()) {
            const response = await fetch(file.uri);

            const blob = await response.blob();
            const extension = file.name?.includes('.')
                ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
                : '';
            const safeName = `${index + 1}-${Date.now()}${extension}`;
            const storagePath = `users/${userId}/items/${itemId}/${safeName}`;
            const fileRef = ref(storage, storagePath);

            await uploadBytes(fileRef, blob, {
                contentType: file.mimeType,
            });
            uploaded.push(fileRef);

            attachments.push({
                name: file.name,
                mimeType: file.mimeType,
                size: file.size ?? null,
                storagePath,
                url: await getDownloadURL(fileRef),
            });
        }
    } catch (error) {
        await Promise.allSettled(uploaded.map((fileRef) => deleteObject(fileRef)));
        throw error;
    }

    return attachments;
}

export async function updateRequest(id, data) {
    await updateDoc(getItemDocument(id), data);
}
