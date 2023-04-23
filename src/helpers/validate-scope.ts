import { Unauthorized } from '@/types/errors.js';
import checkResource from 'oidc-provider/lib/shared/check_resource.js';
import getScopes from './get-scopes.js';

type ResourceServer = {
  scope: string;
  [key: string]: unknown;
};

const validateScope = async (ctx) => {
  const { client } = ctx.oidc;

  // Load resource servers
  await checkResource(ctx, () => {});

  // Get scope from request params
  const paramsScope = ctx.oidc.params.scope
    ? [...new Set(ctx.oidc.params.scope.split(' '))]
    : [];

  // Get scopes from database or other sources
  const allScopes = await getScopes();
  if (client.scope) {
    const allowList = new Set(client.scope.split(' '));

    for (const scope of paramsScope.filter(Set.prototype.has.bind(allScopes))) {
      // Check if requested scope exists from the database source
      if (!allowList.has(scope)) {
        // If requested scope exists in the database source but does not exist from the client scope, throw error
        throw new Unauthorized(`Requested scope is not allowed — ${scope}`);
      }
    }
  }

  let resultScope;
  Object.values(ctx.oidc.resourceServers).forEach(
    (resourceServer: ResourceServer, i) => {
      if (i !== 0) {
        throw new Unauthorized(
          'Only a single resource indicator value is supported for this grant type'
        );
      }
      // Add additional scopes from the resource server
      resultScope =
        paramsScope
          .filter(
            Set.prototype.has.bind(new Set(resourceServer.scope.split(' ')))
          )
          .join(' ') || undefined;
    }
  );

  return resultScope;
};

export default validateScope;
