import Container from './container';

import { ConfigObject, ConfigTypes } from 'base-app-config';

const config = (): ConfigObject => {
    return {
        name: "atm",
        render: Container as any,
        type: ConfigTypes.Application,
    }
}

export default config;