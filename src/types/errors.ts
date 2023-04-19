export class BadRequest extends Error {
  description: string;
  status: number;

  constructor(message) {
    super('Bad Request');
    this.description = message;
    this.status = 400;
  }
}

export type Error = {
  message: string;
  description: string;
  status: number;
};
