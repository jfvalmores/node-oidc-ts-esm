export default {
  enabled: true,
  defaultResource(_ctx, _client, _oneOf) {
    return process.env.DEFAULT_RESOURCE_INDICATOR;
  },
  getResourceServerInfo(_ctx, resourceIndicator, client) {
    if (resourceIndicator === process.env.DEFAULT_RESOURCE_INDICATOR) {
      return { scope: client.scope };
    }
    return {};
  },
};
