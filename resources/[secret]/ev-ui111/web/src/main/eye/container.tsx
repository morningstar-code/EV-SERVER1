import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import Eye from "./components/eye";
import { nuiAction } from "lib/nui-comms";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";

const { mapStateToProps, mapDispatchToProps } = compose(store);

interface AppState {
    show: boolean;
    active: boolean;
    interactive: boolean;
    options: any;
    visible: any[];
    context: any;
    entity: number;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            show: false,
            active: false,
            interactive: false,
            options: {},
            visible: [],
            context: {},
            entity: 0
        };
    }

    onEvent = (data: any) => {
        const action = data.action;
        const payload = data.payload;

        if (!this.state.interactive) {
            switch (action) {
                case 'refresh':
                    this.setState({ options: payload || {} });
                    break;
                case 'update':
                    this.updateOptions(
                        payload.options,
                        payload.active
                    );
                    break;
                case 'peek':
                    this.setState({
                        active: payload.active,
                        show: payload.display,
                        visible: []
                    });
                    break;
            }
        }
    }

    onHide = () => {
        this.setState({
            show: false,
            active: false,
            interactive: false,
            context: {},
            entity: 0
        });
    }

    onShow = (data: any) => {
        this.setState({
            show: data.payload.display,
            active: data.payload.active,
            interactive: true,
            entity: data.payload.entity,
            context: data.payload.context || {},
        });
    }

    selectOption = (option: any) => {
        nuiAction('ev-ui:targetSelectOption', {
            option: option,
            context: this.state.context,
            entity: this.state.entity
        });
    }

    updateOptions = (options: any, active: boolean) => {
        const visibleArray = [];
        const optionEntries = Object.entries(options);

        for (let i = 0; i < optionEntries.length; i++) {
            const option: any = optionEntries[i];
            const id = option[0];
            const enabled = option[1];
            enabled && this.state.options[id] && visibleArray.push(this.state.options[id]);
        }

        this.setState({
            visible: visibleArray,
            active: active
        });
    }

    render() {
        return (
            <AppWrapper
                center
                name="eye"
                onEscape={this.onHide}
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <Eye {...this.state} selectOption={this.selectOption} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);