import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import Button from "components/button/button";
import { useSelector } from "react-redux";
import useStyles from "./index.styles";
import Member from "./member";
import { closePhoneModal, openPhoneModal, setPhoneModalLoading } from "main/phone/actions";
import InviteModal from "../invite-modal";
import { nuiAction } from "lib/nui-comms";

const Group: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const character = useSelector((state: any) => state.character);
    const leaderIsMe = character.id === props.group.members.find(member => member.isLeader).characterId;

    return (
        <div className={classes.container}>
            <div>
                {props.group.members.length > 0 && (
                    <div className="member-list">
                        <div className="text-wrapper">
                            <Typography variant="body1" style={{ color: '#fff' }}>
                                Members
                            </Typography>
                        </div>
                        {props.group.members.map((member: any) => (
                            <Member key={member.id} leaderIsMe={leaderIsMe} member={member} getGroup={props.getGroup} />
                        ))}
                    </div>
                )}
                <div className={classes.actions}>
                    {leaderIsMe && props.group.heistActive && (
                        <div className={classes.actionsLeft}>
                            <Button.Secondary onClick={() => {
                                setPhoneModalLoading();

                                nuiAction('ev-ui:heists:stop');

                                props.getGroup();

                                closePhoneModal();
                            }}>
                                Stop Heist
                            </Button.Secondary>
                        </div>
                    )}
                    {props.group.members.length < 6 && (
                        <div className={classes.actionsRight}>
                            <Button.Primary onClick={() => {
                                openPhoneModal(
                                    <InviteModal groupId={props.group.id} />
                                )
                            }}>
                                Invite
                            </Button.Primary>
                        </div>
                    )}
                </div>
                <br />
            </div>
        </div>
    )
}

export default Group;