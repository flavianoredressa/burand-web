import type { DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
/**
 * Convert Firestore data into an object of type T
 */
export declare function ofFirestore<T>(document: DocumentSnapshot<DocumentData>, hasTimestamp?: boolean): T;
