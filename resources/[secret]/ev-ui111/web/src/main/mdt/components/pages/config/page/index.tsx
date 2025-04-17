import React from 'react';
import { Paper, Tab, Tabs } from '@mui/material';
import useStyles from '../index.styles';
import { isEnvBrowser } from 'utils/misc';
import Input from 'components/input/input';
import Button from 'components/button/button';
import { getMdtOfficers, updateMdtState } from 'main/mdt/actions';
import ConfigData from './components/data';
import ConfigPermissionsModal from 'main/mdt/components/modals/config-permissions-modal';

export const masterSteamId = ['steam:1100001429eb87b'];
export default (props: any) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);

    return (
        <div className={classes.wrapper}>
            <Paper square={true}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, v) => setSelectedTab(v)}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered={true}
                >
                    <Tab label="Badges" />
                    <Tab label="Reports" />
                    <Tab label="Tags" />
                    <Tab label="Staff" />
                    <Tab label="Permissions" />
                    <Tab label="Charges" />
                </Tabs>
            </Paper>
            <div className={classes.pageWrapper}>
                {selectedTab === 0 && (
                    <div className={classes.configPage}>
                        <div>
                            <div className={classes.badgeCreator}>
                                <Input.Select
                                    items={getMdtOfficers().map((officer: any) => {
                                        return {
                                            id: officer.character_id,
                                            name: officer.name
                                        }
                                    })}
                                    label="Officer"
                                    onChange={(value: any) => props.changeStateValue('changeOfficerValue', value)}
                                    value={props.changeOfficerValue}
                                />
                                <br />
                                <br />
                                <Button.Primary onClick={props.createOfficerBadge}>
                                    Create
                                </Button.Primary>
                            </div>
                            {masterSteamId.includes(props.permissions.steam_id) || isEnvBrowser() && (
                                <div style={{ marginTop: 32 }}>
                                    <Input.Text
                                        label="Item"
                                        icon="microscope"
                                        onChange={(value: any) => props.changeStateValue('changeIValue', value)}
                                        value={props.changeIValue}
                                    />
                                    <br />
                                    <Input.Text
                                        label="Item"
                                        icon="microscope"
                                        onChange={(value: any) => props.changeStateValue('changeInfoValue', value)}
                                        value={props.changeInfoValue}
                                    />
                                    <br />
                                    <Button.Primary onClick={props.createItem}>
                                        Create
                                    </Button.Primary>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {selectedTab === 1 && (
                    <div className={classes.configPage}>
                        <ConfigData
                            defaultObject={{
                                name: '',
                                description: '',
                                template: ''
                            }}
                            title="Categories"
                            sqlTable="_mdt_report_category"
                            returnData={[
                                {
                                    id: 1,
                                    name: 'Hello',
                                    description: 'moto',
                                    template: '#some shit',
                                },
                                {
                                    id: 2,
                                    name: 'Hello',
                                    description: 'moto',
                                    template: '#some shit',
                                },
                                {
                                    id: 3,
                                    name: 'Hello',
                                    description: 'moto',
                                    template: '#some shit',
                                },
                                {
                                    id: 4,
                                    name: 'Hello',
                                    description: 'moto',
                                    template: '#some shit',
                                }
                            ]}
                        />
                    </div>
                )}
                {selectedTab === 2 && (
                    <div className={classes.configPage}>
                        <ConfigData
                            defaultObject={{
                                name: '',
                                color: '',
                                color_text: '',
                                icon: ''
                            }}
                            title="Categories"
                            sqlTable="_mdt_tag_category"
                            returnData={[
                                {
                                    id: 1,
                                    name: 'other',
                                    color: 'white',
                                    color_text: 'black',
                                    icon: 'microscope',
                                }
                            ]}
                            description="Colors: https://www.materialui.co/colors - Icons: https://fontawesome.com/icons?d=gallery&m=free"
                        />
                    </div>
                )}
                {selectedTab === 3 && (
                    <div className={classes.configPage}>
                        <ConfigData
                            defaultObject={{
                                name: ''
                            }}
                            title="Departments"
                            sqlTable="_mdt_department"
                            returnData={[
                                {
                                    id: 1,
                                    name: 'LSPD',
                                }
                            ]}
                        />
                        <ConfigData
                            defaultObject={{
                                name: ''
                            }}
                            title="Ranks"
                            sqlTable="_mdt_rank"
                            returnData={[
                                {
                                    id: 1,
                                    name: 'Sergeant',
                                }
                            ]}
                        />
                        <ConfigData
                            useCharacterId={true}
                            defaultObject={{
                                character_id: 0,
                                alias: '',
                                callsign: '',
                                department_id: 1,
                                rank_id: 1,
                                profile_image_url: '',
                                phone_number: ''
                            }}
                            title="Officer Profiles"
                            sqlTable="_mdt_profile_officer"
                            returnData={[
                                {
                                    character_id: 1,
                                    alias: 'Whatever',
                                    callsign: 'WGAT',
                                    department_id: 1,
                                    rank_id: 1,
                                    profile_image_url: '123',
                                    phone_number: '321',
                                }
                            ]}
                        />
                    </div>
                )}
                {selectedTab === 4 && (
                    <div className={classes.configPage}>
                        <ConfigData
                            defaultObject={{
                                name: '',
                                icon: '',
                                color: 'white',
                                color_text: 'black'
                            }}
                            title="Roles"
                            sqlTable="_mdt_profile_officer_role"
                            returnData={[
                                {
                                    id: 1,
                                    name: 'JTF',
                                    icon: 'anonymous',
                                    color: 'white',
                                    color_text: 'black',
                                },
                                {
                                    id: 2,
                                    name: 'Copper',
                                    icon: 'anonymous',
                                    color: 'white',
                                    color_text: 'black',
                                }
                            ]}
                            extraButton={{ //THIS CONROLS HASMDTPERMISSIONS
                                label: 'Permissions',
                                onClick: (data: any) => {
                                    const roleId = data.id;
                                    updateMdtState({
                                        modal: (state: any) => {
                                            return (
                                                <ConfigPermissionsModal
                                                    {...state}
                                                    roleId={roleId}
                                                />
                                            )
                                        }
                                    });
                                }
                            }}
                        />
                        <ConfigData
                            defaultObject={{
                                profile_id: 0,
                                role_id: 0
                            }}
                            title="Staff Roles"
                            sqlTable="_mdt_role_access"
                            returnData={[
                                {
                                    id: 1,
                                    profile_id: 1,
                                    role_id: 1,
                                }
                            ]}
                        />
                    </div>
                )}
                {selectedTab === 5 && (
                    <div className={classes.configPage}>
                        <ConfigData
                            defaultObject={{
                                name: ''
                            }}
                            title="Categories"
                            sqlTable="_mdt_charge_category"
                            returnData={[
                                {
                                    id: 1,
                                    name: 'Hello',
                                },
                                {
                                    id: 2,
                                    name: 'Hello',
                                },
                                {
                                    id: 3,
                                    name: 'Hello',
                                },
                                {
                                    id: 4,
                                    name: 'Hello',
                                }
                            ]}
                        />
                        <ConfigData
                            defaultObject={{
                                charge_category_id: 1,
                                name: '',
                                description: '',
                                time: 0,
                                fine: 0,
                                points: 0,
                                felony: 0,
                                held_until_trial: 0,
                                deny_parole: 0,
                                accessorized: 0,
                                accessory_description: '',
                                accessory_time: 0,
                                accessory_fine: 0,
                                accessory_points: 0,
                                accessory_felony: 0,
                                accessory_held_until_trial: 0,
                                accessory_deny_parole: 0
                            }}
                            title="Charges"
                            sqlTable="_mdt_charge"
                            returnData={[
                                {
                                    id: 1,
                                    charge_category_id: 1,
                                    name: 'Calling it the MDT',
                                    description: 'Calling it the MDT',
                                    time: 10,
                                    fine: 10,
                                    points: 10,
                                    felony: 0,
                                    held_until_trial: 0,
                                    deny_parole: 0,
                                    accessorized: 0,
                                    accessory_description: 'Calling it the MDT',
                                    accessory_time: 0,
                                    accessory_fine: 0,
                                    accessory_points: 0,
                                    accessory_felony: 0,
                                    accessory_held_until_trial: 0,
                                    accessory_deny_parole: 0,
                                }
                            ]}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}