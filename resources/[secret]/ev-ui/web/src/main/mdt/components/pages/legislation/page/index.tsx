import { deleteResourceItem, hasMdtPermission } from 'main/mdt/actions';
import { legislationMarkDownData } from '..';
import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import Persons from 'main/mdt/components/chips/persons';
import Tags from 'main/mdt/components/chips/tags';
import Content from 'main/mdt/components/content';
import New from 'main/mdt/components/icons/new';
import Remove from 'main/mdt/components/icons/remove';
import Save from 'main/mdt/components/icons/save';
import Paper from 'main/mdt/components/paper';
import RichMarkdownEditor from 'rich-markdown-editor';
import useStyles from '../../../index.styles';

export default (props: any) => {
    const classes = useStyles(props);
    const name = 'legislation';

    return (
        <div className={classes.contentWrapper}>
            <Content
                search={true}
                onChangeSearch={props.search}
                searchValue={props.searchValue}
                title="Legislation"
            >
                {props.isSearchLoading && (
                    <div className={classes.spinnerContainer}>
                        <Spinner />
                    </div>
                )}
                {!props.isSearchLoading && props.legislations.map((legislation: any) => (
                    <Paper
                        key={legislation.id}
                        id={legislation.id}
                        onClick={() => props.selectReport(legislation)}
                        timestamp={legislation.timestamp}
                        timestampExtra={`${legislation.created_by_name} -- `}
                        title={legislation.title}
                        titleExtra={legislation.report_category_name}
                    />
                ))}
            </Content>
            <div className={classes.spacer} />
            <Content
                title={props[name].id ? `Edit Legislation (#${props[name].id})` : 'Create Legislation'}
                actions={(
                    <div className={classes.contentActions}>
                        {!!props[name].id && props.permissions.steam && (
                            <Remove
                                onClick={() => {
                                    return deleteResourceItem('_mdt_report', props[name].id);
                                }}
                            />
                        )}
                        {!!props[name].id && hasMdtPermission('reports.editCategory', 7) && (
                            <New
                                onClick={props.createNew}
                            />
                        )}
                        {hasMdtPermission('reports.editCategory', 7) && (
                            <Save
                                onClick={props.save}
                            />
                        )}
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
                <div className={classes.markdownWrapper}>
                    <RichMarkdownEditor
                        key={props[name].id}
                        dark={true}
                        readOnly={false}
                        onChange={(value: any) => {
                            legislationMarkDownData[props[name].id || -1] = value;
                        }}
                        defaultValue={props[name].description}
                    />
                </div>
            </Content>
            <div className={classes.spacer} />
            <div className={classes.verticalStack}>
                <Tags
                    parent={props[name]}
                    tags={props[name].tags}
                    resourceGet="getReport"
                    resourceKey="legislation"
                    resourceStore={props.myStoreKey}
                    resourceType="report"
                    showAdd={() => hasMdtPermission('reports.editCategory', 7)}
                />
                <Persons
                    parent={props[name]}
                    persons={props[name].persons || []}
                    resourceGet="getReport"
                    resourceKey="legislation"
                    resourceStore={props.myStoreKey}
                    resourceType="report"
                    showAdd={() => hasMdtPermission('reports.editCategory', 7)}
                />
            </div>
        </div>
    )
}