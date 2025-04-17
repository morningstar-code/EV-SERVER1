import React from "react";
import AppContainer from "main/phone/components/app-container";
import store from "./store";
import { connect } from "react-redux";
import { compose } from "lib/redux";
import Jobs from "./components/pages/jobs";
import Groups from "./components/pages/groups";
import Group from "./components/pages/group";
import Activity from "./components/pages/activity";
import "./jobs.scss";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any, { searchValue: string }> {
    jobs = void 0;

    state = {
        searchValue: ''
    }

    render() {
        let search = null;

        if (!this.jobs && this?.props?.jobs?.length > 0) {
            this.jobs = this.props.jobs;
        }

        if (!this.props.job) {
            search = {
                filter: ['name'],
                list: this.jobs,
                onChange: (e) => {
                    this.props.updateState({
                        jobs: e
                    });
                }
            }
        }

        return (
            <AppContainer
                search={search}
            >
                <div className="jobs-container">
                    {this.props.job === "none" && ( //!this.props.job //temp solution
                        <Jobs />
                    )}
                    {this.props.job !== "none" && this.props.group === "none" && ( //!!this.props.job && !this.props.group //temp solution
                        <Groups />
                    )}
                    {this.props.activity === "none" && this.props.group !== "none" && ( //!this.props.activity && !!this.props.group //temp solution
                        <Group />
                    )}
                    {this.props.activity !== "none" && ( //!!this.props.activity //temp solution
                        <Activity />
                    )}
                </div>
            </AppContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);