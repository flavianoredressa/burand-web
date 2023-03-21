import { DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
/**
 * Converte um `DocumentSnapshot` do Firestore em um objeto do tipo `T`, adicionando o Id do documento ao objeto.
 *
 * @template T - O tipo de objeto a ser retornado
 * @param {DocumentSnapshot<DocumentData>} document - O `DocumentSnapshot` do Firestore a ser convertido em objeto
 * @param {boolean} [hasTimestamp=false] - Indica se o objeto deve ter seus campos de data/hora convertidos em tipos nativos (`Date`)
 * @returns {T} - O objeto convertido do tipo `T`
 */
export declare function ofFirestore<T>(document: DocumentSnapshot<DocumentData>, hasTimestamp?: boolean): T;
