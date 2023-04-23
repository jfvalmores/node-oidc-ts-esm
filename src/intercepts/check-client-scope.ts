const checkClientScope = (provider) => {
  // Intercept client schema scope validation
  const scopesCheck = Object.getOwnPropertyDescriptor(
    // @ts-ignore
    provider.Client.Schema.prototype,
    'scopes'
  ).value;
  // @ts-ignore
  Object.defineProperty(provider.Client.Schema.prototype, 'scopes', {
    value() {
      try {
        // Original scope check
        scopesCheck.call(this);
      } catch (err) {
        console.warn(
          `Warning: Scope must only contain Authorization Server supported scope values. \
          \nClient Scope: ${this.scope} \
          \nOriginal Error: ${err.error} — ${err.error_description}`
        );
      }
    },
  });
};

export default checkClientScope;
