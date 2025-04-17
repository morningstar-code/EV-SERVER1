const components = {};
const defaultPhoneAppConfig = {
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
const phoneAppConfigs = [];
const phoneAppInitialState = {};
const phoneKeys = [];

const requireComponent = require.context(
    '../../../main/phone/apps', // components folder
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

export interface PhoneConfigObject {
    events?: (...args: any) => void;
    hidden?: () => boolean;
    icon?: {
        background: string | ((...args: any) => string);
        color: string;
        name: string;
    };
    iconPng?: string | ((...args: any) => string);
    label: string | ((...args: any) => string);
    name: string;
    position?: number;
    render: any;
    forceOrientation?: string;
    background?: string;
    init?: (...args: any) => void;
    stateConfig?: any;
    iconNotification?: {
        background: string;
        color: string;
        name: string;
    }
}

export const GetPhoneAppState = () => {
    return phoneAppInitialState;
}

export const GetPhoneAppConfig = () => {
    if (phoneAppConfigs.length > 0) {
        return phoneAppConfigs;
    }

    function InitConfig(config) {
        const configs = Object.keys(config);

        configs.forEach((key) => {
            const data = config[key].default;

            if (!data) {
                return;
            }

            if (phoneKeys.includes(key)) {
                return;
            }

            phoneKeys.push(key);

            let defaultConfig = { defaultConfigObject: defaultPhoneAppConfig }
            phoneAppConfigs.push(data(defaultConfig));
        });
    }

    function _0x371e7d(_0x23e7d7) {
        _0x23e7d7.keys().forEach(function (_0x1b94e3) {
            var _0x4432f9 = _0x23e7d7(_0x1b94e3).default
            phoneAppInitialState[_0x4432f9.key] = _0x4432f9.initialState
        })
    }

    const configObject = getConfigObject();

    InitConfig(configObject);

    phoneAppConfigs.sort((a, b) => {
        return a.position < b.position ? -1 : a.position > b.position ? 1 : 0;
    });

    return phoneAppConfigs;
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

    const PhoneAppConfigs = GetPhoneAppConfig();

    PhoneAppConfigs.forEach((app) => {
        const events = app.events;
        const config = { config: PhoneAppConfigs };

        if (typeof events === 'function') {
            events && events(callback, config);
        }
    })

    return configEvents;
}