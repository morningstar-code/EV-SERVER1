import Button from 'components/button/button';
import Checkmark from 'components/checkmark/checkmark';
import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import Text from 'components/text/text';
import { mdtAction, showMdtLoadingModal } from 'main/mdt/actions';
import React from 'react';
import useStyles from '../index.styles';

export default (props: any) => {
    const fetchBusinesses = props.fetchBusinesses;
    const businessId = props.businessId;
    const accountId = props.accountId;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [name, setName] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const updateBusinessName = async (newName: string) => {
        setLoading(true);
        setError(null);
        
        const results = await mdtAction('updateBusinessName', { accountId: accountId, businessId: businessId, name: newName }, []);
        if (!results.meta.ok) {
            return setError('Unknown error please try again!');
        }

        await new Promise((resolve) => {
            return setTimeout(resolve, 1500);
        });

        setLoading(false);
        setError(null);
        setSuccess(true);
        fetchBusinesses();

        await new Promise((resolve) => {
            return setTimeout(resolve, 2000);
        });

        showMdtLoadingModal(false);

        return;
    }

    const classes = useStyles();

    return (
        loading ? (
            <div className={classes.createBusinessWrapper}>
                <Spinner />
            </div>
        ) : success ? (
            <div className={classes.createBusinessWrapper}>
                <Checkmark />
            </div>
        ) : (
            <div className={classes.changeOwnerWrapper}>
                <Input.Text
                    label="Name"
                    icon="user"
                    onChange={(value: string) => setName(value)}
                    value={name}
                />
                <Button.Primary onClick={() => updateBusinessName(name)} style={{ marginTop: '1rem' }}>
                    Change Name
                </Button.Primary>
                {error && (
                    <Text variant="body2" className={classes.errorText}>
                        {error}
                    </Text>
                )}
            </div>
        )
    )
}