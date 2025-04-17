import Container from './container';

import { ConfigObject, ConfigTypes } from 'base-app-config';

const config = (): ConfigObject => {
    return {
        name: "poker",
        render: Container,
        type: ConfigTypes.Application,
    }
}

export default config;