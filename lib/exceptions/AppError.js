/**
 * Representa um erro da aplicação com título e mensagem.
 */
export class AppError {
    /**
     * O título do erro.
     * @type {string}
     */
    message;
    /**
     * A mensagem do erro.
     * @type {string}
     */
    title;
    /**
     * Cria uma instância de um erro da aplicação com título e mensagem.
     *
     * @param {string} title - O título do erro.
     * @param {string} message - A mensagem do erro.
     */
    constructor(title, message) {
        this.title = title;
        this.message = message;
    }
}
