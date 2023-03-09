export class AppError {
    message;
    title;
    constructor(title, message) {
        this.title = title;
        this.message = message;
    }
}
