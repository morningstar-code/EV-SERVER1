import { mdtAction, showMdtLoadingModal } from "main/mdt/actions";
import React from "react";
import ConfigBox from "./config-box";

class ConfigData extends React.Component<any> {
    state = {
        items: []
    }

    getData = async () => {
        const results = await mdtAction('getAllConfigOptions', { table: this.props.sqlTable, useCharacterId: this.props.useCharacterId || false }, this.props.returnData || []);
        this.setState({ items: results.data });
        showMdtLoadingModal(false);
    }

    onCreate = async (data: any) => {
        if (data) {
            showMdtLoadingModal(true);
            await mdtAction('insertConfigOption', { data: data, table: this.props.sqlTable, useCharacterId: this.props.useCharacterId || false });
            this.getData();
        }
    }

    onSave = async (data: any) => {
        if (data) {
            showMdtLoadingModal(true);
            await mdtAction('updateConfigOption', { data: data, table: this.props.sqlTable, useCharacterId: this.props.useCharacterId || false });
            this.getData();
        }
    }

    componentDidMount() {
        showMdtLoadingModal(true);
        this.getData();
    }

    render() {
        return (
            <ConfigBox {...this.props} items={this.state.items} onCreate={this.onCreate} onSave={this.onSave} />
        )
    }
}

export default ConfigData;