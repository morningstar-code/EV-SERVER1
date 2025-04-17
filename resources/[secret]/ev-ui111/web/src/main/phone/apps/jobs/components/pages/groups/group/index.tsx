import React, { FunctionComponent } from "react";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";
import { Tooltip, Typography } from "@mui/material";

const Group: FunctionComponent<any> = (props) => {
    const group = props.group;
    const onClick = props.onClick;
    const isJoinable = group.status === 'idle' && group.size < group.capacity;

    return (
        <ComponentPaper>
            <ComponentIcon icon={group.public ? 'users' : 'users-slash'} />
            <ComponentDetails
                title={`${group.leader.first_name} ${group.leader.last_name}`}
                description={(
                    <div className="job-description-info">
                        <div className="request-to-join" onClick={isJoinable ? onClick : null}>
                            {isJoinable && (
                                <Tooltip title="Request to Join" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                    <div>
                                        <i className="fas fa-sign-in-alt fa-fw fa-sm" style={{ color: '#fff' }} />
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                        <div className="group-desc">
                            <Tooltip title="Capacity" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                <div>
                                    <i className="fas fa-people-arrows fa-fw fa-sm" style={{ color: '#fff' }} />
                                    <Typography variant="body2" style={{ color: '#fff' }}>
                                        {group.capacity}
                                    </Typography>
                                </div>
                            </Tooltip>
                            <Tooltip title="Current People" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                <div>
                                    <i className="fas fa-user fa-fw fa-sm" style={{ color: '#fff' }} />
                                    <Typography variant="body2" style={{ color: '#fff' }}>
                                        {group.size}
                                    </Typography>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                )}
            />
        </ComponentPaper>
    )
}

export default Group;