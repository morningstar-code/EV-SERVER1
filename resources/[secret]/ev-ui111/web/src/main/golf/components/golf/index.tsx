import useStyles from "./index.styles";
import { useSelector } from "react-redux";
import store from "../../store";

export default (props: any) => {
    const powerBarProgress = useSelector((state: any) => state[store.key].powerBarProgress);
    const classes = useStyles(props);

    return (
        <div id="powerbar_container" className={classes.container} style={{ visibility: props.show ? 'visible' : 'hidden' }}>
            <div className={classes.text} id="powerbar_text">
                Swing Power
            </div>
            <div className={classes.power} id="powerbar_power" style={{ width: `${powerBarProgress}%` }}></div>
        </div>
    )
}