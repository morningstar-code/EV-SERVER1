import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import SecurityCams from "./components/security-cams";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    getSecurityCams = async () => {
        const results = await nuiAction('ev-ui:gopros:getSecurityCams', {}, { returnData: devData.getSecurityCams() });
        this.props.updateState({
            cams: results.data
        });
    }

    viewCamera = (id: any) => {
        nuiAction('ev-ui:gopros:viewCameraById', { id: id });
    }

    componentDidMount() {
        this.getSecurityCams();
    }

    render() {
        return (
            <SecurityCams {...this.props} viewCamera={this.viewCamera} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);