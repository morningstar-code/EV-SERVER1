import Container from './container';

import { ConfigObject, ConfigTypes } from 'base-app-config';

const config = (): ConfigObject => {
    return {
        name: "ballot",
        render: Container,
        type: ConfigTypes.Application,
    }
}

export default config;