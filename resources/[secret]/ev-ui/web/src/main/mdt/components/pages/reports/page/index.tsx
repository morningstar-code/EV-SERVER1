import React from 'react';
import Input from 'components/input/input';
import Spinner from 'components/spinner/spinner';
import Content from 'main/mdt/components/content';
import RichMarkdownEditor from 'rich-markdown-editor';
import useStyles from '../../../index.styles';
import Paper from 'main/mdt/components/paper';
import { deleteResourceItem, hasMdtPermission } from 'main/mdt/actions';
import Remove from 'main/mdt/components/icons/remove';
import New from 'main/mdt/components/icons/new';
import Save from 'main/mdt/components/icons/save';
import { reportMarkDownData } from '..';
import Tags from 'main/mdt/components/chips/tags';
import Evidence from 'main/mdt/components/chips/evidence';
import Officers from 'main/mdt/components/chips/officers';
import Persons from 'main/mdt/components/chips/persons';
import Vehicles from 'main/mdt/components/chips/vehicles';
import Promote from 'main/mdt/components/icons/promote';

export default (props: any) => {
    const classes = useStyles(props);
    const name = 'report';

    return (
        <div className={classes.contentWrapper}>
            <Content
                search={true}
                onChangeSearch={props.search}
                searchValue={props.searchValue}
                title="Reports"
            >
                {props.isSearchLoading && (
                    <div className={classes.spinnerContainer}>
                        <Spinner />
                    </div>
                )}
                {!props.isSearchLoading && ( //&& props.reports.length > 0
                    <div className={classes.inputWrapper}>
                        <Input.Select
                            label="Category"
                            items={props.searchCategories.filter((category: any) => category.id !== -1 && category.id !== 7 && hasMdtPermission('reports.editCategory', category.id))}
                            onChange={(value: any) => props.changeSearchCategory(value)}
                            value={props.searchCategorySelected.id}
                        />
                    </div>
                )}
                {!props.isSearchLoading && props.reports.map((report: any) => (
                    <Paper
                        key={report.id}
                        id={report.id}
                        onClick={() => props.selectReport(report)}
                        timestamp={report.timestamp}
                        timestampExtra={`${report.created_by_name} -- `}
                        title={report.title}
                        titleExtra={report.report_category_name}
                    />
                ))}
            </Content>
            <div className={classes.spacer}></div>
            <Content
                autoHeight={true}
                title={props[name].id ? `Edit Report (#${props[name].id})` : 'Create Report'}
                actions={(
                    <div className={classes.contentActions}>
                        {!!props[name].id && (
                            <Promote
                                onClick={props.promote}
                            />
                        )}
                        {!!props[name].id && (
                            <></> //TODO; Export Icon
                        )}
                        {!!props[name].id && props.permissions.steam && (
                            <Remove
                                onClick={async () => {
                                    await deleteResourceItem('_mdt_report', props[name].id);
                                    props.getReports(null); //Doesn't work...?
                                    props.createNew();
                                }}
                            />
                        )}
                        {!!props[name].id && (
                            <New
                                onClick={() => props.createNew()}
                            />
                        )}
                        {hasMdtPermission('reports.editCategory', props.report.report_category_id) && (
                            <Save
                                onClick={() => props.save()}
                            />
                        )}
                    </div>
                )}
            >
                <div className={classes.inputWrapper}>
                    <Input.Select
                        label="Category"
                        items={props.reportCategories.filter((category: any) => category.id !== -1 && category.id !== 7 && hasMdtPermission('reports.editCategory', category.id))}
                        onChange={(value: any) => props.changeReportCategory(value)}
                        value={props?.reportCategorySelected?.id}
                    />
                </div>
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
                        key={props[name].id}
                        dark={true}
                        readOnly={false}
                        onChange={(value: any) => {
                            reportMarkDownData[props[name].id || -1] = value;
                        }}
                        defaultValue={props[name].description || ''}
                    />
                </div>
            </Content>
            <div className={classes.spacer}></div>
            <div className={classes.verticalStack}>
                <Tags
                    parent={props[name]}
                    tags={props[name].tags}
                    resourceGet="getReport"
                    resourceKey="report"
                    resourceStore={props.myStoreKey}
                    resourceType="report"
                />
                <Evidence
                    parent={props[name]}
                    evidence={props[name].evidence}
                    resourceGet="getReport"
                    resourceKey="report"
                    resourceStore={props.myStoreKey}
                    resourceType="report"
                />
                <Officers
                    parent={props[name]}
                    officers={props[name].officers || []}
                    resourceGet="getReport"
                    resourceKey="report"
                    resourceStore={props.myStoreKey}
                    resourceType="report"
                />
                <Persons
                    parent={props[name]}
                    persons={props[name].persons || []}
                    resourceGet="getReport"
                    resourceKey="report"
                    resourceStore={props.myStoreKey}
                    resourceType="report"
                />
                <Vehicles
                    parent={props[name]}
                    vehicles={props[name].vehicles || []}
                    resourceGet="getReport"
                    resourceKey="report"
                    resourceStore={props.myStoreKey}
                    resourceType="report"
                    refreshIncident={() => props.refreshReport(props[name])}
                />
            </div>
        </div>
    )
}