import Input from 'components/input/input';
import SimpleForm from 'components/simple-form';
import Spinner from 'components/spinner/spinner';
import { nuiAction } from 'lib/nui-comms';
import { showMdtLoadingModal } from 'main/mdt/actions';
import React from 'react';
import useStyles from '../index.styles';

export default (props: any) => {
    const accountId = props.accountId;
    const employeeId = props.employeeId;
    const [loading, setLoading] = React.useState(true);
    const [elements, setElements] = React.useState([]);
    const [defaultValues, setDefaultValues] = React.useState({});

    const fetchAccountCharacters = React.useCallback(async () => {
        const results = await nuiAction('ev-ui:getAccountCharacters', { account_id: accountId }, { returnData: [] });

        const foundEmployee = results.data.find((employee: any) => employee.id === employeeId);

        const bankAccess = [
            'balance',
            'deposit',
            'transfer',
            'transactions',
            'withdraw'
        ];

        const gennedElements = [];
        const gennedDefaultValues = {};

        const generate = (index: number) => {
            gennedDefaultValues[bankAccess[index]] = foundEmployee && foundEmployee.access.includes(bankAccess[index]);
            gennedElements.push({
                name: bankAccess[index],
                render: (prop: any) => {
                    const onChange = prop.onChange;
                    const value = prop.value;

                    return (
                        <Input.Checkbox
                            checked={value || false}
                            onChange={onChange}
                            label={bankAccess[index]}
                        />
                    )
                }
            });
        }

        for (let i = 0; i < bankAccess.length; i++) {
            generate(i);
        }

        setDefaultValues(gennedDefaultValues);
        setElements(gennedElements);
        setLoading(false);
    }, [accountId, employeeId]);

    React.useEffect(() => {
        fetchAccountCharacters();
    }, [fetchAccountCharacters]);

    const classes = useStyles();

    return (
        <div className={classes.bankAccessWrapper}>
            {loading && <Spinner />}
            {!loading && (
                <SimpleForm
                    defaultValues={defaultValues}
                    elements={elements}
                    onCancel={() => showMdtLoadingModal(false)}
                    onSubmit={async (values: any) => {
                        setLoading(true);

                        const access = Object.keys(values).filter((key: string) => !!values[key]);
                        const character = {
                            employee: { id: employeeId, access: access }, //character
                            account: { id: accountId }
                        };

                        if (access.length !== 0) {
                            const results = await nuiAction('ev-ui:addAccountCharacterPermissions', character);
                            if (results.meta.ok) {
                                return fetchAccountCharacters();
                            }

                            await nuiAction('ev-ui:editAccountCharacterPermissions', character);

                            return fetchAccountCharacters();
                        }

                        await nuiAction('ev-ui:removeCharacterFromAccount', character);
                        return fetchAccountCharacters();
                    }}
                />
            )}
        </div>
    )
}