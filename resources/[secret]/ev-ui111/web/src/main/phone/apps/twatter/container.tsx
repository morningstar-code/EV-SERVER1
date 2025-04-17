import React, { FunctionComponent } from "react";
import Twats from "./components/twats";
import store from "./store";
import { connect } from "react-redux";
import { compose } from "lib/redux";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    render() {
        return (
            <Twats {...this.props} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);