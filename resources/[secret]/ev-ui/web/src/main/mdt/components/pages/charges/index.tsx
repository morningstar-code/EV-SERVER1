import { mdtAction } from "main/mdt/actions";
import React from "react";
import Page from "./page";

export let mdtCharges: any = [];

class Charges extends React.Component<any> {
    searchTimeout = 0;

    state = {
        categories: {},
        searchValue: '',
        shouldUpdate: 0
    }

    changeSearchValue = (searchValue: string) => {
        this.setupCharges(searchValue);
    }

    setupCharges(searchValue = '') {
        const categories = {};
        const filteredCharges = mdtCharges.filter((charge: any) => {
            return !searchValue || charge.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 || charge.description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 || charge.category_title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
        });

        filteredCharges.forEach((charge: any) => {
            categories[charge.category_title] || (categories[charge.category_title] = []);
            categories[charge.category_title].push(charge);
        });

        this.setState({ categories: categories });
    }

    async componentDidMount() {
        const results = await mdtAction('getCharges', {}, [ 
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 1,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description:
                    'Tip my hat to Yoda',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 2,
                category_title: 'Offenses Against Hirona',
                name: 'Tipped Hat Twice',
                description: 'Mlady',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 0,
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 3,
                category_title: 'Offenses Against Dw',
                name: 'Calling it the MDT3',
                description: 'Go fuck yourself',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 0,
                held_until_trial: 0,
                accomplicerized: 1,
                accomplice_description:
                    'Tip my hat to Yoda',
                accomplice_time: 10,
                accomplice_fine: 10000,
                accomplice_points: 0,
                accomplice_felony: 0,
                accomplice_held_until_trial: 0,
                accessorized: 1,
                accessory_description: 'Yoda will stab u',
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 4,
                category_title: 'Offenses Against Dw',
                name: 'Calling it the MDT2',
                description: 'Go fuck yourself',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 1,
                held_until_trial: 0,
                accessorized: 1,
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            },
            {
                id: 5,
                category_title: 'Offenses Against Dw',
                name: 'Calling it the MDT1',
                description: 'Go fuck yourself',
                time: 10,
                fine: 10000,
                points: 0,
                felony: 1,
                held_until_trial: 1,
                accessorized: 1,
                accessory_time: 10,
                accessory_fine: 10000,
                accessory_points: 0,
                accessory_felony: 0,
                accessory_held_until_trial: 0,
            }
        ]);

        const charges = results.data;

        mdtCharges = charges;

        this.setupCharges();

        this.setState({ shouldUpdate: this.state.shouldUpdate + 1 });
    }

    render() {
        return (
            <Page {...this.props} categories={this.state.categories} shouldUpdate={this.state.shouldUpdate} searchValue={this.state.searchValue} changeSearchValue={this.changeSearchValue} />
        )
    }
}

export default Charges;