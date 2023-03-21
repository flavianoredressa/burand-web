/**
 * Erro lançado quando um documento específico não é encontrado.
 */
export declare class DocumentNotFoundError extends Error {
    /**
     * Cria uma instância de um erro `DocumentNotFoundError` com uma mensagem formatada para o Id do documento não encontrado.
  
     * @param {string} id - O Id do documento não encontrado.
     */
    constructor(id: string);
}
