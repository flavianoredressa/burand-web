export declare class ApiError {
    readonly message: string;
    readonly code: string;
    readonly statusCode: number;
    private defaultMessageError;
    constructor(code: string, statusCode: number);
}
