import { Typography } from '@mui/material';
import Spinner from 'components/spinner/spinner';
import BallotOptions from './ballot-options';
import useStyles from './index.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default (props: any) => {
    const classes = useStyles();
    const option = props.options[props.idx];
    const optionLength = !!props.options.length;
    const height = props.loading || props.ballotSaved || !optionLength ? '300px' : 'calc(75vh + 193px)';

    return (
        <div className={classes.wrapper} style={{ height: height }}>
            <div className={classes.flexRow}>
                {!props.loading && !props.ballotSaved && optionLength && (
                    <Typography variant="h5" style={{ color: 'white' }}>
                        Voting for:
                    </Typography>
                )}
                <div className={classes.title}>
                    <FontAwesomeIcon icon="poll" size="2x" fixedWidth />
                    <Typography variant="h5" style={{ color: 'white', marginLeft: 8 }}>
                        #ElectionSZN
                    </Typography>
                </div>
            </div>
            {props.loading && (
                <div className={classes.flexCenter} style={{ height: '100%', width: '100%', margin: '64px 0' }}>
                    <Spinner />
                </div>
            )}
            {props.ballotSaved && (
                <div className={classes.flexCenter} style={{ flexDirection: 'column' }}>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        YOUR BALLOT OPTIONS HAVE BEEN SAVED
                    </Typography>
                    <Typography variant="h5" style={{ color: 'white', marginTop: 64 }}>
                        THANK YOU FOR VOTING!
                    </Typography>
                </div>
            )}
            {!props.loading && !optionLength && (
                <Typography variant="h5" style={{ color: 'white', marginTop: 64, textAlign: 'center' }}>
                    THERE ARE CURRENTLY NO ACTIVE BALLOTS
                </Typography>
            )}
            {!props.loading && !props.ballotSaved && !!props.options.length && (
                <BallotOptions
                    data={option}
                    hasNext={props.idx + 1 < props.options.length}
                    hasPrev={props.idx > 0}
                    multi={option.multi}
                    next={() => {
                        return props.updateState({ idx: props.idx + 1 });
                    }}
                    prev={() => {
                        return props.updateState({ idx: props.idx - 1 });
                    }}
                    selected={props.selectedMap[option.id]}
                    selectItem={props.selectItem}
                    submit={props.submitBallot}
                />
            )}
        </div>
    )
}