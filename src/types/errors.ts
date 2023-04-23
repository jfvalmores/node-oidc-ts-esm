export class BaseError extends Error {
  description: string;
  status: number;

  constructor(error, message, code) {
    super(error);
    this.description = message;
    this.status = code;
  }
}

export class BadRequest extends BaseError {
  constructor(message) {
    super('Bad Request', message, 400);
  }
}

export class Unauthorized extends BaseError {
  constructor(message) {
    super('Unauthorized', message, 401);
  }
}

export type Error = {
  message: string;
  description: string;
  status: number;
};
