import React, { FunctionComponent } from "react";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";
import { Rating, Tooltip, Typography } from "@mui/material";
import { ComponentDetailsAux } from "components/component-details-aux";

const Job: FunctionComponent<any> = (props) => {
    const job = props.job;
    const onClick = props.onClick;

    return (
        <ComponentPaper
            actions={[
                {
                    icon: 'map-marked',
                    title: 'Set GPS Location',
                    onClick: onClick
                }
            ]}
        >
            <ComponentIcon icon={job.icon} />
            <ComponentDetails
                title={job.vpn ? (
                    <Typography variant="body2" style={{ color: '#fff' }}>
                        <i className="fas fa-user-secret fa-fw fa-lg" /> {job.name}
                    </Typography>
                ) : (
                    <Typography variant="body2" style={{ color: '#fff' }}>
                        {job.name}
                    </Typography>
                )}
                description={(
                    <div className="job-description-paygrade">
                        <Rating
                            defaultValue={job.pay_grade}
                            value={job.pay_grade}
                            disabled={true}
                            icon={<i className="fas fa-dollar-sign" style={{ color: '#76FF03' }} />}
                            emptyIcon={<i className="fas fa-dollar-sign" style={{ color: '#9E9E9E' }} />}
                            name="dollar-dollar"
                            precision={0.1} //1
                            size="small"
                            classes={{
                                iconEmpty: '#9E9E9E',
                                iconFilled: '#76FF03'
                            }}
                        />
                    </div>
                )}
            />
            <ComponentDetailsAux>
                <div className="job-description-info">
                    <Tooltip title="Groups" placement="right" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div>
                            <Typography variant="body2" style={{ color: '#fff' }}>
                                {job.groups ?? 0}
                            </Typography>
                            <i className="fas fa-people-arrows fa-fw fa-sm" style={{ color: '#fff' }} />
                        </div>
                    </Tooltip>
                    <Tooltip title="Employees" placement="right" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div>
                            <Typography variant="body2" style={{ color: '#fff' }}>
                                {job.employees ?? 0}
                            </Typography>
                            <i className="fas fa-user fa-fw fa-sm" style={{ color: '#fff' }} />
                        </div>
                    </Tooltip>
                </div>
            </ComponentDetailsAux>
        </ComponentPaper>
    )
}

export default Job;