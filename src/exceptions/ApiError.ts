import { apiErrosTranslate } from '../resources/apiErrosTranslate.js';

export class ApiError {
  public readonly message: string;
  public readonly code: string;
  public readonly statusCode: number;

  private defaultMessageError = 'Não foi possível realizar esta ação. Verifique seu dados e tente novamente.';

  constructor(code: string, statusCode: number) {
    this.message = apiErrosTranslate[code] || this.defaultMessageError;
    this.code = code;
    this.statusCode = statusCode;
  }
}
