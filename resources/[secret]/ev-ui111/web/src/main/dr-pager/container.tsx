import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import DrPager from "./components/dr-pager";

class Container extends React.Component<any> {
    state = {
        mount: false,
        hospital: ''
    }

    onEvent = (data: any) => {
        this.setState({
            mount: true,
            hospital: data.hospital
        });

        setTimeout(() => {
            return this.setState({
                mount: false,
                hospital: ''
            });
        }, 10000);
    }

    render() {
        return (
            <AppWrapper
                name="drpager"
                onEvent={this.onEvent}
            >
                {this.state.mount && (
                    <DrPager hospital={this.state.hospital} />
                )}
            </AppWrapper>
        );
    }
}

export default Container;