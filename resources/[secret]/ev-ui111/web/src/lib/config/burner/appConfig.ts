const components = {};
const defaultBurnerAppConfig = {
    background: '#222831',
    events: null,
    forceOrientation: false,
    hidden: function () {
        return false
    },
    init: null,
    position: 1000,
    stateConfig: null,
};
const burnerAppConfigs = [];
const burnerAppInitialState = {};
const burnerKeys = [];

const requireComponent = require.context(
    '../../../main/burner/apps', // components folder
    true, // look subfolders
    /config\.tsx$/, //regex for files
)

export function getConfigObject() {
    requireComponent.keys().forEach(filePath => {
        const component = requireComponent(filePath);
        components[filePath] = component;
    });

    return components;
}

export interface BurnerConfigObject {
    events?: (...args: any) => void;
    hidden?: () => boolean;
    icon?: {
        background: string;
        color: string;
        name: string;
    };
    iconPng?: string;
    label: string;
    name: string;
    position?: number;
    render: any;
    forceOrientation?: string;
    background?: string;
    init?: (...args: any) => void;
    stateConfig?: any;
}

export const GetBurnerAppState = () => {
    return burnerAppInitialState;
}

export const GetBurnerAppConfig = () => {
    if (burnerAppConfigs.length > 0) {
        return burnerAppConfigs;
    }

    function InitConfig(config) {
        const configs = Object.keys(config);

        configs.forEach((key) => {
            const data = config[key].default;

            if (!data) {
                return;
            }

            if (burnerKeys.includes(key)) {
                return;
            }

            burnerKeys.push(key);

            let defaultConfig = { defaultConfigObject: defaultBurnerAppConfig }
            burnerAppConfigs.push(data(defaultConfig));
        });
    }

    function _0x371e7d(_0x23e7d7) {
        _0x23e7d7.keys().forEach(function (_0x1b94e3) {
            var _0x4432f9 = _0x23e7d7(_0x1b94e3).default
            burnerAppInitialState[_0x4432f9.key] = _0x4432f9.initialState
        })
    }

    const configObject = getConfigObject();

    InitConfig(configObject);

    burnerAppConfigs.sort((a, b) => {
        return a.position < b.position ? -1 : a.position > b.position ? 1 : 0;
    });

    return burnerAppConfigs;
}

export const InitEvents = () => {
    const configEvents = [];
    function callback(action, data) {
        if (configEvents[action]) {
            configEvents[action].push(data);
        } else {
            configEvents[action] = [data];
        }
    }

    const BurnerAppConfigs = GetBurnerAppConfig();

    BurnerAppConfigs.forEach((app) => {
        const events = app.events;
        const config = { config: BurnerAppConfigs };

        if (typeof events === 'function') {
            events && events(callback, config);
        }
    })

    return configEvents;
}