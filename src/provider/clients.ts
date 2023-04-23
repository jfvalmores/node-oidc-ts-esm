export default [
  {
    client_id: 'test-client-id',
    client_secret: 'test-client-secret',
    grant_types: [
      'implicit',
      'client_credentials',
      'urn:app:params:oauth:grant-type:admin',
    ],
    response_types: ['id_token token'],
    scope: 'openid justine:new:scope justine:new:scope2',
    redirect_uris: ['https://my-site.com/callback'],
  },
];
