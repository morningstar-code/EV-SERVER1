import { getMdtOfficers, mdtAction } from "main/mdt/actions";
import React from "react";
import Page from "./page";

class Config extends React.Component<any> {
    state = {
        changeIValue: '',
        changeInfoValue: '',
        changeOfficerValue: ''
    }

    changeStateValue = (key: string, value: string) => {
        this.setState({
            [key]: value
        });
    }

    createOfficerBadge = () => {
        const officer = getMdtOfficers().find((officer: any) => officer.character_id === this.state.changeOfficerValue);
        mdtAction('addInvItem', {
            item: 'pdbadge',
            information: {
                Badge: officer.callsign,
                Name: officer.name,
                Department: officer.department,
                Rank: officer.rank,
                image: officer.profile_image_url,
                _hideKeys: ['image'],
            }
        }, {});
        this.setState({ changeOfficerValue: '' })
    }

    createItem = () => {
        mdtAction('addInvItem', {
            item: this.state.changeIValue,
            information: JSON.parse(this.state.changeInfoValue)
        }, {});
    }

    render() {
        return (
            <Page {...this.props} {...this.state} changeStateValue={this.changeStateValue} createOfficerBadge={this.createOfficerBadge} createItem={this.createItem} />
        )
    }
}

export default Config;