import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import AppContainer from "main/phone/components/app-container";
import { ComponentPaper } from "components/paper";
import { ComponentDrawer } from "components/component-drawer";
import useStyles from "./index.styles";
import { Typography } from "@mui/material";
import { formatCurrency } from "lib/format";
import { fromNow } from "lib/date";
import { openPhoneModal } from "main/phone/actions";
import SendMoneyModal from "./send-money-modal";

const Wenmo: FunctionComponent<any> = (props) => {
    const character = useSelector((state: any) => state.character);
    const classes = useStyles();
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    const primaryActions: any = [
        {
            icon: "hand-holding-usd",
            title: "Send Money",
            onClick: () => {
                openPhoneModal(
                    <SendMoneyModal {...props} />
                )
            }
        }
    ];

    return (
        <AppContainer
            primaryActions={primaryActions}
            emptyMessage={list.length === 0}
            search={{
                filter: ['from_civ_name', 'to_civ_name', 'from_account_id', 'to_account_id'],
                list: props.list,
                onChange: setList
            }}
        >
            {list.map((item: any) => {
                return (

                    <ComponentPaper
                        key={item.id}
                        drawer={(
                            <ComponentDrawer items={[{
                                icon: 'comment',
                                text: item.comment
                            },
                            {
                                icon: 'calendar', //item.date is in seconds
                                text: new Date(item.date * 1000).toLocaleString()
                            },
                            ]} />
                        )}
                    >
                        <div style={{ width: '100%' }}>
                            <div className={classes.top}>
                                <Typography variant="body2" className={item.direction}>
                                    {item.direction === 'in' ? '' : '-'}{formatCurrency(item.amount)}
                                </Typography>
                                <Typography variant="body2" style={{ color: '#fff' }}>
                                    {item.direction === 'in' ? item.from_civ_name : item.to_civ_name}
                                </Typography>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <Typography variant="body2" style={{ color: '#fff' }}>
                                    {fromNow(item.date)}
                                </Typography>
                            </div>
                        </div>
                    </ComponentPaper>
                )
            })}
        </AppContainer>
    )
}

export default Wenmo;