import { Typography } from "@mui/material";
import useStyles from "./index.styles";

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <video
                className={classes.video}
                autoPlay={true}
                loop={true}
                src="https://gta-assets.subliminalrp.net/videos/LSBN.webm"
            />
            <div className={classes.bb}></div>
            <div className={classes.bbMiddle}>
                {props.overlayText && (
                    <Typography variant="body1" style={{ color: 'white' }}>
                        <div className={classes.overlayText}>
                            {props.overlayText}
                        </div>
                    </Typography>
                )}
            </div>
        </div>
    )
}