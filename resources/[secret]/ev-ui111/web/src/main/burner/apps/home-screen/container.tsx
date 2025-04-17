import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import HomeScreen from "./components/home-screen";

const { mapStateToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            character: state.character,
            burner: state.burner
        }
    }
});

class Container extends React.Component<any> {

    render() {
        return (
            <HomeScreen {...this.props} />
        )
    }
}

export default connect(mapStateToProps)(Container);