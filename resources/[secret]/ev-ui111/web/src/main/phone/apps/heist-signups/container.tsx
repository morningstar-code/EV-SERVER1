import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import HeistSignups from "./components/heist-signups";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    getQueue = async () => {
        const results = await nuiAction('ev-ui:heists:getQueue', {}, { returnData: devData.getQueueData() });
        this.props.updateState({
            heists: results.data.queue,
            heistLevel: results.data.heistLevel,
            isManager: results.data.isManager
        });
    }

    getGroup = async () => {
        const results = await nuiAction('ev-ui:heists:getGroup', {}, { returnData: devData.getGroupData() });
        this.props.updateState({
            group: results.data
        });
    }

    getGangs = async () => {
        const results = await nuiAction('ev-ui:heists:getGangs', {}, { returnData: devData.getGangData() });
        
        const sortedGangs = results.data.sort((a, b) => {
            return a.heistWeight > b.heistWeight ? -1 : a.heistWeight < b.heistWeight ? 1 : 0;
        });
        
        this.props.updateState({
            gangs: sortedGangs
        });
    }

    manageWeights = () => {
        this.props.updateState({
            managing: !this.props.managing
        });

        this.props.managing || this.getGangs();
    }

    componentDidMount() {
        this.getQueue();
        this.getGroup();
    }

    render() {
        return (
            <HeistSignups {...this.props} getGangs={this.getGangs} getQueue={this.getQueue} getGroup={this.getGroup} manageWeights={this.manageWeights} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);