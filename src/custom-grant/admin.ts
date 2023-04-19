import { BadRequest } from '@/types/errors.js';

const GRANT_TYPE = 'urn:app:params:oauth:grant-type:admin';
const PARAMETERS = ['scope', 'account_id', 'app_id'];
const CLAIMS = ['app_id', 'account_id', 'first_name', 'last_name'];

const getGrantClaims = () => ({ claims: CLAIMS });

const getTokenClaims = () => ({
  userinfo: CLAIMS.reduce((acc, claim) => ({ ...acc, [claim]: null }), {}),
});

const handler = async (ctx, next) => {
  const { scope, account_id: accountId, app_id: appId } = ctx.oidc.params;
  const { client } = ctx.oidc;
  const { AccessToken, Grant } = ctx.oidc.provider;

  // Validate inputs
  if (!scope) {
    throw new BadRequest('Missing scope');
  }
  if (!accountId) {
    throw new BadRequest('Missing account_id');
  }
  if (!appId) {
    throw new BadRequest('Missing app_id');
  }

  const grant = new Grant({
    accountId,
    client,
    openid: getGrantClaims(),
  });
  const grantId = await grant.save();

  const at = new AccessToken({
    accountId,
    client,
    grantId,
    scope,
    gty: GRANT_TYPE,
    claims: getTokenClaims(),
  });
  at.extra = {
    auth_time: Math.round(Date.now() / 1000),
    app_id: appId,
    account_id: accountId,
  };

  const accessToken = await at.save();

  ctx.body = {
    access_token: accessToken,
    expiry: at.expiration,
    scope: at.scope,
    token_type: at.tokenType,
  };
  return next();
};

const adminGrant = (provider) => {
  provider.registerGrantType(GRANT_TYPE, handler, PARAMETERS);
};

export default adminGrant;
