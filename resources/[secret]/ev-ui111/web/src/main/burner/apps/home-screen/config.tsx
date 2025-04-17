import Container from "./container";
import { BurnerConfigObject } from "lib/config/burner/appConfig";
import { baseStyles } from "lib/styles";

const config = (): BurnerConfigObject => {
    return {
        background: 'rgba(0, 0, 0, 0)',
        events: () => { },
        hidden: () => true,
        icon: { background: '#009688', color: 'white', name: 'home' },
        label: '',
        name: 'home-screen',
        render: Container,
    }
}

export default config;