import { Typography } from "@mui/material";
import moment from "moment";
import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import { ComponentPaper } from "components/paper";
import { useSelector } from "react-redux";
import store from "./store";
import useStyles from "./container.styles";

const Container: FunctionComponent<any> = (props) => {
    const state = useSelector((state) => state[store.key]);
    const classes = useStyles();

    const [list, setList] = React.useState(state.list);

    React.useEffect(() => {
        setList(state.list);
    }, [state.list]);

    return (
        <AppContainer
            emptyMessage={list.length === 0}
            search={{
                filter: ['body', 'sender', 'subject'],
                list: state.list,
                onChange: setList,
            }}
        >
            {list && list.length > 0 && list.map((email, index) => (
                <ComponentPaper key={index}>
                    <div className={classes.wrapper}>
                        <div>
                            <Typography variant="body2">From: {email.sender}</Typography>
                        </div>
                        <div>
                            <Typography variant="body2">Subject: {email.subject}</Typography>
                        </div>
                        <div>
                            {email.body}
                        </div>
                        <div style={{ borderTop: '1px solid gray', marginTop: 8, paddingTop: 8 }}>
                            <Typography variant="body2" style={{ textAlign: 'center' }}>{moment(email.timestamp).fromNow()} </Typography>
                        </div>
                    </div>
                </ComponentPaper>
            ))}
        </AppContainer>
    )
}

export default Container;