import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import SecurityCams from "./components/security-cams";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    registerCarForFootage = async (carId: any) => {
        const result = await nuiAction('ev-ui:gopros:registerCarForFootage', { carId });
        const footageResultData = result.data
        
        this.props.updateState({
            footageResult: footageResultData
        });
    }

    changeSelectedPov = async (povId: any) => {
        const result = await nuiAction('ev-ui:gopros:changeSelectedPov', { povId });
        const povResultData = result.data
        
        this.props.updateState({
            povResult: povResultData
        });
    }
    
    getSecurityCams = async () => {
        const results = await nuiAction('ev-ui:gopros:getSecurityCameras', {}, { returnData: devData.getSecurityCams() });
        this.props.updateState({
            cams: results.data
        });
    }
    
    viewCamera = (id: any) => {
        nuiAction('ev-ui:gopros:viewCameraById', { id: id });
    }
    
    addUserToCamera = async (userId: any, cameraId: any) => {
        const result = await nuiAction('ev-ui:gopros:addUserToCamera', { userId, cameraId });
        const userResultData = result.data
        
        this.props.updateState({
            userResult: userResultData
        });
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