/**
 * Provider of default DigitalState environment/deployment variables.
 */
export class DsEnvironmentConfig {
    isDev: boolean = false;
    msUrlScheme: string = 'http';
    discovery: any = {};
}

/**
 * Builds a DsEnvironmentConfig instance merging its defaults values with
 * values from the expanded DS_ENV variable.
 * @returns {DsEnvironmentConfig&U}
 */
export let dsEnvironmentFactory = () => {
    let config = new DsEnvironmentConfig();
    return Object.assign(config, DS_ENV);
}