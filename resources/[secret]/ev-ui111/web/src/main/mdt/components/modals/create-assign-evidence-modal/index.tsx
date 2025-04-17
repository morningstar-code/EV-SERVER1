import useStyles from '../index.styles';
import Chip from '../../chip';
import Text from 'components/text/text';
import Input from 'components/input/input';
import Button from 'components/button/button';
import { addEvidenceToResource, updateEvidence } from 'main/mdt/actions';
import { getEvidenceTypes } from 'main/mdt/store';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Text variant="body2">
                        Assign Evidence
                    </Text>
                </div>
                <div className={classes.modalItem}>
                    <Input.Text
                        label="Identifier"
                        icon="fingerprint"
                        onChange={(value: string) => updateEvidence('Add', 'identifier', value)}
                        value={props.evidenceAdd.identifier}
                    />
                </div>
                <div className={classes.modalItemButton}>
                    <Button.Primary onClick={() => {
                        return addEvidenceToResource(
                            'add',
                            props.resourceType,
                            props.resourceId,
                            props.resourceGet,
                            props.resourceKey,
                            props.resourceStore
                        );
                    }}>
                        Assign
                    </Button.Primary>
                </div>
            </div>
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Text variant="body2">
                        Add New Evidence
                    </Text>
                </div>
                <div className={classes.modalItem}>
                    <Input.Select
                        label="Type"
                        onChange={(value: string) => updateEvidence('Create', 'type', value)}
                        items={getEvidenceTypes()}
                        value={props.evidenceCreate.type}
                    />
                </div>
                <div className={classes.modalItem}>
                    <Input.Text
                        label="Identifier"
                        icon="pencil-alt"
                        onChange={(value: string) => updateEvidence('Create', 'identifier', value)}
                        value={props.evidenceCreate.identifier}
                    />
                </div>
                <div className={classes.modalItem}>
                    <Input.Text
                        label="Description"
                        icon="clipboard"
                        onChange={(value: string) => updateEvidence('Create', 'description', value)}
                        value={props.evidenceCreate.description}
                    />
                </div>
                <div className={classes.modalItem}>
                    <Input.Text
                        label="State ID"
                        icon="user"
                        onChange={(value: string) => updateEvidence('Create', 'cid', value)}
                        value={props.evidenceCreate.cid}
                    />
                </div>
                <div className={classes.modalItem}>
                    <Button.Primary onClick={() => {
                        return addEvidenceToResource(
                            'create',
                            props.resourceType,
                            props.resourceId,
                            props.resourceGet,
                            props.resourceKey,
                            props.resourceStore
                        );
                    }}>
                        Create
                    </Button.Primary>
                </div>
            </div>
        </div>
    )
}