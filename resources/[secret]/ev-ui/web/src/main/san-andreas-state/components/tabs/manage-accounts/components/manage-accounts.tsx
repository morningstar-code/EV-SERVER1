import React from "react";
import Content from "main/san-andreas-state/components/content";
import useStyles from "./manage-accounts.styles";
import Paper from "main/san-andreas-state/components/paper";
import { formatCurrency } from "lib/format";
import Text from "components/text/text";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/dev-data";

export default (props: any) => {
    const classes = useStyles();

    const searchAccounts = async (type: string, data: any) => {
        const accountsSearch = {
            is_atm: false,
            type,
            ...data
        };

        const results = await nuiAction('ev-ui:getAccounts', accountsSearch, { returnData: devData.getAccounts() });

        const accounts = results?.data?.accounts ? [...results?.data?.accounts] : [];
        
        if (results.meta.ok) {
            props.updateState({
                accounts: accounts,
                accountsSearch: accountsSearch
            });
            return results.meta;
        }

        return results.meta;
    }

    const getFields = (account = null) => {
        let options = props.accountTypes.filter((type: AccountType) => {
            return !!type.public;
        });

        if (account) {
            const accountType = props.accountTypes.find((type: AccountType) => {
                return type.id === account.type_id;
            });
            accountType || (options = [accountType]);
        }

        const def = options[0].id;

        const fields: any = [
            {
                label: 'Name',
                name: 'name',
                default: account ? account.name : ''
            },
            {
                label: 'Type',
                name: 'type',
                type: 'select',
                options: options,
                default: def,
            }
        ];

        if (account) {
            fields.push({
                label: 'Frozen',
                name: 'is_frozen',
                type: 'checkbox',
                default: account.is_frozen
            });
            fields.push({
                label: 'Monitored',
                name: 'is_monitored',
                type: 'checkbox',
                default: account.is_monitored
            });
        } else {
            fields.push({
                label: 'State ID',
                name: 'cid',
                default: ''
            });
        }

        return fields;
    }

    const generateAccountData = (editedAccount: Account, accountData: Account) => {
        const account: any = {
            name: accountData.name,
            type_id: Number(accountData.type)
        };

        if (editedAccount?.id) {
            account.id = editedAccount.id;
            account.is_frozen = accountData.is_frozen;
            account.is_monitored = accountData.is_monitored;
        } else {
            account.access = [
                'balance',
                'deposit',
                'transfer',
                'transactions',
                'withdraw'
            ];
            account.is_frozen = false;
            account.is_monitored = false;
            account.is_owner = true; //temp
            account.cid = Number(accountData.cid);
        }

        return account;
    }

    const types = ['balance', 'transfer', 'deposit', 'withdraw', 'transactions'];

    return (
        <div>
            <Content
                action={{
                    label: 'Create Account',
                    fields: getFields(),
                    onSubmit: async (data: any) => {
                        const account = generateAccountData({} as any, data);
                        const results = await nuiAction('ev-ui:createAccount', account);
                        return results.meta;
                    }
                }}
                burger={[
                    {
                        isForm: true,
                        fields: [
                            {
                                label: 'ID',
                                name: 'id',
                                default: ''
                            }
                        ],
                        onSubmit: (data: any) => searchAccounts('id', data),
                        label: 'Search by Account ID'
                    },
                    {
                        isForm: true,
                        fields: [
                            {
                                label: 'ID',
                                name: 'cid',
                                default: '',
                            }
                        ],
                        onSubmit: (data: any) => searchAccounts('cid', data),
                        label: 'Search by State ID'
                    },
                    {
                        isForm: true,
                        fields: [
                            {
                                label: 'Name',
                                name: 'name',
                                default: ''
                            }
                        ],
                        onSubmit: (data: any) => searchAccounts('name', data),
                        label: 'Search by Business Name'
                    }
                ]}
                heading="Banking"
            >
                {props?.accounts && props?.accounts?.length > 0 && props.accounts.filter((item, index, self) => {
                    return index === self.findIndex(obj => obj.bank_account_id === item.bank_account_id);
                }).map((account: Account) => (
                    <React.Fragment key={account.id}>
                        <hr />
                        <Paper
                            actions={[
                                {
                                    isForm: true,
                                    fields: getFields(account),
                                    onSubmit: async (data: any) => {
                                        const accountData = generateAccountData(account, data);
                                        const results = await nuiAction('ev-ui:editAccount', accountData);

                                        if (results.meta.ok) {
                                            const accounts = await nuiAction('ev-ui:getAccounts', props.accountsSearch, { returnData: devData.getAccounts() });
                                            if (accounts.meta.ok) {
                                                props.updateState({
                                                    accounts: accounts?.data?.accounts ?? [],
                                                    accountsSearch: props?.accountsSearch
                                                });
    
                                                return accounts.meta;
                                            }

                                            return accounts.meta;
                                        }

                                        return results.meta;
                                    },
                                    label: 'Edit Account'
                                },
                                {
                                    label: 'View People',
                                    onClick: async (data: any) => {
                                        const loadingFunc = data.loading;
                                        loadingFunc(true);

                                        const results = await nuiAction('ev-ui:getAccountCharacters', { account_id: account.id }, { returnData: devData.getAccountCharacters() });

                                        props.updateState({
                                            accountCharacters: results?.data ?? [],
                                            accountCharactersFor: account.id
                                        });

                                        loadingFunc(false);
                                    }
                                },
                                {
                                    isForm: true,
                                    fields: [
                                        {
                                            label: 'State ID',
                                            name: 'state_id',
                                            default: '',
                                        },
                                        ...types.map((type) => ({
                                            label: type,
                                            type: 'checkbox',
                                            name: type,
                                            default: false
                                        }))
                                    ],
                                    onSubmit: async (data: any) => {
                                        const results = await nuiAction('ev-ui:addAccountCharacterPermissions', {
                                            account: account,
                                            employee: { //character
                                                id: Number(data.state_id),
                                                access: [
                                                    'balance',
                                                    'transfer',
                                                    'deposit',
                                                    'withdraw',
                                                    'transactions',
                                                ].filter((type: string) => !!data[type])
                                            }
                                        });

                                        if (!results.meta.ok) {
                                            return results.meta;
                                        }

                                        const accountCharacters = await nuiAction('ev-ui:getAccountCharacters', { account_id: account.id }, { returnData: devData.getAccountCharacters() });

                                        props.updateState({
                                            accountCharacters: accountCharacters?.data ?? [],
                                            accountCharactersFor: account.id
                                        });

                                        return results.meta;
                                    },
                                    label: 'Add Person'
                                }
                            ]}
                            heading={`${account.name} (${formatCurrency(account.balance)})`}
                            headingExtra={`${account.is_frozen ? '(Frozen)' : ''} ${account.is_monitored ? '(Monitored)' : ''} ${account.type} / ${account.id}`}
                            includeConfirm={false}
                        />
                        {props.accountCharactersFor === account.id && props.accountCharacters.map((character: AccountCharacter) => (
                            <Paper
                                key={character.id}
                                actions={character.is_owner ? null : [
                                    {
                                        isForm: true,
                                        fields: [
                                            ...types.map((type) => ({
                                                label: type,
                                                type: 'checkbox',
                                                name: type,
                                                default: character.access.includes(type)
                                            }))
                                        ],
                                        onSubmit: async (data: any) => {
                                            const results = await nuiAction('ev-ui:editAccountCharacterPermissions', {
                                                account: account,
                                                employee: { //character
                                                    id: character.id,
                                                    access: [
                                                        'balance',
                                                        'transfer',
                                                        'deposit',
                                                        'withdraw',
                                                        'transactions',
                                                    ].filter((type: string) => !!data[type])
                                                }
                                            });

                                            if (!results.meta.ok) {
                                                return results.meta;
                                            }

                                            const accountCharacters = await nuiAction('ev-ui:getAccountCharacters', { account_id: account.id }, { returnData: devData.getAccountCharacters() });

                                            props.updateState({
                                                accountCharacters: accountCharacters?.data ?? [],
                                                accountCharactersFor: account.id
                                            });

                                            return results.meta;
                                        },
                                        label: 'Edit Permissions'
                                    },
                                    {
                                        isConfirm: true,
                                        onConfirm: async () => {
                                            const results = await nuiAction('ev-ui:removeCharacterFromAccount', {
                                                account: account,
                                                employee: character //character
                                            });

                                            if (!results.meta.ok) {
                                                return results.meta;
                                            }

                                            const accountCharacters = await nuiAction('ev-ui:getAccountCharacters', { account_id: account.id }, { returnData: devData.getAccountCharacters() });

                                            props.updateState({
                                                accountCharacters: accountCharacters?.data ?? [],
                                                accountCharactersFor: account.id
                                            });

                                            return results.meta;
                                        },
                                        label: 'Remove From Account'
                                    }
                                ]}
                                heading={character.name}
                                includeConfirm={false}
                            >
                                {character.is_owner ? (
                                    <div>
                                        <Text variant="body2">
                                            Owner
                                        </Text>
                                    </div>
                                ) : (
                                    <div className={classes.accessList}>
                                        {character.access.map((access: string) => (
                                            <Text key={access} variant="body2">
                                                {access}
                                            </Text>
                                        ))}
                                    </div>
                                )}
                            </Paper>
                        ))}
                    </React.Fragment>
                ))}
            </Content>
        </div>
    )
}