import checkClientScope from './check-client-scope.js';

export default function loadIntercepts(provider) {
  checkClientScope(provider);
}
