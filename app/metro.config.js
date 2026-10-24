const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// supabase-js importa dependências opcionais (@opentelemetry/api, ws) que não
// existem em ambiente React Native/web. Devolvemos um stub vazio para elas.
const OPTIONAL_EMPTY = ['@opentelemetry/api', 'ws'];
const path = require('path');
const emptyModule = path.resolve(__dirname, 'src/lib/empty-module.js');

const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (OPTIONAL_EMPTY.includes(moduleName)) {
    return { type: 'sourceFile', filePath: emptyModule };
  }
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
