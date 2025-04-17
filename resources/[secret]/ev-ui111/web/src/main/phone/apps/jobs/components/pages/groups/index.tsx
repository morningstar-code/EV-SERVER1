import React from "react";
import { compose, storeObj } from "lib/redux";
import { connect } from "react-redux";
import store from "../../../store";
import { Typography } from "@mui/material";
import Button from "components/button/button";
import Group from "./group";
import "./groups.scss";
import { nuiAction } from "lib/nui-comms";
import { DoPhoneNotification } from "main/phone/components/notifications/events";
import DurationTimer from "components/duration-timer";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Groups extends React.Component<any, { searchValue: string }> {
    inflight = 0;

    state = {
        searchValue: ''
    }

    createGroup = async () => {
        const requestId = this.props.requestId + 1;
        if (this.inflight !== requestId) {
            this.inflight = requestId;
            DoPhoneNotification({
                apps: [],
                appName: 'jobs',
                icon: {
                    background: '#90CAF9',
                    color: 'white',
                    name: 'people-carry'
                },
                id: `groups_${requestId}`,
                state: storeObj.getState(),
                timeout: 1000,
                title: 'Creating Group',
                text: 'Please wait...'
            });
            await nuiAction('ev-ui:createJobCenterGroup', {
                requestId: requestId,
                character: this.props.character
            }, { returnData: { group_id: 1 } });
            this.props.updateState({ requestId: requestId });
        }
    }

    checkout = async () => {
        await nuiAction('ev-ui:jobCenterCheckout');
        this.props.updateState(store.initialState);
    }

    requestToJoin = async (group: any) => {
        const requestId = this.props.requestId + 1;
        if (this.inflight !== requestId) {
            this.inflight = requestId;
            nuiAction('ev-ui:requestToJoinJobCenterGroup', {
                group: group,
                requestId: requestId,
                character: this.props.character
            });
            DoPhoneNotification({
                apps: [],
                appName: 'jobs',
                icon: {
                    background: '#90CAF9',
                    color: 'white',
                    name: 'people-carry'
                },
                id: `groups_${requestId}`,
                onReject: () => {
                    nuiAction('ev-ui:requestToJoinJobCenterGroupCancel', {
                        group: group,
                        requestId: requestId,
                        character: this.props.character
                    });
                },
                onRejectText: 'Cancel',
                state: storeObj.getState(),
                timeout: 30000,
                title: 'Requesting to Join',
                text: <DurationTimer countdown={true} startTime={30} />
            });
            setTimeout(() => {
                this.props.updateState({ requestId: requestId });
            }, 1000);
        }
    }

    render() {
        const idleGroups = this.props.groups.filter((group: any) => group.status === 'idle');
        const busyGroups = this.props.groups.filter((group: any) => group.status !== 'idle');

        return (
            <div className="job-groups">
                <div className="group-list">
                    <div className="text-wrapper">
                        <Typography variant="body1" style={{ color: '#fff' }}>
                            Join an idle group or browse groups currently busy
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button.Primary onClick={this.createGroup}>
                                Create Group
                            </Button.Primary>
                            <Button.Secondary onClick={this.checkout}>
                                Checkout
                            </Button.Secondary>
                        </div>
                    </div>
                </div>
                <hr />

                {idleGroups && idleGroups?.length > 0 && (
                    <div className="group-list">
                        <div className="text-wrapper">
                            <Typography variant="body1" style={{ color: '#fff' }}>
                                Idle
                            </Typography>
                        </div>
                        {idleGroups && idleGroups.map((group: any) => (
                            <Group key={group.id} group={group} onClick={() => this.requestToJoin(group)} />
                        ))}
                    </div>
                )}
                {busyGroups && busyGroups?.length > 0 && (
                    <div className="group-list">
                        <div className="text-wrapper">
                            <Typography variant="body1" style={{ color: '#fff' }}>
                                Busy
                            </Typography>
                        </div>
                        {busyGroups && busyGroups?.map((group: any) => (
                            <Group key={group.id} group={group} onClick={() => { }} />
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);