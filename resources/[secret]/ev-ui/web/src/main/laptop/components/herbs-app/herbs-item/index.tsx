import { LinearProgress, Typography } from '@mui/material';
import useStyles from './index.styles';

interface HerbItemProps {
    name: string;
    progress: HerbProgress;
    n: number;
    p: number;
    k: number;
}

export default (props: HerbItemProps) => {
    const name = props.name;
    const progress = props.progress;
    const n = props.n;
    const p = props.p;
    const k = props.k;

    const classes = useStyles();

    return (
        <div className={classes.herbItem}>
            <Typography variant="h1" className={classes.herbStrainTitle}>
                {name}
            </Typography>
            <div className={classes.herbStrainLevels}>
                <Typography style={{ color: 'white' }}>
                    {progress.current}
                </Typography>
                <Typography style={{ color: 'white' }}>
                    {progress.next}
                </Typography>
            </div>
            <LinearProgress
                classes={{
                    root: classes.herbsProgressParent,
                    bar: classes.herbsProgress
                }}
                variant="determinate"
                value={progress.amount}
            />
            <div className={classes.herbData}>
                <Typography style={{ color: 'white' }}>
                    N
                </Typography>
                <LinearProgress
                    classes={{
                        root: classes.herbInput,
                        bar: classes.herbInputValue
                    }}
                    variant="determinate"
                    value={n}
                />
                <Typography style={{ color: 'white' }}>
                    P
                </Typography>
                <LinearProgress
                    classes={{
                        root: classes.herbInput,
                        bar: classes.herbInputValue
                    }}
                    variant="determinate"
                    value={p}
                />
                <Typography style={{ color: 'white' }}>
                    K
                </Typography>
                <LinearProgress
                    classes={{
                        root: classes.herbInput,
                        bar: classes.herbInputValue
                    }}
                    variant="determinate"
                    value={k}
                />
            </div>
        </div>
    )
}