import React from "react";
import Page from "./page";

export let mdtCharges: any = [];

class Staff extends React.Component<any> {
    timeout = 0;

    state = {
        searchValue: ''
    }

    render() {
        return (
            <Page {...this.props} searchValue={this.state.searchValue} />
        )
    }
}

export default Staff;