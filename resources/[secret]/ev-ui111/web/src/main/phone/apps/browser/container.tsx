import React from "react";
import AppContainer from "main/phone/components/app-container";
import "./browser.scss";

class Container extends React.Component<any> {
    render() {
        return (
            <AppContainer
                removePadding={true}
            >
                <div className="browser-wrapper">
                    <iframe title="subliminalrp" src="https://www.subliminalrp.net" />
                </div>
            </AppContainer>
        )
    }
}

export default Container;