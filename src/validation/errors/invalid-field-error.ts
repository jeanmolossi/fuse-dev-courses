export class InvalidFieldError extends Error {
  constructor(private readonly fieldName: string) {
    super(`O campo ${fieldName} é inválido`);

    this.name = 'InvalidFieldError';
  }
}
