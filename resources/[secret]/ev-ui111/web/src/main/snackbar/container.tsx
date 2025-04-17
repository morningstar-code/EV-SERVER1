import { Snackbar } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import AppWrapper from "components/ui-app/ui-app";
import { setShowSnackbar } from "./actions";
import AlertComponent from "./components/alert/alert";
import store from "./store";

const App: FunctionComponent<any> = () => {
    const state: SnackbarState = useSelector((state) => state[store.key]);

    return (
        <AppWrapper
            name="snackbar"
        >
            <Snackbar
                open={state.open}
                autoHideDuration={state.timeout}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <div>
                    <AlertComponent
                        onClose={() => setShowSnackbar(false)}
                        severity={state.type}
                    >
                        {state.message}
                    </AlertComponent>
                </div>
            </Snackbar>
        </AppWrapper>
    )
}

export default App;