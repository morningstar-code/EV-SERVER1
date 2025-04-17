import React from 'react';
import Content from 'main/mdt/components/content';
import Paper from 'main/mdt/components/paper';
import useStyles from '../../../index.styles';
import Spinner from 'components/spinner/spinner';
import { isJob } from 'lib/character';
import Input from 'components/input/input';
import { Typography } from '@mui/material';
import RichMarkdownEditor from 'rich-markdown-editor';
import Chip from 'main/mdt/components/chip';
import New from 'main/mdt/components/icons/new';
import { deleteResourceItem, mdtAction, openMdtConfirmModal, showMdtLoadingModal, updateMdtState } from 'main/mdt/actions';
import AddLicenseModal from 'main/mdt/components/modals/add-license-modal';
import VehicleInfoModal from 'main/mdt/components/modals/vehicle-info-modal';
import Tags from 'main/mdt/components/chips/tags';
import { masterSteamId } from '../../config/page';
import Remove from 'main/mdt/components/icons/remove';
import Save from 'main/mdt/components/icons/save';
import { profileMarkDownData } from '..';
import SyncedTextArea from 'main/mdt/components/synced-text-area';

export default (props: any) => {
    const classes = useStyles(props);
    const name = 'profile';

    const priors = {};
    const _0x2a7e85 = {};

    props[name].priors && props[name].priors.length > 0 && props[name].priors.forEach((p => {
        if (!priors[p.charge_id]) {
            priors[p.charge_id] = {
                name: p.name,
                count: 0
            }
        }

        _0x2a7e85[p.name] = p.charge_id;
        priors[p.charge_id].count += 1;
    }));

    let paroleMonths = 0;

    if (props[name].parole_end_timestamp) {
        const timestamp = props[name].parole_end_timestamp - Math.round(Date.now() / 1000);
        timestamp > 60 && (paroleMonths = Math.ceil(timestamp / 60));
    }

    const hasPerm = masterSteamId.includes(props.permissions.steam_id);

    return (
        <div className={classes.contentWrapper}>
            <Content
                search={true}
                onChangeSearch={props.search}
                searchValue={props.searchValue}
                title="Profiles"
            >
                {props.isSearchLoading && (
                    <div className={classes.spinnerContainer}>
                        <Spinner />
                    </div>
                )}
                {!props.isSearchLoading && (
                    <>
                        {props.profiles && props.profiles.map((p: any) => {
                            return (
                                <Paper
                                    key={p.id}
                                    id={p.id}
                                    onClick={() => props.selectProfile(p)}
                                    title={p.name}
                                />
                            )
                        })}
                    </>
                )}
            </Content>
            <div className={classes.spacer}></div>
            <Content
                title={props.publicApp ? 'Profile' : props[name].id ? `Edit Profile (#${props[name].id})` : 'Create Profile'}
                actions={(
                    isJob(['judge', 'police', 'county_clerk', 'doctor', 'doc'], hasPerm) ? (
                        <div className={classes.contentActions}>
                            {!!props[name].id && props.permissions.steam && (
                                <Remove
                                    onClick={() => deleteResourceItem('_mdt_profile_civ', props[name].id, 'character_id')}
                                />
                            )}
                            {!!props[name].id && (
                                <New
                                    onClick={() => props.createNew()}
                                />
                            )}
                            <Save
                                onClick={() => props.save()}
                            />
                        </div>
                    ) : null
                )}
            >
                <div className={classes.inputWrapperFlex}>
                    <div className={classes.profileImageWrapper}>
                        <img
                            className={classes.profileImage}
                            src={props[name].profile_image_url || 'https://i.imgur.com/ttNVaPp.png'}
                            alt="profile"
                        />
                        {props[name].is_wanted && (
                            <div className={classes.profileImageWantedContainer}>
                                <img
                                    className={classes.profileImageWanted}
                                    src="https://gta-assets.subliminalrp.net/images/wanted.png"
                                    alt="profile"
                                />
                            </div>
                        )}
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className={classes.inputWrapper}>
                            <Input.CityID
                                onChange={(value: any) => props.updateField(props[name].id ? 'id' : 'state_id', value)}
                                value={props[name].id ? props[name].id : props[name].state_id}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <Input.Text
                                onChange={(value: any) => props.updateField('name', value)}
                                value={props[name].name}
                                label="Name"
                                icon="user"
                            />
                        </div>
                        {!props.publicApp && (
                            <div className={classes.inputWrapper}>
                                <Input.Text
                                    label="Profile Image URL"
                                    icon="clipboard"
                                    onChange={(value: any) => props.updateField('profile_image_url', value)}
                                    value={props[name].profile_image_url}
                                />
                            </div>
                        )}
                        {!props.publicApp && props[name].isOnline && (
                            <div className={classes.onlineStatus}>
                                <Typography variant="h5" className={classes.onlineStatusText}>
                                    Last Seen: Recently
                                </Typography>
                            </div>
                        )}
                        {!!paroleMonths && (
                            <div className={classes.inputWrapper}>
                                <Typography variant="h5" style={{ color: '#FF3D00' }}>
                                    Parole: {paroleMonths} month(s)
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
                {!props.publicApp && (
                    <>
                        {props[name].id ? (
                            <SyncedTextArea
                                roomName={`profile-${props[name].id}`}
                                className=""
                                initialValue={props[name].summary}
                                readOnly={false}
                                onTextChange={(editor, delta, oldDelta, source) => props.updateField('summary', editor.getContents())}
                                placeholder='Start typing here...'
                            />
                        ) : (
                            <div className={classes.markdownWrapper}>
                                <RichMarkdownEditor
                                    dark={true}
                                    readOnly={false}
                                    onChange={(value: any) => {
                                        profileMarkDownData[props[name].id || -1] = value;
                                    }}
                                    defaultValue={props[name].summary}
                                />
                            </div>
                        )}
                    </>
                )}
            </Content>
            <div className={classes.spacer}></div>
            <div className={classes.verticalStack}>
                <Content
                    autoHeight={true}
                    flexRow={true}
                    title={`Licenses ` + (props[name].id ? `(${props[name].drivers_points || 0} point${(props[name].drivers_points || 0) === 1 ? '' : 's'})` : '')}
                    actions={props[name].id && isJob(['judge', 'mayor', 'county_clerk']) ? ( //'police'
                        <div className={classes.contentActions}>
                            <Remove
                                onClick={() => props.resetDrivingPoints(props[name])}
                                sureText="Reset License Points"
                            />
                            <New
                                onClick={() => {
                                    updateMdtState({
                                        modal: (prop: any) => {
                                            return (
                                                <AddLicenseModal {...prop} addLicense={props.addLicense} />
                                            )
                                        }
                                    });
                                }}
                            />
                        </div>
                    ) : null}
                >
                    {!!props[name].id && props[name].licenses && props[name].licenses.map((l: any) => {
                        return (
                            <Chip
                                key={l.name}
                                label={`${l.name} ${l.status ? '' : '(Revoked)'}`}
                                textColor="black"
                                bgColor="white"
                                style={{ marginLeft: 8, marginBottom: 8 }}
                                onDelete={isJob(['police', 'judge'], hasPerm) ? () => {
                                    return props.suspendLicense(props[name], l);
                                } : null}
                            />
                        )
                    })}
                </Content>
                {!props.publicApp && (
                    <Tags
                        parent={props[name]}
                        tags={props[name].tags}
                        resourceGet="getCivilianProfile"
                        resourceKey="profile"
                        resourceStore={props.myStoreKey}
                        resourceType="profile"
                    />
                )}
                <Content
                    autoHeight={true}
                    flexRow={true}
                    title="Vehicles"
                >
                    {!!props[name].id && props[name].vehicles && props[name].vehicles.map((v: any) => {
                        return (
                            <div key={v.plate} style={{ marginLeft: 8, marginBottom: 8 }} onClick={() => {
                                return isJob(['judge', 'police']) ? (
                                    updateMdtState({
                                        modal: (prop: any) => {
                                            return (
                                                <VehicleInfoModal {...prop} vehicle={v} permissions={props.permissions} refreshProfile={() => props.refreshProfile(props[name])} />
                                            )
                                        },
                                        modalStyle: {
                                            minHeight: '55%',
                                            minWidth: '80%'
                                        }
                                    })
                                ) : null;
                            }}>
                                <Chip
                                    key={v.plate}
                                    label={`${v.plate} - ${v.name} ${v.strikes > 0 ? `(${v.strikes}/30)` : ''}`}
                                    textColor="black"
                                    bgColor="white"
                                />
                            </div>
                        )
                    })}
                </Content>
                <Content
                    autoHeight={true}
                    flexRow={true}
                    title="Housing"
                >
                    {!!props[name].id && props[name].apartment && (
                        <div key="apartment" style={{ marginRight: 8, marginBottom: 8 }}>
                            <Chip
                                key="apartment-chip"
                                label={`${props[name].apartment.apartment} (Apartment)`}
                                textColor="black"
                                bgColor="white"
                            />
                        </div>
                    )}
                    {!!props[name].id && props[name].housing && props[name].housing.map((h: any) => {
                        return (
                            <div key={h.address} style={{ marginRight: 8, marginBottom: 8 }}>
                                <Chip
                                    key={h.address}
                                    label={`${h.address} (${h.key_type})`}
                                    textColor="black"
                                    bgColor="white"
                                />
                            </div>
                        )
                    })}
                </Content>
                <Content
                    autoHeight={true}
                    flexRow={true}
                    title="Hotels"
                >
                    {!!props[name].id && props[name].hotels && props[name].hotels.map((h: any) => {
                        return (
                            <div key={h.name} style={{ marginRight: 8, marginBottom: 8 }}>
                                <Chip
                                    key={h.name}
                                    label={h.name}
                                    textColor="black"
                                    bgColor="white"
                                />
                            </div>
                        )
                    })}
                </Content>
                <Content
                    autoHeight={true}
                    flexRow={true}
                    title="Storage Access"
                >
                    {!!props[name].id && props[name].storage && props[name].storage.map((s: any) => {
                        return (
                            <div key={s.name} style={{ marginRight: 8, marginBottom: 8 }}>
                                <Chip
                                    key={s.name}
                                    label={`${s.name} (${s.unitId})`}
                                    textColor="black"
                                    bgColor="white"
                                />
                            </div>
                        )
                    })}
                </Content>
                <Content
                    autoHeight={true}
                    flexRow={true}
                    title="Employment"
                >
                    {!!props[name].id && props[name].employment && props[name].employment.map((e: any) => {
                        return (
                            <div key={e.name} style={{ marginRight: 8, marginBottom: 8 }}>
                                <Chip
                                    key={e.name}
                                    label={`${e.name} (${e.role})`}
                                    textColor="black"
                                    bgColor="white"
                                />
                            </div>
                        )
                    })}
                </Content>
                <Content
                    autoHeight={true}
                    flexRow={true}
                    title="Priors"
                    actions={props[name].id && isJob(['judge']) ? (
                        <div className={classes.contentActions}>
                            <New
                                title="Expunge"
                                onClick={() => {
                                    openMdtConfirmModal({
                                        onClick: async () => {
                                            showMdtLoadingModal(true);
                                            await mdtAction('expungeCiv', { profile_civ_id: props[name].id });
                                            showMdtLoadingModal(false);
                                        }
                                    });
                                }}
                            />
                        </div>
                    ) : null}
                >
                    {!!props[name].id && Object.values(priors).map((p: any) => {
                        return (
                            <div key={p.name} style={{ marginRight: 8, marginBottom: 8 }}>
                                <Chip
                                    key={p.name}
                                    label={`(${p.count}) ${p.name}`}
                                    textColor="black"
                                    bgColor="white"
                                />
                            </div>
                        )
                    })}
                </Content>
            </div>
        </div>
    )
}