import { PhoneConfigObject } from "lib/config/phone/appConfig";
import Container from "./container";
import { hasNormalDongle, hasPdDongle } from "./actions";
import events from "./events";

const config = (): PhoneConfigObject => {
    return {
        forceOrientation: 'portrait',
        events: function (cb, data) {
            return events(cb);
        },
        iconPng: () => hasPdDongle() ? "'https://i.imgur.com/TmAcg97.png'" : "'https://dvexdev.github.io/DveX.Images/racing.png'",
        label: () => hasPdDongle() ? 'Time Trials' : 'Racing',
        name: 'racing',
        position: 75,
        render: Container,
        hidden: () => !hasPdDongle() && !hasNormalDongle(),
    }
}

export default config;