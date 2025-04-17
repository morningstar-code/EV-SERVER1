import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import AppWrapper from "components/ui-app/ui-app";
import { isEnvBrowser } from "utils/misc";
import Log from "./components/log";
import store from "./store";
import "./debug-logs.scss";

const App: FunctionComponent = () => {
    const state = useSelector((state) => state[store.key]);
    const [show, setShow] = React.useState(true);

    if (!isEnvBrowser) {
        return null
    }

    const onEvent = (data: { display: boolean }) => {
        setShow(data.display);
    }

    return (
        <>
            {isEnvBrowser() && show ? (
                <AppWrapper
                    name="debuglogs"
                    onEvent={onEvent}
                >
                    {show && (
                        <div className="debug-logs-wrapper" tabIndex={-1}>
                            <div className="inner">
                                {state.debugLog.log.reverse().map((log, index) => (
                                    <Log key={Math.random()} log={log} />
                                ))}
                            </div>
                        </div>
                    )}
                </AppWrapper>
            ) : null}
        </>
    )
}

export default App;