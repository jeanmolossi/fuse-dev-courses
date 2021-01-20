export class MinLengthFieldError extends Error {
  constructor(
    private readonly fieldName: string,
    private readonly length: number,
  ) {
    super(`O campo ${fieldName} deve conter no mínimo ${length} caracteres`);

    this.name = 'InvalidFieldError';
  }
}
