import Accessories from './components/accessories';
import Clothing from './components/clothing';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {props.variant === 'clothing' && (
                <Clothing {...props} />
            )}
            {props.variant === 'accessories' && (
                <Accessories {...props} />
            )}
        </div>
    )
}