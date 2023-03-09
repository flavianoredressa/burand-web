import { apiErrosTranslate } from '../resources/apiErrosTranslate.js';
export class ApiError {
    message;
    code;
    statusCode;
    defaultMessageError = 'Não foi possível realizar esta ação. Verifique seu dados e tente novamente.';
    constructor(code, statusCode) {
        this.message = apiErrosTranslate[code] || this.defaultMessageError;
        this.code = code;
        this.statusCode = statusCode;
    }
}
