export class RequiredFieldError extends Error {
  constructor(private readonly fieldName: string) {
    super(`O campo ${fieldName} é obrigatório`);

    this.name = 'RequiredFieldError';
  }
}
