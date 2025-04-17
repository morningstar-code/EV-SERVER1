import React from "react";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import store from "../../../store";
import Job from "./job";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Jobs extends React.Component<any, { searchValue: string }> {
    state = {
        searchValue: ''
    }

    getJobs = async () => {
        const results = await nuiAction('ev-ui:getJobCenterJobs', {}, { returnData: devData.getJobCenterJobs() });
        
        const copied = [...results.data];
        
        this.props.updateState({
            jobs: copied
        });
    }

    componentDidMount() {
        this.getJobs();
    }

    render() {
        return (
            <div className="jobs-container-inner">
                {this?.props?.jobs && this?.props?.jobs?.length > 0 && this?.props?.jobs?.map((job: any, index: number) => (
                    <Job key={job.id} job={job} onClick={() => {
                        nuiAction('ev-ui:setGPSMarker', {
                            coords: job.headquarters,
                            job: job
                        });
                    }} />
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);