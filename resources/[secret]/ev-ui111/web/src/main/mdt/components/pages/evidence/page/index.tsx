import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import Content from 'main/mdt/components/content';
import useStyles from '../../../index.styles';
import Paper from 'main/mdt/components/paper';
import { getEvidenceTypes } from 'main/mdt/store';
import New from 'main/mdt/components/icons/new';
import Save from 'main/mdt/components/icons/save';
import Tags from 'main/mdt/components/chips/tags';

export default (props: any) => {
    const classes = useStyles(props);
    const name = 'evidenceSelected';

    return (
        <div className={classes.contentWrapper}>
            <Content
                search={true}
                onChangeSearch={props.search}
                searchValue={props.searchValue}
                title="Evidence"
            >
                {props.isSearchLoading && (
                    <div className={classes.spinnerContainer}>
                        <Spinner />
                    </div>
                )}
                {!props.isSearchLoading && props.evidence && props.evidence.length > 0 && props.evidence.map((evidence: any) => (
                    <Paper
                        key={evidence.id}
                        id={evidence.id}
                        onClick={() => props.selectEvidence(evidence)}
                        title={`${evidence.identifier} - ${evidence.description}`}
                    />
                ))}
            </Content>
            <div className={classes.spacer}></div>
            <Content
                autoHeight={true}
                title={props[name].id ? `Edit Evidence (#${props[name].id})` : 'Submit Evidence'}
                actions={(
                    <div className={classes.contentActions}>
                        {!!props[name].id && (
                            <New
                                onClick={() => props.createNew()}
                            />
                        )}
                        <Save
                            onClick={() => props.save()}
                        />
                    </div>
                )}
            >
                <div className={classes.inputWrapper}>
                    <Input.Select
                        label="Type"
                        items={getEvidenceTypes()}
                        onChange={(value: any) => props.changeEvidenceType(value)}
                        value={props[name].type}
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <Input.Text
                        label="Identifier"
                        icon="pencil-alt"
                        onChange={(value: any) => props.updateField('identifier', value)}
                        value={props[name].identifier}
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <Input.Text
                        label="Description"
                        icon="clipboard"
                        onChange={(value: any) => props.updateField('description', value)}
                        value={props[name].description}
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <Input.Text
                        label="State ID"
                        icon="user"
                        onChange={(value: any) => props.updateField('cid', value)}
                        value={props[name].cid}
                    />
                </div>
            </Content>
            <div className={classes.spacer}></div>
            <div className={classes.verticalStack}>
                <Tags
                    parent={props[name]}
                    tags={props[name].tags}
                    resourceGet="getSingleEvidence"
                    resourceKey={name}
                    resourceStore={props.myStoreKey}
                    resourceType="evidence"
                />
            </div>
        </div>
    )
}