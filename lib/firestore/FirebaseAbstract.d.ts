import { CollectionReference, DocumentData, Firestore, SetOptions } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AddDocument, SetDocument, UpdateDocument } from '../typings/repoTypes.js';
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
export declare abstract class FirebaseAbstract<T extends Model> {
    protected firestore: Firestore;
    protected collectionName: string;
    /**
     * @param {Firestore} firestore - Referência do Firestore
     * @param {string} collectionName - Nome da coleção no Firestore
     */
    constructor(firestore: Firestore, collectionName: string);
    /**
     * Adicione um novo documento ao Firestore
     *
     * @param data - Um objeto contendo os dados do novo documento.
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvido com o id do documento criado.
     */
    add(data: AddDocument<T>, options?: IWriteOptions): Promise<string>;
    /**
     * Altere um documento existente no Firestore
     *
     * @param data - Um objeto contendo os dados a serem alterados.
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvida vazia.
     */
    update(data: UpdateDocument<T>, options?: IWriteOptions): Promise<void>;
    /**
     * Grava no documento referenciado pelo `id` especificado. Se
     * o documento ainda não existe, ele será criado. Se você fornecer `merge`
     * ou `mergeFields`, os dados fornecidos podem ser mesclados em um documento existente.
     *
     * @param data - Um objeto contendo os dados a serem adicionados ou alterados.
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvida vazia.
     */
    set(data: SetDocument<T>, options?: SetOptions & IWriteOptions): Promise<void>;
    /**
     * Exclui o documento referenciado pelo `id` especificado.
     *
     * @param {string} id - Id do documento a ser excluído.
     * @returns Um `Promise` resolvida vazia.
     */
    delete(id: string): Promise<void>;
    /**
     * Busca um documento pelo seu id.
     *
     * @param id - Id do documento a ser buscado.
     * @param options - Um objeto para configurar o comportamento definido.
     * @throws {DocumentNotFoundError}
     * @returns Um `Promise` resolvida com o conteúdo do documento.
     */
    getById(id: string, options?: IReadOptions): Promise<T>;
    /**
     * Busca um documento pelo seu id.
     *
     * @param id - Id do documento a ser buscado.
     * @param options - Um objeto para configurar o comportamento definido.
     * @throws {DocumentNotFoundError}
     * @returns Um `Observable` para eventos.
     */
    getAsyncById(id: string, options?: IReadOptions): Observable<T | null>;
    /**
     * Busca documentos pelo seu id.
     *
     * @param ids - Ids dos documentos a serem buscados.
     * @param options - Um objeto para configurar o comportamento definido.
     * @throws {DocumentNotFoundError}
     * @returns Um `Promise` resolvida com o conteúdo do documentos.
     */
    getByIds(ids: string[], options?: IReadOptions): Promise<T[]>;
    /**
     * Busca todos os documentos da coleção.
     *
     * @param options - Um objeto para configurar o comportamento definido.
     * @returns Um `Promise` resolvida com o conteúdo do documentos.
     */
    getAll(options?: IReadOptions): Promise<T[]>;
    /**
     * Obtém uma instância `CollectionReference` que se refere à coleção no caminho absoluto especificado por `collectionName`.
     *
     * @returns A instância de `CollectionReference`.
     */
    protected collection(): CollectionReference<DocumentData>;
}
export {};
