import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/dev-data";
import Notepad from "./components/notepad";

class Container extends React.Component<any> {
    state = {
        mount: false,
        canSave: false,
        content: ''
    }

    onEvent = (data: any) => {
        this.setState({
            mount: true,
            canSave: data.canSave,
            content: data?.content ?? ''
        });
    }

    onShow = (data: any) => {
        this.setState({
            mount: true,
            canSave: data.canSave,
            content: data?.content ?? ''
        });
    }

    onHide = () => {
        nuiAction('ev-ui:cancelNotepadEmote', {});
        this.setState({ mount: false });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                name="notepad"
                onEvent={this.onEvent}
                onShow={this.onShow}
                onHide={this.onHide}
                onEscape={this.onHide}
            >
                {this.state.mount && (
                    <Notepad canSave={this.state.canSave} content={this.state.content} />
                )}
            </AppWrapper>
        )
    }
}

export default Container;