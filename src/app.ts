import Provider from 'oidc-provider';
import test from '@/sample.js';
import dir from '@/dir/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const issuer = process.env.ISSUER || 'http://localhost:3000';

// Testing
test();
dir.get();
// Create application
const app = new Provider(issuer, {
  clientDefaults: {
    grant_types: ['implicit', 'authorization_code', 'refresh_token'],
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
});

export default app;
