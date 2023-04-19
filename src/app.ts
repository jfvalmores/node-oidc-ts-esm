import Provider, { Configuration } from 'oidc-provider';
import * as dotenv from 'dotenv';
import loadGrants from './custom-grant/index.js';
import { Error } from './types/errors.js';
dotenv.config();

const issuer = process.env.ISSUER || 'http://localhost:3000';
const config: Configuration = {
  clientDefaults: {
    grant_types: ['implicit', 'authorization_code', 'refresh_token'],
  },
  cookies: {
    keys: ['mykey-1', 'mykey-2', 'mykey-3'],
  },
  features: {
    clientCredentials: { enabled: true },
    devInteractions: { enabled: false },
    introspection: { enabled: true },
    jwtIntrospection: { enabled: true },
    jwtUserinfo: { enabled: true },
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
  scopes: ['openid', 'offline_access', 'app:admin'],
  clients: [
    {
      client_id: 'test-client-id',
      client_secret: 'test-client-secret',
      grant_types: [
        'implicit',
        'client_credentials',
        'urn:app:params:oauth:grant-type:admin',
      ],
      response_types: ['id_token token'],
      scope: 'openid app:admin',
      redirect_uris: ['https://my-site.com/callback'],
    },
  ],
  ttl: {
    ClientCredentials: 3600,
  },
  claims: {
    openid: ['account_id', 'app_id', 'first_name', 'last_name'],
  },
  extraTokenClaims(_ctx, token) {
    return token.extra;
  },
  findAccount(_ctx, sub, token) {
    // Find account using sub here
    const account = {
      account_id: sub,
      first_name: 'John',
      last_name: 'Doe',
    };
    return {
      accountId: sub,
      async claims(use, _scope, _claims, _rejected) {
        if (use === 'userinfo') {
          // @ts-ignore
          return { sub, app_id: token.extra.app_id, ...account };
        }
        return { sub };
      },
    };
  },
};

// Create application
const app = new Provider(issuer, config);
loadGrants(app);
app.on('server_error', (ctx, error: Error) => {
  ctx.body = {
    error: error.message,
    description: error.description,
  };
  ctx.status = error.status;
});

export default app;
