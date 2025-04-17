import React from 'react';
import useStyles from '../index.styles';
import Chip from '../../chip';
import { addResourceLink, getMdtOfficers } from 'main/mdt/actions';
import Text from 'components/text/text';
import Input from 'components/input/input';

export default (props: any) => {
    const classes = useStyles();
    const [existingTags, setExistingTags] = React.useState(props.existingTags || []);
    const [searchValue, setSearchValue] = React.useState('');
    const onDutyOfficers = getMdtOfficers().filter((officer: any) => officer.onDuty && !existingTags.includes(officer.character_id));
    const filteredOfficers = getMdtOfficers().filter((officer: any) => {
        return !existingTags.includes(officer.character_id);
    }).filter((officer: any) => {
        return !searchValue || officer.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 || officer.callsign.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });

    return (
        <div className={classes.wrapperFlex}>
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Text variant="body2">
                        Assign Officer
                    </Text>
                </div>
                <div className={classes.modalItem}>
                    <Input.Search
                        onChange={(value: string) => setSearchValue(value)}
                        value={searchValue}
                    />
                </div>
                <div className={`${classes.modalItem} ${classes.modalTagItems}`}>
                    {filteredOfficers.map((officer: any) => (
                        <Chip
                            key={officer.character_id}
                            label={`${officer.callsign ? `(${officer.callsign}) ` : ''}${officer.name}`}
                            textColor="black"
                            bgColor="white"
                            style={{ marginRight: 8, marginBottom: 8 }}
                            onClick={() => {
                                addResourceLink(
                                    {
                                        resource_type: props.resourceType, //incident
                                        resource_id: props.resourceId, //parentId
                                        source_type: 'officer',
                                        source_id: officer.character_id,
                                    },
                                    props.resourceGet, //getIncident
                                    props.resourceKey, //incident
                                    props.resourceStore //myStoreKey
                                );
                                setExistingTags([...existingTags, officer.character_id]);
                            }}
                        />
                    ))}
                </div>
                {onDutyOfficers.length > 0 && (
                    <div className={classes.modalItem}>
                        <Text variant="body2">
                            On Duty Officers
                        </Text>
                        <div className={`${classes.modalItem} ${classes.modalTagItems}`}>
                            {onDutyOfficers.map((officer: any) => (
                                <Chip
                                    key={officer.character_id}
                                    label={`${officer.callsign ? `(${officer.callsign}) ` : ''}${officer.name}`}
                                    textColor="black"
                                    bgColor="white"
                                    style={{ marginRight: 8, marginBottom: 8 }}
                                    onClick={() => {
                                        addResourceLink(
                                            {
                                                resource_type: props.resourceType,
                                                resource_id: props.resourceId,
                                                source_type: 'officer',
                                                source_id: officer.character_id,
                                            },
                                            props.resourceGet,
                                            props.resourceKey,
                                            props.resourceStore
                                        );
                                        setExistingTags([...existingTags, officer.character_id]);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}