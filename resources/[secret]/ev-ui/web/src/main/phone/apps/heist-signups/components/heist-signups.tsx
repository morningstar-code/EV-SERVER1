import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import Button from "components/button/button";
import Group from "./group";
import { ComponentPaper } from "components/paper";
import { ComponentDetails } from "components/component-details";
import { Typography } from "@mui/material";
import Gang from "./gang";
import { nuiAction } from "lib/nui-comms";

const HeistSignups: FunctionComponent<any> = (props) => {
    const primaryActions = [];
    const hasMembers = props.group && props.group.members && props.group.members.length > 0;

    if (hasMembers) {
        primaryActions.push({
            icon: 'sign-out-alt',
            onClick: async () => {
                nuiAction('ev-ui:heists:leaveGroup');
                props.getGroup();
            },
            title: 'Leave Group'
        });
    } else {
        primaryActions.push({
            icon: 'users',
            onClick: async () => {
                nuiAction('ev-ui:heists:createGroup');
                props.getGroup();
            },
            title: 'Create Group'
        });
    }

    return (
        <AppContainer
            primaryActions={primaryActions}
        >
            <div style={{ display: 'flex', padding: 16, paddingTop: 0, alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-piggy-bank fa-fw fa-3x" style={{ color: 'gold' }} />
            </div>
            {hasMembers && (
                <Group {...props} />
            )}
            {props.isManager && (
                <div style={{ display: 'flex', padding: 16, paddingTop: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <Button.Primary onClick={() => props.manageWeights()}>
                        Manage
                    </Button.Primary>
                </div>
            )}
            {props.isManager && props.managing && (
                <>
                    {props.gangs && props.gangs.length > 0 && props.gangs.map((gang: any) => (
                        <Gang key={gang.id} gang={gang} {...props} />
                    ))}
                </>
            )}
            {!props.managing && (
                <>
                    {props.heists && props.heists.length > 0 && props.heists.map((heist: any) => {
                        if (!(heist.hidden && props.heistLevel < heist.level)) {
                            let status = '';
                            const hours = Math.floor((heist.expires - Date.now()) / 1000 / 60 / 60);
                            const minutes = hours > 0 ? Math.floor((heist.expires - Date.now()) / 1000 / 60) % 60 : Math.floor((Date.now() + heist.expires - Date.now()) / 1000 / 60);
                            const expiryText = `Expires in: ${hours > 0 ? `${hours}h` : ''} ${minutes}m `;
                            let _0x322d1d = false;

                            if (heist.status === 'Available') {
                                status = 'Available';
                                _0x322d1d = true;
                            } else if (heist.status === 'Claimed') {
                                status = 'Claimed';
                            } else if (heist.status === 'Expired') {
                                status = 'Expired';
                            }

                            if (heist.queued && heist.status === 'Available') {
                                status = 'Queued';
                                _0x322d1d = true; //??
                            }

                            const heistActions = [];

                            if (status === 'Available' && props.heistLevel >= heist.level) {
                                heistActions.push({
                                    icon: 'hand-holding',
                                    title: 'Claim',
                                    onClick: () => { }
                                });
                            }

                            return (
                                <ComponentPaper key={heist.expires} actions={heistActions}>
                                    <ComponentDetails
                                        title={heist.name}
                                        description={(
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    <Typography variant="body2" style={{ color: '#fff' }}>
                                                        {_0x322d1d ? expiryText : ''}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="body2" style={{ color: '#fff' }}>
                                                        {status}
                                                    </Typography>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </ComponentPaper>
                            )
                        }
                    })}
                </>
            )}
        </AppContainer>
    )
}

export default HeistSignups;