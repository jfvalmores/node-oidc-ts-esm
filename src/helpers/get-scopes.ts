export default function getScopes() {
  const scopeSet = new Set([
    'openid',
    'offline_access',
    'justine:new:scope',
    'justine:addtional:scope',
  ]);
  // Simulate get all scopes request
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(scopeSet), 100);
  });
}
