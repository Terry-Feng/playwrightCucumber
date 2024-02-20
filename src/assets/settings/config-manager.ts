import webConfigValues, { WebConfig } from './web.config';
import { COUNTRY_TYPES, ENV_TYPES } from '../environment';

interface Configs {
  country: COUNTRY_TYPES;
  env: ENV_TYPES;
  web: WebConfig;
}

export class ConfigManager {
  get configs(): Configs {
    const country = (process.env.country || 'AU').trim();
    const env = process.env.dynamicEnvironment
      ? 'QA'
      : (process.env.environment || 'PREPROD').trim();

    return {
      country: country.toUpperCase() as COUNTRY_TYPES,
      env: env.toUpperCase() as ENV_TYPES,
      web: this.resolveConfig<WebConfig>(country, env, webConfigValues),
    };
  }

  private resolveConfig<T>(country: string, env: string, configs: any): T {
    const envKey = env.toLowerCase();
    const { nz, au, ...shared } = configs[envKey] || {};

    return {
      ...shared,
      ...(country.toUpperCase() === COUNTRY_TYPES.NZ ? nz : au),
    };
  }
}

export default new ConfigManager();
