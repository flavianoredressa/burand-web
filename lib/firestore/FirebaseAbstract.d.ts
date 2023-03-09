import { CollectionReference, DocumentData, Firestore, SetOptions } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AddDocument, SetDocument, UpdateDocument } from '../typings/repoTypes.js';
import { Model } from './Model.js';
type IOptions = {
    timestamps: boolean;
};
export declare abstract class FirebaseAbstract<T extends Model> {
    protected firestore: Firestore;
    protected collectionName: string;
    constructor(firestore: Firestore, collectionName: string);
    add(data: AddDocument<T>, options?: IOptions): Promise<string>;
    update(data: UpdateDocument<T>, options?: IOptions): Promise<void>;
    set(data: SetDocument<T>, options?: SetOptions & IOptions): Promise<void>;
    delete(id: string): Promise<void>;
    getById(id: string, options?: IOptions): Promise<T>;
    getAsyncById(id: string, options?: IOptions): Observable<T | null>;
    getByIds(ids: string[], options?: IOptions): Promise<T[]>;
    getAll(options?: IOptions): Promise<T[]>;
    protected collection(): CollectionReference<DocumentData>;
}
export {};
