import Input from "components/input/input";
import Text from "components/text/text";
import React from "react";
import useStyles from '../../../../index.styles';
import Item from "./item";

let editBoxId = 1;
const getEditBoxId = () => {
    return 'edit_box_' + editBoxId++;
}

export default (props: any) => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className={classes.configBox}>
            <div className={classes.title}>
                <div>
                    <Text variant="h6">
                        {props.title}
                    </Text>
                    <Text variant="body2">
                        {props.description}
                    </Text>
                </div>
                <div className={classes.searchBar}>
                    <Input.Search
                        onChange={setSearchValue}
                        value={searchValue}
                    />
                </div>
            </div>
            <div>
                {!searchValue && (
                    <Item
                        isCreate={true}
                        id={getEditBoxId()}
                        onCreate={props.onCreate}
                        obj={props.defaultObject}
                    />
                )}
                {props.items && props.items.filter((item: any) => {
                    return !searchValue || JSON.stringify(item).toLowerCase().indexOf(searchValue) !== -1;
                }).map((item: any) => (
                    <Item
                        key={Math.random()}
                        id={getEditBoxId()}
                        onSave={props.onSave}
                        obj={item}
                        extraButton={props.extraButton}
                    />
                ))}
            </div>
        </div>
    )
}