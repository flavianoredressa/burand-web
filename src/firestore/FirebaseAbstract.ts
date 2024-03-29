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
  orderBy as queryOrderBy,
  OrderByDirection,
  limit as queryLimit,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  SetOptions,
  updateDoc,
  where,
  WhereFilterOp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError.js';
import { AddDocument, IFirebaseWhere, SetDocument, UpdateDocument } from '../typings/repoTypes.js';
import { ofFirestore } from './ofFirestore.js';
import { toFirestore } from './toFirestore.js';
import { Model } from './Model.js';

type IWriteOptions = {
  /**
   * Adicionar atributos `createdAt` em criações e `updatedAt` em atualizações
   */
  timestamps: boolean;
};

type IReadOptions = {
  /**
   * Converter atributos `createdAt` e `updatedAt` no tipo `Date` do JavaScript
   */
  timestamps: boolean;
};

/**
 * A interface do serviço Cloud Firestore.
 *
 * Não chame esse construtor diretamente.
 * Em vez disso, crie um repositório e estenda o comportamento
 */
export abstract class FirebaseAbstract<T extends Model> {
  /**
   * @param {Firestore} firestore - Referência do Firestore
   * @param {string} collectionName - Nome da coleção no Firestore
   */
  public constructor(protected firestore: Firestore, protected collectionName: string) {}

  /**
   * Adicione um novo documento ao Firestore
   *
   * @param data - Um objeto contendo os dados do novo documento.
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvido com o id do documento criado.
   */
  public async add(data: AddDocument<T>, options: IWriteOptions = { timestamps: true }): Promise<string> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    delete clone.id;

    const { id } = await addDoc(this.collection(), clone);

    return id;
  }

  /**
   * Altere um documento existente no Firestore
   *
   * @param data - Um objeto contendo os dados a serem alterados.
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvida vazia.
   */
  public update(data: UpdateDocument<T>, options: IWriteOptions = { timestamps: true }): Promise<void> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.updatedAt = serverTimestamp();
      delete clone.createdAt;
    }

    delete clone.id;

    const docRef = doc(this.collection(), data.id);

    return updateDoc(docRef, clone);
  }

  /**
   * Grava no documento referenciado pelo `id` especificado. Se
   * o documento ainda não existe, ele será criado. Se você fornecer `merge`
   * ou `mergeFields`, os dados fornecidos podem ser mesclados em um documento existente.
   *
   * @param data - Um objeto contendo os dados a serem adicionados ou alterados.
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvida vazia.
   */
  public set(data: SetDocument<T>, options: SetOptions & IWriteOptions = { timestamps: true }): Promise<void> {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    delete clone.id;

    const docRef = doc(this.collection(), data.id);

    return setDoc(docRef, clone, options);
  }

  /**
   * Exclui o documento referenciado pelo `id` especificado.
   *
   * @param {string} id - Id do documento a ser excluído.
   * @returns Um `Promise` resolvida vazia.
   */
  public delete(id: string): Promise<void> {
    return deleteDoc(doc(this.collection(), id));
  }

  /**
   * Busca um documento pelo seu id.
   *
   * @param id - Id do documento a ser buscado.
   * @param options - Um objeto para configurar o comportamento definido.
   * @throws {DocumentNotFoundError}
   * @returns Um `Promise` resolvida com o conteúdo do documento.
   */
  public async getById(id: string, options: IReadOptions = { timestamps: true }): Promise<T> {
    const docSnap = await getDoc(doc(this.collection(), id));

    if (!docSnap.exists()) {
      throw new DocumentNotFoundError(id);
    }

    return ofFirestore(docSnap, options.timestamps);
  }

  /**
   * Busca um documento pelo seu id.
   *
   * @param id - Id do documento a ser buscado.
   * @param options - Um objeto para configurar o comportamento definido.
   * @throws {DocumentNotFoundError}
   * @returns Um `Observable` para eventos.
   */
  public getAsyncById(id: string, options: IReadOptions = { timestamps: true }): Observable<T | null> {
    const docRef = doc(this.collection(), id);

    return docSnapshots(docRef).pipe(
      map(docSnap => (docSnap.exists() ? ofFirestore(docSnap, options.timestamps) : null))
    );
  }

  /**
   * Busca documentos pelo seu id.
   *
   * @param ids - Ids dos documentos a serem buscados.
   * @param options - Um objeto para configurar o comportamento definido.
   * @throws {DocumentNotFoundError}
   * @returns Um `Promise` resolvida com o conteúdo do documentos.
   */
  public async getByIds(ids: string[], options: IReadOptions = { timestamps: true }): Promise<T[]> {
    const promises = ids.map(id => this.getById(id, options));
    return Promise.all(promises);
  }

  /**
   * Busca todos os documentos da coleção.
   *
   * @param options - Um objeto para configurar o comportamento definido.
   * @returns Um `Promise` resolvida com o conteúdo do documentos.
   */
  public async getAll(options: IReadOptions = { timestamps: true }): Promise<T[]> {
    const { docs } = await getDocs(this.collection());
    return docs.map(document => ofFirestore(document, options.timestamps));
  }

  /**
   * Recupera documentos da coleção com base no campo, operador e valor fornecidos, bem como em opções adicionais.
   *
   * @async
   * @param {keyof T} field - A chave do campo pelo qual os documentos devem ser filtrados.
   * @param {WhereFilterOp} operator - O operador a ser usado na filtragem (por exemplo, "==" ou ">").
   * @param {unknown} value - O valor a ser comparado na filtragem.
   * @param {number | null} [limit=null] - O número máximo de documentos a serem retornados.
   * @param {keyof T | null} [orderBy=null] - A chave do campo pelo qual os resultados devem ser ordenados.
   * @param {OrderByDirection | null} [orderByDirection=null] - A direção na qual os resultados devem ser ordenados.
   * @param {IReadOptions} [options={ timestamps: true }] - As opções adicionais para a leitura dos documentos.
   * @returns {Promise<T[]>} - Uma promessa que resolve em um array de documentos T.
   * @throws {DocumentNotFoundError} - Se nenhum documento for encontrado com os filtros fornecidos.
   */
  protected async getWhere(
    field: keyof T,
    operator: WhereFilterOp,
    value: unknown,
    limit: number | null = null,
    orderBy: keyof T | null = null,
    orderByDirection: OrderByDirection | null = null,
    options: IReadOptions = { timestamps: true }
  ): Promise<T[]> {
    const queryFilter: QueryConstraint[] = [where(field as string, operator, value)];

    if (limit) {
      queryFilter.push(queryLimit(limit));
    }

    if (orderBy) {
      queryFilter.push(queryOrderBy(orderBy as string, orderByDirection || 'asc'));
    }

    const q = query(this.collection(), ...queryFilter);

    const { docs, empty } = await getDocs(q);

    if (empty) {
      throw new DocumentNotFoundError(JSON.stringify({ field, operator, value }));
    }

    return docs.map(document => ofFirestore(document, options.timestamps));
  }

  /**
   * Recupera vários documentos da coleção com base nos filtros fornecidos e opções adicionais.
   *
   * @async
   * @param {IFirebaseWhere<T>[]} filters - Um array de objetos de filtro Firebase, cada um contendo um campo, um operador e um valor.
   * @param {number | null} [limit=null] - O número máximo de documentos a serem retornados.
   * @param {keyof T | null} [orderBy=null] - A chave do campo pelo qual os resultados devem ser ordenados.
   * @param {OrderByDirection | null} [orderByDirection=null] - A direção na qual os resultados devem ser ordenados.
   * @param {IReadOptions} [options={ timestamps: true }] - As opções adicionais para a leitura dos documentos.
   * @returns {Promise<T[]>} - Uma promessa que resolve em um array de documentos T.
   * @throws {DocumentNotFoundError} - Se nenhum documento for encontrado com os filtros fornecidos.
   */
  protected async getWhereMany(
    filters: IFirebaseWhere<T>[],
    limit: number | null = null,
    orderBy: keyof T | null = null,
    orderByDirection: OrderByDirection | null = null,
    options: IReadOptions = { timestamps: true }
  ): Promise<T[]> {
    const queryFilter: QueryConstraint[] = filters.map(({ field, operator, value }) => {
      return where(field as string, operator, value);
    });

    if (orderBy) {
      queryFilter.push(queryOrderBy(orderBy as string, orderByDirection || 'asc'));
    }

    if (limit) {
      queryFilter.push(queryLimit(limit));
    }

    const q = query(this.collection(), ...queryFilter);

    const { docs, empty } = await getDocs(q);

    if (empty) {
      throw new DocumentNotFoundError(JSON.stringify({ filters }));
    }

    return docs.map(document => ofFirestore(document, options.timestamps));
  }

  /**
   * Obtém uma instância `CollectionReference` que se refere à coleção no caminho absoluto especificado por `collectionName`.
   *
   * @returns A instância de `CollectionReference`.
   */
  protected collection(): CollectionReference<DocumentData> {
    return collection(this.firestore, this.collectionName);
  }
}
