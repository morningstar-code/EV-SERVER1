import Button from 'components/button/button';
import Checkmark from 'components/checkmark/checkmark';
import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import Text from 'components/text/text';
import { mdtAction, showMdtLoadingModal } from 'main/mdt/actions';
import Content from 'main/mdt/components/content';
import Paper from 'main/mdt/components/paper';
import React from 'react';
import useStyles from '../index.styles';

export default (props: any) => {
    const businessId = props.businessId;
    const [loading, setLoading] = React.useState(false);
    const [history, setHistory] = React.useState([]);

    const fetchBusinessEmploymentHistory = React.useCallback(async () => {
        setLoading(true);
        const results = await mdtAction('getBusinessEmploymentHistory', { businessId: businessId }, []);
        const history = results.data?.history ?? null;
        if (history !== null) {
            setHistory(history);
        }
        setLoading(false);
    }, [businessId]);

    React.useEffect(() => {
        fetchBusinessEmploymentHistory();
    }, [fetchBusinessEmploymentHistory]);

    const classes = useStyles();

    return (
        loading ? (
            <div className={classes.createBusinessWrapper}>
                <Spinner />
            </div>
        ) : (
            <div className={classes.changeOwnerWrapper}>
                <Content
                    title="Employee History"
                >
                    {history && history.length > 0 ? history.map((h: any) => (
                        <Paper
                            key={h.id}
                            id={h.id}
                            timestamp={h.event_time}
                            title={`Type: ${h.event}`}
                            description={`Name: ${h.invoker}, Role: ${h.role}`}
                        />
                    )) : (
                        <Text variant="body1">
                            No history found...
                        </Text>
                    )}
                </Content>
            </div>
        )
    )
}