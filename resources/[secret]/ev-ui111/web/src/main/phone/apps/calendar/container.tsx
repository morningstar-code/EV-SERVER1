import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import Calendar from "./components/calendar";
import { devData } from "main/phone/dev-data";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            character: state.character
        }
    }
});

class Container extends React.Component<any> {
    list = [];

    getCalendarEvents = async () => {
        const results = await nuiAction('ev-ui:calendar:getEvents', {}, { returnData: devData.getCalendarEvents() });

        this.props.updateState({
            list: results.data
        });
    }

    componentDidMount() {
        this.getCalendarEvents();
    }

    render() {
        return (
            <Calendar {...this.props} getEntries={this.getCalendarEvents} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);