import React from "react";
import Page from "./page";
import { nuiAction } from "lib/nui-comms";

class Properties extends React.Component<any> {
    timeout = null;

    state = {
        searchValue: ''
    }

    async componentDidMount() {
        const results = await nuiAction('ev-ui:getHousingData', {}, {});

        this.props.updateState({
            properties: results.data,
            property: {}
        });
    }

    render() {
        return (
            <Page {...this.props} searchValue={this.state.searchValue} />
        )
    }
}

export default Properties;