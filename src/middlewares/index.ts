import error from './error.js';

export default function loadMiddlewares(provider) {
  // Listerners
  provider.on('server_error', error);
}
