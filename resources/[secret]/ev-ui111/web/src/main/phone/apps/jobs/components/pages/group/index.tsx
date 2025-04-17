import React from "react";
import { compose, storeObj } from "lib/redux";
import { connect } from "react-redux";
import store from "../../../store";
import { Typography } from "@mui/material";
import Button from "components/button/button";
import Member from "./member";
import "./group.scss";
import "./ripple.scss";
import { nuiAction } from "lib/nui-comms";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            character: state.character
        }
    }
});

class Group extends React.Component<any, { searchValue: string }> {
    state = {
        searchValue: ''
    }

    groupAction = async (action: string, extraData = {}) => {
        await nuiAction(action, {
            ...extraData,
            group_id: this.props.group.id,
            character_id: this.props.character
        });
    }

    render() {
        //const character = storeObj.getState().character;
        const isGroupLeader = this.props.character.id === this.props.group.members.find((member: any) => member.is_leader).id;
        const isGroupReady = this.props.group.ready;

        const buttons = [];

        if (isGroupLeader) {
            buttons.push({
                icon: isGroupReady ? 'pause-circle' : 'play-circle',
                label: isGroupReady ? 'Not Ready for Jobs' : 'Ready for Jobs',
                onClick: () => this.groupAction(`ev-ui:jobCenterGroup${isGroupReady ? 'NotReady' : 'Ready'}`)
            });
            buttons.push({
                icon: 'users-slash',
                label: "Disband Group",
                onClick: () => this.groupAction('ev-ui:jobCenterGroupDisband')
            });
        } else {
            buttons.push({
                icon: 'user-minus',
                label: "Leave Group",
                onClick: () => this.groupAction('ev-ui:jobCenterGroupLeave')
            });
        }

        return (
            <div className="job-group-members">
                {!!isGroupReady && (
                    <div className="waiting-for-activity">
                        <div className="component-ripple-effect">
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <Typography variant="body1" style={{ color: '#fff' }}>
                            Waiting for Job...
                        </Typography>
                    </div>
                )}
                <div className="member-list-cont">
                    <div className="member-list">
                        <div className="text-wrapper">
                            <Typography variant="body1" style={{ color: '#fff' }}>
                                Leader
                            </Typography>
                        </div>
                        {this?.props?.group?.members && this?.props?.group?.members?.length > 0 && this?.props?.group?.members?.filter(member => member.is_leader)?.map((member: any) => (
                            <Member key={member.id} action={this.groupAction} leader={true} leaderIsMe={isGroupLeader} member={member} />
                        ))}
                    </div>
                    {this?.props?.group?.members && this?.props?.group?.members?.length > 0 && this?.props?.group?.members?.filter(member => !member.is_leader).length > 0 && (
                        <div className="member-list">
                            <div className="text-wrapper">
                                <Typography variant="body1" style={{ color: '#fff' }}>
                                    Members
                                </Typography>
                            </div>
                            {this?.props?.group?.members && this?.props?.group?.members?.length > 0 && this?.props?.group?.members?.filter(member => !member.is_leader)?.map((member: any) => (
                                <Member key={member.id} action={this.groupAction} leader={false} leaderIsMe={isGroupLeader} member={member} />
                            ))}
                        </div>
                    )}
                </div>
                {buttons.map((button) => (
                    <div key={button.label} className="mygroup-action">
                        <Button.Primary onClick={button.onClick}>
                            {button.label}
                        </Button.Primary>
                    </div>
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);