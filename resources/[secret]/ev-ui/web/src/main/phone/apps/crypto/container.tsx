import React from "react";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import store from "./store";
import { connect } from "react-redux";
import { compose } from "lib/redux";
import Crypto from "./components/crypto";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    getCrypto = async () => {
        const results = await nuiAction('ev-ui:getCrypto', {}, { returnData: devData.getCrypto() });
        this.props.updateState({
            list: results.data
        });
    }

    componentDidMount() {
        this.getCrypto();
    }

    render() {
        return (
            <Crypto {...this.props} getCrypto={this.getCrypto} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);