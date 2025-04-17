import Button from 'components/button/button';
import Spinner from 'components/spinner/spinner';
import useStyles from '../index.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.container} style={props.modalStyle}>
                {props.modalLoading && (
                    <div className={classes.loadingSpinner}>
                        <Spinner />
                    </div>
                )}
                {props.modal(props)}
                <div className={classes.buttons}>
                    <Button.Secondary onClick={() => { props.updateState({ modal: false, modalStyle: {} }) }}>
                        Close
                    </Button.Secondary>
                </div>
            </div>
        </div>
    )
}