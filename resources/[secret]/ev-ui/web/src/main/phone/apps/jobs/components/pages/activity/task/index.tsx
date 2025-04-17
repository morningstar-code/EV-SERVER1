import React, { FunctionComponent } from "react";
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import { ComponentPaper } from "components/paper";
import Checkmark from "components/checkmark/checkmark";
import { Typography } from "@mui/material";
import Tracked from "./tracked";

const Task: FunctionComponent<any> = (props) => {
    const task = props.task;
    const completed = task.wanted === task.count;

    return (
        <div className="activity-task-paper-wrapper">
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: completed ? '#009688' : '#3F51B5' }} />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <ComponentPaper className="activity-task-paper-wrapper">
                        <div className="activity-task-wrapper">
                            {completed && (
                                <div className="checkmark-wrapper">
                                    <Checkmark />
                                </div>
                            )}
                            <div className="task-name">
                                <Typography variant="body2" className={completed ? 'completed' : ''}>
                                    {task.description}
                                </Typography>
                            </div>
                            {!completed && (
                                <div className="progress">
                                    <Typography variant="body1" style={{ color: '#fff' }}>
                                        {task.count} / {task.wanted}
                                    </Typography>
                                </div>
                            )}
                            {task?.tracked && task?.tracked?.length > 0 && task?.tracked?.map((t: any) => (
                                <Tracked
                                    key={t.id}
                                    tracked={t}
                                />
                            ))}
                        </div>
                    </ComponentPaper>
                </TimelineContent>
            </TimelineItem>
        </div>
    )
}

export default Task;