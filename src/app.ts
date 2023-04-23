import Provider from 'oidc-provider';
import * as dotenv from 'dotenv';
import loadGrants from './custom-grants/index.js';
import configuration from './provider/index.js';
import loadIntercepts from './intercepts/index.js';
import loadMiddlewares from './middlewares/index.js';
dotenv.config();

const issuer = process.env.ISSUER || 'http://localhost:3000';

// Create application
const provider = new Provider(issuer, configuration);
loadGrants(provider);
loadIntercepts(provider);
loadMiddlewares(provider);

export default provider;
