import React from "react";
import { nuiAction } from "lib/nui-comms";
import { devData } from "../../dev-data";
import store from "./store";
import { connect } from "react-redux";
import Ads from "./components/yellow-pages/ads";
import { compose } from "lib/redux";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    getEntries = async () => {
        const results = await nuiAction('ev-ui:getYellowPages', {}, { returnData: devData.getYellowPages() });
        this.props.updateState({
            list: results.data
        });
    }

    componentDidMount() {
        this.getEntries();
    }
    
    render() {
        return (
            <Ads {...this.props} getEntries={this.getEntries} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);