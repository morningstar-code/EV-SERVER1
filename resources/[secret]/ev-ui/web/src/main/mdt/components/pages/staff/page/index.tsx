import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import { getMdtOfficers, hasMdtPermission } from 'main/mdt/actions';
import Chip from 'main/mdt/components/chip';
import Certs from 'main/mdt/components/chips/certs';
import Content from 'main/mdt/components/content';
import Paper from 'main/mdt/components/paper';
import React from 'react';
import useStyles from '../../../index.styles';

export default (props: any) => {
    const classes = useStyles(props);
    const [searchValue, setSearchValue] = React.useState('');
    const name = 'officerSelected';

    const filteredOfficers = getMdtOfficers().filter((officer: any) => {
        return !searchValue || officer.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 || officer.certs.filter((cert: any) => cert.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1).length > 0 || officer.character_id.toString().indexOf(searchValue.toLowerCase()) !== -1 || officer.callsign.indexOf(searchValue.toLowerCase()) !== -1;
    });

    return (
        <div className={classes.contentWrapper}>
            <Content
                search={true}
                onChangeSearch={setSearchValue}
                searchValue={searchValue}
                title="Staff"
            >
                {props.isSearchLoading && (
                    <div className={classes.spinnerContainer}>
                        <Spinner />
                    </div>
                )}
                {!props.isSearchLoading && filteredOfficers.map((officer: any) => (
                    <Paper
                        key={officer.character_id}
                        id={officer.character_id}
                        title={`${officer.callsign ? `(${officer.callsign}) ` : ''} ${officer.name}`}
                        onClick={() => props.updateState({ officerSelected: officer })}
                    />
                ))}
            </Content>
            <div className={classes.spacer} />
            <div className={classes.verticalStack}>
                <Content
                    autoHeight={true}
                    title="Profile"
                >
                    {props[name].character_id && (
                        <div className={classes.inputWrapperFlex}>
                            <div className={classes.profileImageWrapper}>
                                <img
                                    className={classes.profileImage}
                                    src={props[name].profile_image_url || 'https://i.imgur.com/ttNVaPp.png'}
                                    alt="profile"
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <div className={classes.inputWrapper}>
                                    <Input.CityID
                                        onChange={() => { }}
                                        value={props[name].character_id}
                                    />
                                </div>
                                <div className={classes.inputWrapper}>
                                    <Input.Text
                                        label="Name"
                                        icon="user"
                                        onChange={() => { }}
                                        value={props[name].name}
                                    />
                                </div>
                                <div className={classes.inputWrapper}>
                                    <Input.Text
                                        label="Call sign"
                                        icon="tag"
                                        onChange={() => { }}
                                        value={props[name].callsign}
                                    />
                                </div>
                                <div className={classes.inputWrapper}>
                                    <Input.Text
                                        label="Alias"
                                        icon="mask"
                                        onChange={() => { }}
                                        value={props[name].alias}
                                    />
                                </div>
                                <div className={classes.inputWrapper}>
                                    <Input.Text
                                        label="Phone Number"
                                        icon="mobile-alt"
                                        onChange={() => { }}
                                        value={props[name].phone_number}
                                    />
                                </div>
                                <div className={classes.inputWrapper}>
                                    <Input.Text
                                        label="Department"
                                        icon="house-user"
                                        onChange={() => { }}
                                        value={props[name].department}
                                    />
                                </div>
                                <div className={classes.inputWrapper}>
                                    <Input.Text
                                        label="Rank"
                                        icon="certificate"
                                        onChange={() => { }}
                                        value={props[name].rank}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </Content>
            </div>
            <div className={classes.spacer} />
            <div className={classes.verticalStack}>
                <Content
                    autoHeight={true}
                    flexRow={true}
                    title="Roles"
                >
                    {!!props[name].character_id && props[name].roles.map((role: any) => (
                        <Chip
                            key={role.id}
                            icon={role.icon}
                            iconSize="lg"
                            label={role.name}
                            textColor={role.color_text}
                            bgColor={role.color}
                            style={{ marginRight: 8, marginBottom: 8 }}
                        />
                    ))}
                </Content>
                {!!props[name].character_id && (
                    <Certs
                        {...props}
                        showAdd={() => hasMdtPermission('staff.giveCert')}
                        parent={props[name]}
                        certs={props[name].certs}
                        resourceGet="getOfficerProfiles"
                        resourceKey="officers"
                        resourceStore="officers"
                        resourceType="officer"
                    />
                )}
            </div>
        </div>
    )
}