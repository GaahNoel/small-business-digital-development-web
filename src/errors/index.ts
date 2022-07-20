export class InvalidFieldError extends Error {
  field: 'email' | 'password';
  constructor(field: 'email' | 'password') {
    super(`O campo ${field} é inválido`);
    this.field = field;
  }
}

export class EmailVerification extends Error {
  constructor() {
    super(`Seu email não foi verificado`);
  }
}
