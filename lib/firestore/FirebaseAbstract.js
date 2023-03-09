import { addDoc, collection, deleteDoc, doc, docSnapshots, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError.js';
import { ofFirestore } from './ofFirestore.js';
import { toFirestore } from './toFirestore.js';
export class FirebaseAbstract {
    firestore;
    collectionName;
    constructor(firestore, collectionName) {
        this.firestore = firestore;
        this.collectionName = collectionName;
    }
    async add(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.createdAt = serverTimestamp();
            clone.updatedAt = null;
        }
        delete clone.id;
        const { id } = await addDoc(this.collection(), clone);
        return id;
    }
    update(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.updatedAt = serverTimestamp();
            delete clone.createdAt;
        }
        delete clone.id;
        const docRef = doc(this.collection(), data.id);
        return updateDoc(docRef, clone);
    }
    set(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.createdAt = serverTimestamp();
            clone.updatedAt = null;
        }
        delete clone.id;
        const docRef = doc(this.collection(), data.id);
        return setDoc(docRef, clone, options);
    }
    delete(id) {
        return deleteDoc(doc(this.collection(), id));
    }
    async getById(id, options = { timestamps: true }) {
        const docSnap = await getDoc(doc(this.collection(), id));
        if (!docSnap.exists()) {
            throw new DocumentNotFoundError(id);
        }
        return ofFirestore(docSnap, options.timestamps);
    }
    getAsyncById(id, options = { timestamps: true }) {
        const docRef = doc(this.collection(), id);
        return docSnapshots(docRef).pipe(map(docSnap => (docSnap.exists() ? ofFirestore(docSnap, options.timestamps) : null)));
    }
    async getByIds(ids, options = { timestamps: true }) {
        const promises = ids.map(id => this.getById(id, options));
        return Promise.all(promises);
    }
    async getAll(options = { timestamps: true }) {
        const { docs } = await getDocs(this.collection());
        return docs.map(document => ofFirestore(document, options.timestamps));
    }
    collection() {
        return collection(this.firestore, this.collectionName);
    }
}
