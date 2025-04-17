import React from 'react';
import { nuiAction } from 'lib/nui-comms';
import ManageLicenses from './components/manage-licenses';
import { devData } from 'main/dev-data';

class Container extends React.Component<any> {
    search = async (type: any, data: any) => {
        const results = await nuiAction('ev-ui:getStateCharacterDetails', { type: type, ...data }, {
            returnData: [
                {
                    id: 1,
                    first_name: 'Dw',
                    last_name: 'Winner'
                }
            ]
        });

        if (!results.meta.ok) return;

        this.props.updateState({ characters: results.data });

        if (this.props.licenses.length !== 0) return results;

        const licenses = await nuiAction('ev-ui:getAllLicenses', {}, { returnData: devData.getLicenses() });

        if (licenses) {
            this.props.updateState({ licenses: licenses.data });
        }

        return results;
    }

    getLicenses = async (character: Character) => {
        const results = await nuiAction('ev-ui:getLicenses', { character: character }, {
            returnData: [
                {
                    id: 1,
                    name: 'Drivers License',
                },
                {
                    id: 2,
                    name: 'Weapons License',
                },
                {
                    id: 3,
                    name: 'Bar License',
                }
            ]
        });

        if (results) {
            this.props.updateState({
                characterLicenses: results.data,
                characterLicensesFor: character.id
            })
        }
    }

    render() {
        return (
            <ManageLicenses {...this.props} getLicenses={this.getLicenses} search={this.search} />
        )
    }
}

export default Container;