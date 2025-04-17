import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/dev-data";
import store from "../../store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import Archives from "./archives";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    getNewsArchives = async (search = '') => {
        const results = await nuiAction('ev-ui:getNewsArchives', { search: search }, { returnData: devData.getNewsArchives() });
        this.props.updateState({ archiveItems: results.data });
    }

    changeSearchValue = (value: string) => {
        this.getNewsArchives(value);
    }

    performAction = async (action: string, data: any) => {
        await nuiAction('ev-ui:newsArchiveAction', { action: action, data: data });
        this.getNewsArchives();
    }

    componentDidMount() {
        this.getNewsArchives();
    }

    render() {
        return (
            <Archives {...this.props} changeSearchValue={this.changeSearchValue} performAction={this.performAction} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);