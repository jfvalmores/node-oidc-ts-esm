import { Error } from '@/types/errors.js';

const error = (ctx, error: Error) => {
  ctx.body = {
    error: error.message,
    description: error.description,
  };
  ctx.status = error.status;
};

export default error;
