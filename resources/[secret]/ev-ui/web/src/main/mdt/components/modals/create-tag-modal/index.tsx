//hasMdtPermission('tags.createCategory') &&

import React from 'react';
import { Typography } from '@mui/material';
import Input from 'components/input/input';
import Button from 'components/button/button';
import useStyles from '../index.styles';
import Chip from '../../chip';
import { addResourceLink, createTag, hasMdtPermission } from 'main/mdt/actions';

export default (props: any) => {
    const classes = useStyles();
    const [existingTags, setExistingTags] = React.useState(props.existingTags || []);
    const [search, setSearch] = React.useState('');

    const filteredTags = props.tags.filter((tag: any) => {
        return !existingTags.includes(tag.id)
    }).filter((tag: any) => {
        return !search || tag.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
        <div className={classes.wrapperFlex}>
            {hasMdtPermission('tags.createCategory') && (
                <div className={classes.modalGroup} style={{ width: '35%' }}>
                    <div className={classes.modalItem}>
                        <Typography variant="body2" style={{ color: 'white' }}>
                            Create Tag
                        </Typography>
                    </div>
                    <div className={classes.modalItem}>
                        <Input.Select
                            items={props.tagCategories}
                            label="Category"
                            onChange={(categoryId: any) => {
                                props.updateState({
                                    tagCreate: {
                                        ...props.tagCreate,
                                        category_id: categoryId
                                    }
                                });
                            }}
                            value={props.tagCreate.category_id}
                        />
                    </div>
                    <div className={classes.modalItem}>
                        <Input.Text
                            label="Text"
                            icon="tag"
                            onChange={(text: string) => {
                                props.updateState({
                                    tagCreate: {
                                        ...props.tagCreate,
                                        text: text
                                    }
                                });
                            }}
                            value={props.tagCreate.text}
                        />
                    </div>
                    <div className={classes.modalItemButton}>
                        <Button.Primary
                            onClick={() => {
                                return createTag();
                            }}
                        >
                            Create
                        </Button.Primary>
                    </div>
                </div>
            )}
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Typography variant="body2" style={{ color: 'white' }}>
                        Assign Tag
                    </Typography>
                </div>
                <div className={classes.modalItem}>
                    <Input.Search
                        onChange={(value: any) => setSearch(value)}
                        value={search}
                    />
                </div>
                <div className={`${classes.modalItem} ${classes.modalTagItems}`}>
                    {filteredTags.map((tag: any) => (
                        <Chip
                            key={tag.id}
                            icon={tag.icon}
                            label={tag.text}
                            textColor={tag.color_text}
                            bgColor={tag.color}
                            style={{ marginRight: 8, marginBottom: 8 }}
                            onClick={() => {
                                addResourceLink(
                                    {
                                        resource_type: props.resourceType, //report
                                        resource_id: props.resourceId, //report id
                                        source_type: 'tag',
                                        source_id: tag.id //tag id
                                    },
                                    props.resourceGet, //getReport
                                    props.resourceKey, //legislation
                                    props.resourceStore //store key
                                )
                                setExistingTags([...existingTags, tag.id]);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}