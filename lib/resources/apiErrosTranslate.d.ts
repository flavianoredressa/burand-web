/**
 * Dicionário de códigos de erro da API com as respectivas mensagens de erro.
 */
export declare const apiErrosTranslate: Record<string, string>;
/**
 * Retorna a mensagem de erro correspondente a um determinado código de erro.
 *
 * @param errorCode O código de erro.
 * @param defaultMessage A mensagem de erro padrão a ser usada se não houver nenhuma mensagem correspondente ao código de erro fornecido.
 * @returns A mensagem de erro correspondente ao código de erro fornecido, ou a mensagem de erro padrão se não houver nenhuma mensagem correspondente.
 */
export declare function getApiError(errorCode: string, defaultMessage?: string): string;
