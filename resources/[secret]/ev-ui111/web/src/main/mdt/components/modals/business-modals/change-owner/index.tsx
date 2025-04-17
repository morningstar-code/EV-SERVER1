import Button from 'components/button/button';
import Checkmark from 'components/checkmark/checkmark';
import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import Text from 'components/text/text';
import { mdtAction, showMdtLoadingModal } from 'main/mdt/actions';
import React from 'react';
import useStyles from '../index.styles';

export default (props: any) => {
    const owner = props.owner;
    const businessId = props.businessId;
    const fetchEmployees = props.fetchEmployees;
    const accountId = props.accountId;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [newOwnerStateId, setNewOwnerStateId] = React.useState(0);
    const [success, setSuccess] = React.useState(false);

    const updateBusinessOwner = async (ownerId: number) => {
        if (!isNaN(ownerId)) {
            setLoading(true);
            setError(null);
            const results = await mdtAction('updateBusinessOwner', { accountId: accountId, ownerId: ownerId, businessId: businessId }, []);

            !results.meta.ok && setError('Unknown error please try again!');

            await new Promise((resolve) => {
                return setTimeout(resolve, 1500);
            });

            setLoading(false);
            setError(null);
            setSuccess(true);
            fetchEmployees(businessId, accountId);

            await new Promise((resolve) => {
                return setTimeout(resolve, 2000);
            });

            showMdtLoadingModal(false);
        }
    }

    React.useEffect(() => {
        setNewOwnerStateId(owner);
    }, [owner]);

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
                <Input.CityID
                    onChange={(value: number) => setNewOwnerStateId(value)}
                    value={newOwnerStateId}
                />
                <Button.Primary onClick={() => updateBusinessOwner(newOwnerStateId)} style={{ marginTop: '1rem' }}>
                    Change Owner
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