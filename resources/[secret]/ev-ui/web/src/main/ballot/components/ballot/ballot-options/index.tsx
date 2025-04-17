import { Typography } from '@mui/material';
import Button from 'components/button/button';
import useStyles from '../index.styles';

export default (props: any) => {
    const classes = useStyles();
    const data = props.data;
    const hasPrev = props.hasPrev;
    const hasNext = props.hasNext;
    const multi = props.multi;
    const next = props.next;
    const prev = props.prev;
    const selected = props.selected;
    const selectItem = props.selectItem;
    const submit = props.submit;

    return (
        <div className={classes.optionsWrapper}>
            <div className={classes.optionsTitle}>
                <Typography variant="subtitle1" style={{ color: 'white', fontWeight: 'bold' }}>
                    {data.name}
                </Typography>
                <Typography variant="subtitle1" style={{ color: 'white', textTransform: 'uppercase' }}>
                    {multi ? 'Select At Least One' : 'Select One'}
                </Typography>
            </div>
            <div className={classes.options}>
                {data.options && data.options.length > 0 && data.options.map((option: any) => (
                    <div key={option.id} className={classes.option}>
                        <div className={classes.info}>
                            <Typography variant="h5" style={{ color: 'white' }}>
                                {option.name}
                            </Typography>
                            <Typography variant="body2" style={{ color: 'white' }}>
                                {option.description}
                            </Typography>
                            <Typography variant="subtitle1" style={{ color: 'white' }}>
                                {option.party}
                            </Typography>
                        </div>
                        {option.icon && (
                            <div className={classes.icon}>
                                <i className={`fas fa-${option.icon} fa-fw fa-2x`} style={{ color: 'white' }} />
                            </div>
                        )}
                        <div className={classes.icon} onClick={() => {
                            return selectItem(
                                data.id,
                                option.id,
                                multi
                            )
                        }}>
                            <i className={`fas fa-${selected.indexOf(option.id) !== -1 ? 'check-square' : 'square'} fa-fw fa-5x`} style={{ color: 'white' }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.actions}>
                {!selected.length && (
                    <Typography variant="body1" style={{ color: 'white', width: '100%', textAlign: 'center', textTransform: 'uppercase' }}>
                        You must select a ballot option to continue
                    </Typography>
                )}
                {selected.length && hasPrev ? (
                    <Button.Secondary onClick={prev}>
                        Previous Ballot
                    </Button.Secondary>
                ) : (
                    <div></div>
                )}
                {!!selected.length && hasNext && (
                    <Button.Primary onClick={next}>
                        Next Ballot
                    </Button.Primary>
                )}
                {!!selected.length && !hasNext && (
                    <Button.Primary onClick={submit}>
                        Submit Ballot
                    </Button.Primary>
                )}
            </div>
        </div>
    )
}