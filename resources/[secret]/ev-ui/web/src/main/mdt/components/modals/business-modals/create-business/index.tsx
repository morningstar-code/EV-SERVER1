import Button from 'components/button/button';
import Checkmark from 'components/checkmark/checkmark';
import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import Text from 'components/text/text';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';
import { showMdtLoadingModal } from 'main/mdt/actions';
import React from 'react';
import useStyles from '../index.styles';

export default (props: any) => {
    const fetchBusinesses = props.fetchBusinesses;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [businessTypes, setBusinessTypes] = React.useState([]);
    const [businessOwnerStateId, setBusinessOwnerStateId] = React.useState(0);
    const [businessName, setBusinessName] = React.useState('');
    const [businessType, setBusinessType] = React.useState(1);

    const createBusiness = async () => {
        if (businessOwnerStateId !== 0) {
            if (businessName !== '') {
                setLoading(true);
                setError(null);
                const results = await nuiAction('ev-ui:createBusiness', { name: businessName, business_type_id: Number(businessType), owner_id: Number(businessOwnerStateId) });

                await new Promise((resolve) => {
                    return setTimeout(resolve, 1500);
                });

                setLoading(false);

                if (results.meta.ok) {
                    fetchBusinesses();
                    setSuccess(true);
                } else {
                    setError('Unknown error try again!');
                }

                await new Promise((resolve) => {
                    return setTimeout(resolve, 2000);
                });

                return showMdtLoadingModal(false);
            }
            return setError('Please set business name');
        }

        return setError('Please set business owner');
    }

    const fetchBusinessTypes = React.useCallback(async () => {
        const results = await nuiAction('ev-ui:getBusinessTypes', {}, { returnData: devData.getBusinessTypes() });
        setBusinessTypes(results.data);
    }, []);

    React.useEffect(() => {
        fetchBusinessTypes();
    }, [fetchBusinessTypes]);

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
            <div className={classes.createBusinessWrapper}>
                <div className={classes.inputField}>
                    <Input.Business
                        onChange={(value: string) => setBusinessName(value)}
                        value={businessName}
                    />
                </div>
                <div className={classes.inputField}>
                    <Input.CityID
                        onChange={(value: number) => setBusinessOwnerStateId(value)}
                        value={businessOwnerStateId}
                    />
                </div>
                <div className={classes.inputField}>
                    <Input.Select
                        onChange={(value: number) => setBusinessType(value)}
                        value={businessType}
                        items={businessTypes}
                        label="Business Type"
                    />
                </div>
                <Button.Primary onClick={createBusiness} style={{ marginTop: '1rem' }}>
                    Create Business
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