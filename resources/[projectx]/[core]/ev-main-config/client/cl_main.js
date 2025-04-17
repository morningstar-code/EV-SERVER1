let isConfigReady = false;

const resourceName = GetCurrentResourceName();
let configData = [];

const IsConfigReady = () => {
  return isConfigReady;
};
global.exports('IsConfigReady', IsConfigReady);

const GetModuleConfig = (moduleName) => {
  let config = configData.find((x) => x.configId == moduleName);
  if (config == undefined || config.data === undefined) {
    console.log(`[CONFIG] Module ${moduleName} not found | ${GetInvokingResource()}}`);
    return false;
  }
  return config.data || false;
};
global.exports('GetModuleConfig', GetModuleConfig);

const GetMiscConfig = (miscConfigName) => {
  let miscConfig = configData.find((x) => x.data[miscConfigName] != undefined);
  if (miscConfig === undefined || miscConfig.data === undefined) {
    console.log(`[CONFIG] Misc config ${miscConfigName} not found.`);
    return false;
  }
  return miscConfig.data[miscConfigName] || false;
};
global.exports('GetMiscConfig', GetMiscConfig);

const GetServerCode = () => {
  return 'wl';
};
global.exports('GetServerCode', GetServerCode);

const LoadConfig = async () => {
  console.log('[CONFIG] Initializing config...');
  let serverConfig = await RPC.execute('ev-main-config:getClientConfig');
  serverConfig.forEach((x) => {
    emit(`${resourceName}:configLoaded`, x.configId, x.data);
  });
  configData = serverConfig;
  isConfigReady = true;
  console.log('[CONFIG] Config initialized.');
};
LoadConfig();
