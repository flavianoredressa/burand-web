import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  docSnapshots,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  SetOptions,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError.js';
import { AddDocument, SetDocument, UpdateDocument } from '../typings/repoTypes.js';
import { ofFirestore } from './ofFirestore.js';
import { toFirestore } from './toFirestore.js';
import { Model } from './Model.js';

type IOptions = {
  timestamps: boolean;
};

export abstract class FirebaseAbstract<T extends Model> {
  public constructor(protected firestore: Firestore, protected collectionName: string) {}

  public async add(data: AddDocument<T>, options: IOptions = { timestamps: true }): Promise<string> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    delete clone.id;

    const { id } = await addDoc(this.collection(), clone);

    return id;
  }

  public update(data: UpdateDocument<T>, options: IOptions = { timestamps: true }): Promise<void> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.updatedAt = serverTimestamp();
      delete clone.createdAt;
    }

    delete clone.id;

    const docRef = doc(this.collection(), data.id);

    return updateDoc(docRef, clone);
  }

  public set(data: SetDocument<T>, options: SetOptions & IOptions = { timestamps: true }): Promise<void> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    delete clone.id;

    const docRef = doc(this.collection(), data.id);

    return setDoc(docRef, clone, options);
  }

  public delete(id: string): Promise<void> {
    return deleteDoc(doc(this.collection(), id));
  }

  public async getById(id: string, options: IOptions = { timestamps: true }): Promise<T> {
    const docSnap = await getDoc(doc(this.collection(), id));

    if (!docSnap.exists()) {
      throw new DocumentNotFoundError(id);
    }

    return ofFirestore(docSnap, options.timestamps);
  }

  public getAsyncById(id: string, options: IOptions = { timestamps: true }): Observable<T | null> {
    const docRef = doc(this.collection(), id);

    return docSnapshots(docRef).pipe(
      map(docSnap => (docSnap.exists() ? ofFirestore(docSnap, options.timestamps) : null))
    );
  }

  public async getByIds(ids: string[], options: IOptions = { timestamps: true }): Promise<T[]> {
    const promises = ids.map(id => this.getById(id, options));
    return Promise.all(promises);
  }

  public async getAll(options: IOptions = { timestamps: true }): Promise<T[]> {
    const { docs } = await getDocs(this.collection());
    return docs.map(document => ofFirestore(document, options.timestamps));
  }

  protected collection(): CollectionReference<DocumentData> {
    return collection(this.firestore, this.collectionName);
  }
}
