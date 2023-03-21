import { getApiError } from '../resources/apiErrosTranslate.js';
/**
 * Representa um erro de API com código, mensagem e status HTTP.
 */
export class ApiError {
    /**
     * A mensagem de erro.
     * @type {string}
     */
    message;
    /**
     * O código de erro.
     * @type {string}
     */
    code;
    /**
     * O status HTTP associado ao erro.
     * @type {number}
     */
    statusCode;
    /**
     * Cria uma instância de um erro de API com código, mensagem e status HTTP.
     *
     * @param {string} code - O código de erro.
     * @param {number} statusCode - O status HTTP associado ao erro.
     */
    constructor(code, statusCode) {
        this.message = getApiError(code);
        this.code = code;
        this.statusCode = statusCode;
    }
}
