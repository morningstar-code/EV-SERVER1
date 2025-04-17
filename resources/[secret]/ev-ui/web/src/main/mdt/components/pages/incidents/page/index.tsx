import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import Content from 'main/mdt/components/content';
import RichMarkdownEditor from 'rich-markdown-editor';
import useStyles from '../../../index.styles';
import Paper from 'main/mdt/components/paper';
import Remove from 'main/mdt/components/icons/remove';
import New from 'main/mdt/components/icons/new';
import Save from 'main/mdt/components/icons/save';
import Chip from 'main/mdt/components/chip';
import Evidence from 'main/mdt/components/chips/evidence';
import Officers from 'main/mdt/components/chips/officers';
import Persons from 'main/mdt/components/chips/persons';
import Tags from 'main/mdt/components/chips/tags';
import Vehicles from 'main/mdt/components/chips/vehicles';
import { deleteResourceItem, openAddPersonsModal } from 'main/mdt/actions';
import { incidentMarkDownData } from '..';
import Criminal from './components/criminal';

export default (props: any) => {
    const classes = useStyles(props);
    const name = 'incident';

    return (
        <div className={classes.contentWrapper} onKeyUp={(e) => props.onKeyUp(e)}>
            <Content
                search={true}
                onChangeSearch={props.search}
                searchValue={props.searchValue}
                title="Incidents"
            >
                {props.isSearchLoading && (
                    <div className={classes.spinnerContainer}>
                        <Spinner />
                    </div>
                )}
                {!props.isSearchLoading && (
                    <>
                        {props.incidents.map((incident: any) => (
                            <Paper
                                key={incident.id}
                                id={incident.id}
                                timestamp={incident.timestamp}
                                timestampExtra={`${incident.created_by_name} -- `}
                                onClick={() => props.selectIncident(incident)}
                                title={incident.title}
                                titleExtra={incident.report_category_name}
                            />
                        ))}
                    </>
                )}
            </Content>
            <div className={classes.spacer}></div>
            <div className={classes.verticalStack}>
                <Content
                    autoHeight={true}
                    title={props[name].id ? `Edit Incident (#${props[name].id})` : 'Create Incident'}
                    style={{ flex: 1 }}
                    actions={(
                        <div className={classes.contentActions}>
                            {!!props[name].id && props.permissions.steam && (
                                <Remove
                                    onClick={async () => {
                                        await deleteResourceItem('_mdt_report', props[name].id);
                                        props.refreshIncidents();
                                        props.createNew();
                                    }}
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
                    )}
                >
                    <div className={classes.inputWrapper}>
                        <Input.Text
                            label="Title"
                            icon="pencil-alt"
                            onChange={(value: any) => props.updateField('title', value)}
                            value={props[name].title}
                        />
                    </div>
                    <div className={classes.markdownWrapper} style={{ minHeight: 270 }}>
                        <RichMarkdownEditor
                            dark={true}
                            readOnly={false}
                            onChange={(value: any) => {
                                incidentMarkDownData[props[name].id || -1] = value;
                            }}
                            defaultValue={props[name].description}
                            value={props[name].description}
                        />
                    </div>
                </Content>
                <Evidence
                    parent={props[name]}
                    evidence={props[name].evidence}
                    resourceGet="getIncident"
                    resourceKey="incident"
                    resourceStore={props.myStoreKey}
                    resourceType="incident"
                />
                <Officers
                    parent={props[name]}
                    officers={props[name].officers}
                    resourceGet="getIncident"
                    resourceKey="incident"
                    resourceStore={props.myStoreKey}
                    resourceType="incident"
                />
                <Persons
                    parent={props[name]}
                    persons={props[name].persons || []}
                    resourceGet="getIncident"
                    resourceKey="incident"
                    resourceStore={props.myStoreKey}
                    resourceType="incident"
                />
                <Tags
                    parent={props[name]}
                    tags={props[name].tags}
                    resourceGet="getIncident"
                    resourceKey="incident"
                    resourceStore={props.myStoreKey}
                    resourceType="incident"
                />
                <Vehicles
                    parent={props[name]}
                    vehicles={props[name].vehicles}
                    resourceGet="getIncident"
                    resourceKey="incident"
                    resourceStore={props.myStoreKey}
                    resourceType="incident"
                    refreshIncident={() => props.refreshIncident(props[name])}
                />
            </div>
            <div className={classes.spacer}></div>
            <div className={classes.verticalStack}>
                <Content
                    autoHeight={true}
                    title="Add Criminal Scum"
                    actions={props[name].id ? (
                        <Chip
                            noLabel={true}
                            icon="plus"
                            textColor="white"
                            bgColor="black"
                            size="small"
                            iconSize="lg"
                            onClick={() => {
                                openAddPersonsModal({
                                    addCiv: props.addCiv,
                                    incident_id: props[name].id,
                                });
                            }}
                        />
                    ) : null}
                >
                </Content>
                {!!props[name].id && props[name].civs.filter((item, index, self) => {
                    return index === self.findIndex(obj => obj.character_id === item.character_id);
                }).map((civ: any) => (
                    <Criminal
                        key={Math.random()}
                        {...props}
                        incident={props[name]}
                        civProfile={civ}
                    />
                ))}
            </div>
        </div>
    )
}