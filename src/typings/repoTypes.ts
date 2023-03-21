import { FieldValue } from '@angular/fire/firestore';
import { Model } from '../firestore/Model.js';

/**
 * Definição de tipo para adicionar um novo documento a uma coleção do `Firestore`.
 *
 * @template T - O `Model` para o documento que está sendo adicionado.
 * @returns As chaves de `Model` excluindo os atributos `id`, `createdAt` e `updatedAt`
 */
export type AddDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]: T[P] | FieldValue;
};

/**
 * Definição de tipo para criar ou substituir um documento em uma coleção do `Firestore`.
 *
 * @template T - O `Model` para o documento que está sendo adicionado ou substituido.
 * @returns As chaves de `Model` excluindo os atributos `createdAt` e `updatedAt`
 */
export type SetDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]: T[P] | FieldValue;
} & Pick<T, 'id'>;

/**
 * Definição de tipo para atualizar um documento em uma coleção do `Firestore`.
 *
 * @template T - O `Model` para o documento que está sendo atualizado.
 * @returns As chaves de `Model` excluindo os atributos `createdAt` e `updatedAt`, com o `id` como obrigatório e o restante dos atributos como opcional
 */
export type UpdateDocument<T extends Model> = {
  [P in keyof Omit<T, 'id' | 'createdAt' | 'updatedAt'>]?: T[P] | FieldValue;
} & Pick<T, 'id'>;
