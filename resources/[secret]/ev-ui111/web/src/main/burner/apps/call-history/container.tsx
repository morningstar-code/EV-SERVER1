import React from "react";
import store from "./store";
import { connect } from "react-redux";
import { compose } from "lib/redux";
import CallHistory from "./components/call-history";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {    
    render() {
        return (
            <CallHistory {...this.props} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);