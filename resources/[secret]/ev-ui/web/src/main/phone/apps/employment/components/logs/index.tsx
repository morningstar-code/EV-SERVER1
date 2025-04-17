import { Tooltip, Typography } from "@mui/material";
import Input from "components/input/input";
import { fromNow } from "lib/date";
import { nuiAction } from "lib/nui-comms";
import AppContainer from "main/phone/components/app-container";
import { ComponentDetails } from "components/component-details";
import { ComponentIcon } from "components/component-icon";
import { ComponentPaper } from "components/paper";
import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";
import Text from "components/text/text";

const logTypes = {
    hire: 'Hired',
    fire: 'Fired',
    create_role: 'Created Role',
    delete_role: 'Deleted Role',
    edit_role: 'Edited Role',
    pay_employee: 'Paid Employee',
    pay_external: 'Paid External',
    charge_external: 'Charged External'
}

const Logs: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [search, setSearch] = React.useState('');
    const [logs, setLogs] = React.useState([]);

    const searchBusinessLogs = React.useCallback((logsArray, srch, types) => {
        return logsArray && logsArray.length > 0 && logsArray?.filter((log: any) => {
            for (let i = 0; i < types.length; i++) {
                const type = types[i];
                let l = log[type];

                type === 'event' && (l = logTypes[l]);

                if (l && l.toString().toLowerCase().includes(srch.toLowerCase())) {
                    return true;
                }
            }

            return false;
        }) || [];
    }, []);

    const getBusinessLogs = React.useCallback(async () => {
        if (props.activeBusiness === -1) return;

        const businessId = props?.activeBusiness?.code ?? null;

        const results = await nuiAction('ev-ui:businessGetLogs', {
            businessId: businessId
        }, {
            returnData: [
                {
                    event: 'fire',
                    invoker: 'Kevin Malagnaggi',
                    target: 'Jerry Padel',
                    role: 'Employee',
                    event_time: Date.now() / 1000
                }
            ]
        });

        if (results.meta.ok) {
            setLogs(results.data);
        }
    }, [props.activeBusiness]);

    React.useEffect(() => {
        props.showingLogs && getBusinessLogs();
    }, [getBusinessLogs, props.activeBusiness, props.showingLogs]);

    return (
        <AppContainer
            emptyMessage={logs.length === 0}
        >
            <div className={classes.searchContainer}>
                <Tooltip title="Go Back" placement="right" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                    <div className={classes.backButton} onClick={() => props.updateState({ page: 1, showingLogs: false })}>
                        <i className="fas fa-chevron-left fa-fw fa-lg" style={{ color: 'white' }} />
                    </div>
                </Tooltip>
                <Input.Search
                    onChange={(value: any) => setSearch(value)}
                    value={search}
                    style={{ width: '100%' }}
                />
            </div>
            {logs && searchBusinessLogs(logs, search, [
                'event',
                'invoker',
                'target'
            ]).map((log: any, index: number) => {
                const getLogTypes = (function (businessLog) {
                    const businessLogType = logTypes[businessLog.event];

                    switch (businessLogType) {
                        case logTypes.create_role:
                        case logTypes.delete_role:
                        case logTypes.edit_role:
                            return [
                                'users',
                                <div>
                                    <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>
                                        {businessLog.invoker}
                                    </Typography>
                                    <Typography variant="body2" style={{ color: 'white' }}>
                                        {businessLogType} "<Text variant="body2" style={{ display: 'inline-block', fontWeight: 'bold' }}>{businessLog.role}</Text>"
                                    </Typography>
                                </div>
                            ]
                        case logTypes.pay_employee:
                        case logTypes.pay_external:
                        case logTypes.charge_external:
                            return [
                                'dollar-sign',
                                <div>
                                    <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>
                                        {businessLog.invoker}
                                    </Typography>
                                    <Typography variant="body2" style={{ color: 'white' }}>
                                        {businessLogType} <Typography variant="body2" style={{ color: 'white', display: 'inline-block', fontWeight: 'bold' }}>{businessLog.target} </Typography>
                                    </Typography>
                                    <Typography variant="body2" style={{ color: 'green', fontWeight: 'bold' }}>
                                        ${businessLog.amount}
                                    </Typography>
                                </div>
                            ]
                        case logTypes.hire:
                        case logTypes.fire:
                            return [
                                logTypes.hire === businessLogType ? 'user-plus' : 'user-minus',
                                <div>
                                    <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>
                                        {businessLog.invoker}
                                    </Typography>
                                    <Typography variant="body2" style={{ color: 'white' }}>
                                        {businessLogType} <Typography variant="body2" style={{ color: 'white', display: 'inline-block', fontWeight: 'bold' }}>{businessLog.target} as {businessLog.role}</Typography>
                                    </Typography>
                                </div>
                            ]
                        default:
                            return [
                                'book-open',
                                <div>
                                    <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>
                                        {businessLog.invoker}
                                    </Typography>
                                    <Typography variant="body2" style={{ color: 'white' }}>
                                        {businessLogType} <Typography variant="body2" style={{ color: 'white', display: 'inline-block', fontWeight: 'bold' }}>{businessLog.target}</Typography>
                                    </Typography>
                                </div>
                            ]
                    }
                })(log);

                const [icon, title] = getLogTypes;

                return (
                    <ComponentPaper key={index}>
                        <ComponentIcon icon={icon} />
                        <ComponentDetails
                            title={title}
                            description={(
                                <Typography variant="subtitle2" style={{ color: 'white' }}>
                                    {fromNow(log.event_time)}
                                </Typography>
                            )}
                        />
                    </ComponentPaper>
                )
            })}
        </AppContainer>
    )
}

export default Logs;