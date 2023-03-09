export class DocumentNotFoundError extends Error {
    constructor(id) {
        super(`Document '${id}' was not found.`);
        this.name = 'DocumentNotFoundError';
    }
}
