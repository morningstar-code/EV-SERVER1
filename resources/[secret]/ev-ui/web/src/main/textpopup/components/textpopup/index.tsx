import Button from "components/button/button";
import useStyles from "./index.styles";

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputs}>
                <pre className={classes.text}>
                    {props.text}
                </pre>
            </div>
            <div className={classes.button}>
                <Button.Primary onClick={props.copyToClipboard}>
                    Copy
                </Button.Primary>
            </div>
        </div>
    )
}