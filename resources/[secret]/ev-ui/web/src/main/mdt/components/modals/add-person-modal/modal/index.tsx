import Button from 'components/button/button';
import Input from 'components/input/input';
import { addResourceLink } from 'main/mdt/actions';
import useStyles from '../../../index.styles';

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div>
            <div>
                <Input.Name
                    onChange={(value: string) => props.onSearchChange(value)}
                    value={props.searchValue}
                />
            </div>
            <div style={{ minHeight: 208, margin: 8 }}>
                {props.profiles.map((profile: any) => (
                    <div
                        key={profile.id}
                        className={classes.inputWrapperFlex}
                        style={{ alignItems: 'unset', marginTop: 8 }}
                    >
                        <div className={classes.profileImageWrapper}>
                            <img
                                className={classes.profileImage}
                                src={profile.profile_image_url}
                                alt="profile"
                            />
                            {profile.is_wanted && (
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
                                    onChange={() => { }}
                                    value={profile.id}
                                />
                            </div>
                            <div className={classes.inputWrapper}>
                                <Input.Name
                                    onChange={() => { }}
                                    value={profile.name}
                                />
                            </div>
                            <div className={classes.inputWrapper}>
                                <Button.Primary onClick={() => {
                                    props.addCiv ? props.addCiv(profile) : addResourceLink(
                                        {
                                            resource_type: props.resourceType,
                                            resource_id: props.resourceId,
                                            source_type: 'profile',
                                            source_id: profile.id
                                        },
                                        props.resourceGet,
                                        props.resourceKey,
                                        props.resourceStore
                                    );
                                }}>
                                    Add
                                </Button.Primary>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}