import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Atm from './components/atm';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';
import { Wait } from 'utils/misc';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<AtmState, { show: boolean }> {
    state = {
        show: false
    }

    onShow = async (data: ATMOnShowPayload) => {
        this.setState({ show: true });

        await Wait(500)

        const results = await Promise.all([
            this.getAccounts(),
            this.getTransactions({
                id: this.props.character.bank_account_id,
                access: ['transactions']
            }),
            this.getCash(),
        ]);

        const accounts = results[0]?.accounts ?? [];
        const transactions = results[1]?.transactions ?? [];
        const cash = results[2] ?? 0;

        this.props.updateState({
            accounts: accounts,
            cash: cash,
            isAtm: data.isAtm ?? false,
            transactions: transactions,
            defaultAccount: accounts[0],
            initialLoadComplete: true,
            selectedAccount: accounts[0]
        });
    }

    onHide = () => {
        this.setState({ show: false });
        this.props.updateState({
            initialLoadComplete: false,
            modalAccount: null,
            modalAction: null,
            showModalError: false
        });
    }

    getCash = async () => {
        const results = await nuiAction('ev-ui:getCharacterDetails', {}, { returnData: devData.getCharacterDetails() });

        return results?.data?.cash ?? 0;
    }

    getTransactions = async (data: ATMGetTransactionsPayload) => {
        if (data?.access?.indexOf('transactions') !== -1) {
            const date = new Date();
            const startDate = Math.round(date.getTime() / 1000 - 2592000);
            const endDate = Math.round(date.getTime() / 1000 + 172800);

            const results = await nuiAction('ev-ui:getAccountTransactions', {
                account_id: Number(data.id),
                date_start: startDate,
                date_end: endDate
            }, { returnData: devData.getTransactions() });

            return {
                hasAccess: true,
                transactions: results?.data ?? []
            }
        }

        return {
            hasAccess: false,
            transactions: []
        }
    }

    getAccounts = async () => {
        const results = await nuiAction<ReturnData<{ accounts: Account[] }>>('ev-ui:getAccounts', {}, { returnData: devData.getAccounts() });
        const accounts = results?.data?.accounts ?? [];

        const defaultAccountIdx = accounts.findIndex((account) => account.id === this.props.character.bank_account_id);
        const defaultAccount = accounts[defaultAccountIdx];

        accounts.splice(defaultAccountIdx, 1);

        accounts.sort((a, b) => {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0;
        });

        return {
            accounts: [defaultAccount, ...accounts]
        };
    }

    clickGetTransactions = async (account: Account) => {
        this.props.updateState({
            selectedAccount: account,
            transactions: [],
            transactionsLoading: true,
            showTransactionsAccessWarning: false
        });

        const results = await this.getTransactions({ id: account.id, access: account.access });
        const hasAccess = results?.hasAccess ?? false;
        const transactions = results?.transactions ?? [];

        if (hasAccess) {
            return this.props.updateState({
                transactions: transactions,
                transactionsLoading: false,
                selectedAccount: account,
                showTransactionsAccessWarning: false
            });
        }

        return this.props.updateState({
            transactions: [],
            transactionsLoading: false,
            selectedAccount: account,
            showTransactionsAccessWarning: true
        });
    }

    showModal = (account: Account, action: string) => {
        this.props.updateState({
            modalAccount: account,
            modalAction: action,
            showModalError: false
        });
    }

    performAction = async (type: string, account: Account, amount: number, comment: string, accountId: number, stateId: number) => {
        type = type.charAt(0).toUpperCase() + type.slice(1);
        const result = await nuiAction(`ev-ui:account${type}`, {
            comment: comment,
            account_id: Number(account?.id),
            amount: Number(amount),
            target_account_id: Number(accountId),
            target_state_id: Number(stateId),
            type: type
        });

        if (result.meta.ok) {
            const results = await Promise.all([
                this.getAccounts(),
                this.getTransactions(account),
                this.getCash(),
            ]);

            const accounts = results[0].accounts;
            const trans = results[1];
            const hasAccess = trans.hasAccess;
            const transactions = trans.transactions;
            const cash = results[2];

            return this.props.updateState({
                accounts: accounts,
                cash: cash,
                transactions: transactions,
                selectedAccount: account,
                showTransactionsAccessWarning: !hasAccess,
                modalAccount: null,
                modalAction: null,
                showModalError: false
            });
        }

        return this.props.updateState({ showModalError: result.meta.message });
    }

    performExportAction =  async () => {
        //TODO;
    }

    render() {
        const actions = {
            deposit: this.showModal,
            exportTx: this.showModal,
            transfer: this.showModal,
            withdraw: this.showModal
        }

        return (
            <AppWrapper
                center={true}
                closeOnError={true}
                store={store}
                name="atm"
                onError={this.onHide}
                onEscape={this.onHide}
                onEscapeData={() => {
                    return {
                        is_atm: this.props.isAtm
                    }
                }}
                onHide={this.onHide}
                onShow={this.onShow}
                zIndex={1000}
            >
                {this.state.show && (
                    <Atm {...this.props} actions={actions} getTransactions={this.clickGetTransactions} performAction={this.performAction} performExportAction={this.performExportAction} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);