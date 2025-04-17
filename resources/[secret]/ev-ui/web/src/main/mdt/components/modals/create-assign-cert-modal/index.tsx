import React from 'react';
import useStyles from '../index.styles';
import Chip from '../../chip';
import { addResourceLink, createCert } from 'main/mdt/actions';
import Text from 'components/text/text';
import Input from 'components/input/input';
import Button from 'components/button/button';

export default (props: any) => {
    const classes = useStyles();
    const [existingCerts, setExistingCerts] = React.useState(props.existingCerts || []);
    const [searchValue, setSearchValue] = React.useState('');
    const filteredCerts = props.certs.filter((cert: any) => {
        return !existingCerts.includes(cert.id);
    }).filter((cert: any) => {
        return !searchValue || cert.description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });

    const addCert = async (cert: any) => {
        const results = await addResourceLink(
            {
                resource_type: props.resourceType,
                resource_id: props.resourceId,
                source_type: 'cert',
                source_id: cert.id
            },
            props.resourceGet,
            props.resourceKey,
            props.resourceStore
        );

        setExistingCerts([...existingCerts, cert.id]);

        props.updateSelectedOfficer(
            results.data.find((officer) => officer.character_id === props.resourceId)?.certs ?? []
        );
    }

    return (
        <div className={classes.wrapperFlex}>
            <div className={classes.modalGroup} style={{ width: '35%' }}>
                <div className={classes.modalItem}>
                    <Text variant="body2">
                        Create Cert
                    </Text>
                </div>
                <div className={classes.modalItem}>
                    <Input.Text
                        label="Name"
                        icon="certificate"
                        onChange={(value: string) => {
                            props.updateState({
                                certCreate: {
                                    ...props.certCreate,
                                    name: value,
                                }
                            });
                        }}
                        value={props.certCreate.name}
                    />
                </div>
                <div className={classes.modalItem}>
                    <Input.Text
                        label="Description"
                        icon="certificate"
                        onChange={(value: string) => {
                            props.updateState({
                                certCreate: {
                                    ...props.certCreate,
                                    description: value,
                                }
                            });
                        }}
                        value={props.certCreate.description}
                    />
                </div>
                <div className={classes.modalItemButton}>
                    <Button.Primary onClick={() => createCert()}>
                        Create
                    </Button.Primary>
                </div>
            </div>
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Text variant="body2">
                        Assign Cert
                    </Text>
                </div>
                <div className={classes.modalItem}>
                    <Input.Search
                        onChange={(value: string) => setSearchValue(value)}
                        value={searchValue}
                    />
                </div>
                <div className={`${classes.modalItem} ${classes.modalTagItems}`}>
                    {filteredCerts.map((cert: any) => (
                        <Chip
                            key={cert.id}
                            icon="certificate"
                            label={cert.name}
                            textColor="black"
                            bgColor="white"
                            style={{ marginRight: 8, marginBottom: 8 }}
                            onClick={() => addCert(cert)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}