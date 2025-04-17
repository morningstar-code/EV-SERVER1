import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import DOJ from "./components/doj";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    getEntries = async () => {
        const results = await nuiAction('ev-ui:getDOJData', {}, { returnData: devData.getDOJData() });
        this.props.updateState({
            list: results?.data ?? [],
            status: results?.data?.status
        });
    }

    componentDidMount() {
        this.getEntries();
    }

    render() {
        return (
            <DOJ {...this.props} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);