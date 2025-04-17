import React, { FunctionComponent } from "react";
import { getConfigObject } from "./lib/config/config";

enum ConfigTypes {
    Application = 0,
    Passive = 1
}

function ConfigObject(): any {
    const configs = getConfigObject();
    const uiApps = Object.keys(getConfigObject());

    uiApps.forEach((config) => {
        if (typeof configs[config].default === "function") {
            const data = configs[config].default();
            uiApps.push(data);
        }
    });

    return (
        uiApps
    );
}

interface ConfigObject {
    name: string;
    render: FunctionComponent | React.Component;
    type: ConfigTypes;
}

export {
    ConfigTypes,
    ConfigObject
}