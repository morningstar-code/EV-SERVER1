import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import { nuiAction } from "lib/nui-comms";
import useStyles from "./doj.styles";
import { isJob } from "lib/character";
import Input from "components/input/input";
import { Typography } from "@mui/material";
import { callStart } from "../../call-history/events";

const DOJ: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [list, setList] = React.useState(props.list);
    const [status, changeStatus] = React.useState(props.status);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    const setStatus = async (status: string) => {
        await nuiAction('ev-ui:setDOJStatus', { status });
        changeStatus(status);
    }

    const listThings = {
        Lawyer: list.filter(i => i.job === 'defender'),
        Judge: list.filter(i => i.job === 'judge'),
        Clerk: list.filter(i => i.job === 'county_clerk'),
        Mayor: list.filter(i => i.job === 'mayor'),
        'Deputy Mayor': list.filter(i => i.job === 'deputy_mayor'),
        'Legal Aid': list.filter(i => i.job === 'legal_aid'),
    }

    return (
        <AppContainer
            emptyMessage={list.length === 0}
            search={{
                filter: ['name'],
                list: props.list,
                onChange: setList
            }}
        >
            {isJob(['judge', 'defender', 'county_clerk', 'mayor', 'deputy_mayor']) && (
                <div>
                    <div style={{ textAlign: 'left', marginTop: 8, marginBottom: 8 }}>
                        <Input.Select
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e)}
                            items={[
                                {
                                    id: 'Available',
                                    name: 'Available',
                                },
                                {
                                    id: 'In Trial',
                                    name: 'In Trial',
                                },
                                {
                                    id: 'Busy',
                                    name: 'Busy',
                                }
                            ]}
                        />
                    </div>
                </div>
            )}
            {Object.keys(listThings).filter(key => !!listThings[key].length).map((key) => (
                <div key={key} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid white' }}>
                    <Typography variant="body1" style={{ color: '#fff', marginBottom: 8 }}>
                        {key}(s)
                    </Typography>
                    {listThings[key].map((item, i) => (
                        <div key={i} className={classes.nameWrapper}>
                            <Typography variant="body2" style={{ color: '#fff' }}>
                                {item.name}
                            </Typography>
                            <Typography variant="body2" style={{ color: '#fff' }}>
                                {item.status}
                            </Typography>
                            <div onClick={() => callStart({ number: item.phone })}>
                                <i className="fas fa-phone fa-fw fa-lg" style={{ color: 'white' }} />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </AppContainer>
    )
}

export default DOJ;