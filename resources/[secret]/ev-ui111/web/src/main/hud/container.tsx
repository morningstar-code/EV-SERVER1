import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import Hud from "./components/hud";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            gameModeDev: state.game.modeDev,
            gameModeDebug: state.game.modeDebug,
            gameModeGod: state.game.modeGod,
            gameIsHardcore: state.game.isHardcore,
            gameRadioChannel: state.game.radioChannel,
            preferences: state.preferences,
            radio: state.radio
        }
    }
});

class Container extends React.Component<any, {show: boolean}> {
    constructor(props: any) {
        super(props);

        this.state = {
            show: false
        }
    }

    onEvent = (data: any) => {
        if (data.radarShow !== true) {
            this.props.updateState(data);
        } else {
            this.props.updateState({
                altitude: 0,
                altitudeShow: false,
                display: true,
                engineDamageShow: false,
                partsDamageShow: false,
                gasDamageShow: false,
                harnessDurability: 0,
                nos: 0,
                nosEnabled: false,
                nosShow: false,
                pursuit: 0,
                pursuitShow: false,
                radarShow: true,
                collarShow: false
            });
        }
    }

    render() {
        return (
            <AppWrapper
                store={store}
                name="hud"
                onEvent={this.onEvent}
                disableDebugEvent={() => true}
            >
                <Hud {...this.props} />
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);