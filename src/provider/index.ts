import { Configuration } from 'oidc-provider';
import resourceIndicators from './resource-indicators.js';
import clients from './clients.js';
import extraTokenClaims from './extra-token-claims.js';
import findAccount from './find-account.js';
import scopes from './scopes.js';

const configuration: Configuration = {
  // @ts-ignore
  clients,
  extraTokenClaims,
  findAccount,
  scopes,
  clientDefaults: {
    grant_types: ['implicit', 'authorization_code', 'refresh_token'],
  },
  cookies: {
    keys: ['mykey-1', 'mykey-2', 'mykey-3'],
  },
  features: {
    // @ts-ignore
    resourceIndicators,
    clientCredentials: { enabled: true },
    devInteractions: { enabled: false },
    introspection: { enabled: true },
    userinfo: { enabled: true },
  },
  responseTypes: [
    'code',
    'id_token',
    'id_token token',
    'code id_token',
    'code token',
    'code id_token token',
    'none',
  ],
  routes: {
    introspection: '/introspect',
    token: '/token',
    userinfo: '/userinfo',
  },

  ttl: {
    ClientCredentials: 3600,
  },
  claims: {
    openid: ['account_id', 'app_id', 'first_name', 'last_name'],
  },
};

export default configuration;
