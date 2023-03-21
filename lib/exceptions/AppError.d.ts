/**
 * Representa um erro da aplicação com título e mensagem.
 */
export declare class AppError {
    /**
     * O título do erro.
     * @type {string}
     */
    readonly message: string;
    /**
     * A mensagem do erro.
     * @type {string}
     */
    readonly title: string;
    /**
     * Cria uma instância de um erro da aplicação com título e mensagem.
     *
     * @param {string} title - O título do erro.
     * @param {string} message - A mensagem do erro.
     */
    constructor(title: string, message: string);
}
