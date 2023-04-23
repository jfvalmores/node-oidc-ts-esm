export default function findAccount(_ctx, sub, token) {
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
}
