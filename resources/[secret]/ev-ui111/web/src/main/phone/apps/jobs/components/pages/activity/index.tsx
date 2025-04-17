import React from "react";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import store from "../../../store";
import { Tooltip, Typography } from "@mui/material";
import DurationTimer from "components/duration-timer";
import Timeline from '@mui/lab/Timeline';
import Task from "./task";
import "./activity.scss";
import { nuiAction } from "lib/nui-comms";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Activity extends React.Component<any, { searchValue: string }> {
    state = {
        searchValue: ''
    }

    render() {
        //countdown
        const startTime = this.props.activity.deadline / 1000; //Turns milliseconds into seconds

        return (
            <div className="activity-container">
                <div className="activity-title">
                    <div>
                        <Typography variant="body1" style={{ color: '#fff' }}>
                            {this.props.activity.name}
                        </Typography>
                    </div>
                    <div className="timer">
                        <div className="abandon-holder">
                            <Tooltip title="Abandon Job" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                <div onClick={() => {
                                    nuiAction('ev-ui:jobCenterActivityAbandon', {
                                        activity: this.props.activity,
                                        character: this.props.character
                                    });
                                }}>
                                    <i className="fas fa-times-circle fa-fw fa-sm" style={{ color: '#fff' }} />
                                </div>
                            </Tooltip>
                        </div>
                        <div className="spacer"></div>
                        <div>
                            <DurationTimer
                                countdown={true}
                                startTime={startTime}
                                withHour={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="task-list">
                    <Timeline>
                        {this.props.activity.tasks.map((task: any) => (
                            <Task key={task.id} task={task} />
                        ))}
                    </Timeline>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);