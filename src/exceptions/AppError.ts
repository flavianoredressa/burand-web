export class AppError {
  public readonly message: string;
  public readonly title: string;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }
}
