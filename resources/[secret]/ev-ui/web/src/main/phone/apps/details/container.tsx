import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import Details from "./components/details";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            character: state.character,
            orientation: state.phone.orientation
        }
    }
});

class Container extends React.Component<any> {
    getDetails = async () => {
        const results = await nuiAction('ev-ui:getCharacterDetails', {
            id: this.props.character.id,
            character: this.props.character
        }, { returnData: devData.getDetails() });

        if (results.meta.ok) {
            this.props.updateState(results.data);
        }
    }

    componentDidMount() {
        this.getDetails();
    }

    render() {
        return (
            <Details {...this.props} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);