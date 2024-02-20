import { COUNTRY_TYPES, ENV_TYPES } from './environment.enum';
import { ConfigManager } from '../settings/index';

class Environment {
  get isNZ() {
    return this.configs.country === COUNTRY_TYPES.NZ;
  }

  get isAU() {
    return this.configs.country === COUNTRY_TYPES.AU;
  }

  get isPreProd() {
    return this.isEnv(ENV_TYPES.PREPROD);
  }

  get isProd() {
    return this.isEnv(ENV_TYPES.PROD);
  }

  get isQA() {
    return this.configs.env.includes('QA');
  }

  isEnv(type: ENV_TYPES) {
    return this.configs.env === type;
  }

  private get configs() {
    return ConfigManager.configs;
  }
}

export default new Environment();
