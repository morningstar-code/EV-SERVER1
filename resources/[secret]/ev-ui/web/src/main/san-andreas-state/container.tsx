import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { updateSnackbarState } from 'main/snackbar/actions';
import { nuiAction } from 'lib/nui-comms';
import { isDevel } from 'lib/env';
import GeneralManager from 'components/general-manager';
import ManageLicenses from './components/tabs/manage-licenses';
import ManageAccounts from './components/tabs/manage-accounts';
import ManageLoans from './components/tabs/manage-loans';
import ManageTaxes from './components/tabs/manage-taxes';
import ManageBallots from './components/tabs/manage-ballots';
import CreateLicenses from './components/tabs/create-licenses';
import ManageFarmers from './components/tabs/manage-farmers';
import ManagePhoneConvos from './components/tabs/manage-phone-convos';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        show: false,
        activeId: -1
    }

    _snackbar = () => {
        updateSnackbarState({
            message: 'You cannot do that',
            open: true,
            timeout: 5000,
            type: 'error'
        });
    }

    onShow = async (data: any) => {
        const results = await nuiAction('ev-ui:getCharacterPermissions', {}, {
            returnData: {
                modules: [
                    'licenses_management', // Judge
                    'bank_management', // Judge
                    'loan_management', // Judge
                    'tax_management', // Mayor
                    'ballot_management', // Mayor
                    'create_licenses_management', // Judge
                    'farmers_management', // Special
                    'phonelogs_management' // Judge
                ],
                permissions: [

                ]
            }
        });

        if (results.data && results.data?.systems || results.data?.modules) {
            let modules = [];
            let systems = [];

            // const filterMap = (arr) => {
            //     return Object.keys(arr).filter((key) => !!arr[key]).map((key) => {
            //         return key.replace(/[A-Z]/g, (m: any) => `_${m.toLowerCase()}`)
            //     });
            // }

            const filterMap = (arr) => {
                return Object.values(arr)
                    .filter((value) => !!value)
                    .map((value: string) => {
                        return value?.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
                    });
            };

            if (results.data?.modules) {
                modules = filterMap(results.data.modules);
            }

            if (results.data?.systems) {
                systems = filterMap(results.data.systems);
            }

            const access = [...modules, ...systems];

            this.setState({ show: true });

            this.props.updateState({ access: access });
            this.props.updateState({ permissions: results?.data?.permissions ?? [] });
        } else {
            this._snackbar();
        }
    }

    onHide = () => {
        this.setState({ show: false });
    }

    hasPermission = (permission: string) => {
        return this.props.permissions.includes(permission);
    }

    hasAccess = (access: string) => {
        return this.props.access.includes(access);
    }

    createModules = () => {
        const modules = [
            [
                'licenses',
                {
                    id: 1,
                    label: 'Manage Licenses',
                },
            ],
            [
                'bank',
                {
                    id: 2,
                    label: 'Bank Accounts',
                },
            ],
            [
                'loan',
                {
                    id: 4,
                    label: 'Loans',
                },
            ],
            [
                'tax',
                {
                    id: 5,
                    label: 'Taxes',
                },
            ],
            [
                'ballot',
                {
                    id: 6,
                    label: 'Ballots',
                },
            ],
            [
                'create_licenses',
                {
                    id: 7,
                    label: 'Create Licenses',
                }
            ],
            [
                'farmers',
                {
                    id: 8,
                    label: 'Farmers Market',
                },
            ],
            [
                'phonelogs',
                {
                    id: 9,
                    label: 'Phone Conversations',
                },
            ],
        ];

        return isDevel() ? modules.map((m: any) => m[1]) : modules.filter((m: any) => {
            return this.hasAccess(`${m[0]}_management`);
        }).map((m: any) => m[1]);
    }

    render() {
        return (
            <AppWrapper
                center={true}
                name="san-andreas-state"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <GeneralManager
                        activeItem={this.state.activeId}
                        items={this.createModules()}
                        onMenuItemClick={(item) => this.setState({ activeId: item.id })}
                    >
                        {this.state.activeId === -1 && (
                            <div></div>
                        )}
                        {this.state.activeId === 1 && (
                            <ManageLicenses {...this.props} />
                        )}
                        {this.state.activeId === 2 && (
                            <ManageAccounts {...this.props} />
                        )}
                        {this.state.activeId === 4 && (
                            <ManageLoans {...this.props} />
                        )}
                        {this.state.activeId === 5 && (
                            <ManageTaxes {...this.props} />
                        )}
                        {this.state.activeId === 6 && (
                            <ManageBallots {...this.props} />
                        )}
                        {this.state.activeId === 7 && (
                            <CreateLicenses {...this.props} />
                        )}
                        {this.state.activeId === 8 && (
                            <ManageFarmers {...this.props} />
                        )}
                        {this.state.activeId === 9 && (
                            <ManagePhoneConvos {...this.props} />
                        )}
                    </GeneralManager>
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);