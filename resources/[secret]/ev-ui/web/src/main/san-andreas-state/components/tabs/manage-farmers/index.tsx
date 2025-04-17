import React from 'react';
import ManageFarmers from './components/manage-farmers';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';

class Container extends React.Component<any> {
    getFarmersItems = async (search = '') => {
        const results = await nuiAction('ev-ui:getFarmersItems', { search: search }, {
            returnData: [
                {
                    id: 1,
                    image: 'https://i.imgur.com/0Clrfuz.jpg',
                    name: 'bacon',
                    description: 'bacons',
                    type: 'item',
                    item_type: 'food',
                },
                {
                    id: 2,
                    image: 'https://i.imgur.com/0Clrfuz.jpg',
                    name: null,
                    description: null,
                    type: 'banner',
                    item_type: null,
                }
            ]
        });
        this.props.updateState({ farmersItems: results.data ?? [] });
    }

    changeSearchValue = (searchValue: string) => {
        this.getFarmersItems(searchValue);
    }

    performAction = async (action: string, id: number) => {}

    componentDidMount() {
        this.getFarmersItems();
    }

    render() {
        return (
            <ManageFarmers {...this.props} changeSearchValue={this.changeSearchValue} performAction={this.performAction} />
        )
    }
}

export default Container;