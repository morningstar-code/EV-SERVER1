import React, { FunctionComponent } from "react";
import AppWrapper from "components/ui-app/ui-app";
import { updateCharacterState } from "./actions";

const App: FunctionComponent = () => {
    const onEvent = (data: OnEventPayload) => {
        if (data !== undefined) {
            updateCharacterState({
                ...data
            });
        }
    }

    return (
        <AppWrapper
            center
            name="character"
            onEvent={onEvent}
        >
        </AppWrapper>
    )
}

export default App;