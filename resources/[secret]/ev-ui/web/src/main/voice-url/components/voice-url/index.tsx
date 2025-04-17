import Button from "components/button/button";
import useStyles from "./index.styles";
import { Typography } from "@mui/material";

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.wrapper} onClick={props.copy}>
            {!props.copied && (
                <Typography variant="body1" style={{ color: 'white' }}>
                    Your Voice URL: <i className="fas fa-copy fa-fw fa-lg" style={{ color: 'white' }} />
                </Typography>
            )}
            {props.copied && (
                <Typography variant="body1" style={{ color: 'white' }}>
                    Copied!
                </Typography>
            )}
        </div>
    )
}