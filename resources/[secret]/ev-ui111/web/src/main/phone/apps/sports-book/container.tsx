import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import SportsBook from "./components/sports-book";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    getSportsBookData = async () => {
        const results = await nuiAction('ev-ui:casinoGetSportsBookData', {}, { returnData: devData.getSportsBookData().events });
        this.props.updateState({
            events: results.data
        });
    }

    componentDidMount() {
        this.getSportsBookData();
    }

    render() {
        return (
            <SportsBook {...this.props} getSportsBookData={this.getSportsBookData} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);