import { Typography } from '@mui/material';
import Button from 'components/button/button';
import Input from 'components/input/input';
import React from 'react';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles(props);
    const [search, setSearch] = React.useState(props.searchValue);

    return (
        <div className={`${classes.wrapper} ${props.className || ''}`} style={props.style || {}}>
            <div className={classes.title}>
                <div className={classes.titleText}>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        {props.title}
                    </Typography>
                </div>
                {props.button && (
                    <div className={classes.actions}>
                        <Button.Primary>
                            Create
                        </Button.Primary>
                    </div>
                )}
                {props.search && (
                    <div className={classes.searchBar}>
                        <Input.Search
                            onChange={(value: any) => {
                                setSearch(value);
                                props.onChangeSearch(value);
                            }}
                            value={search}
                        />
                    </div>
                )}
                {props.actions && props.actions}
            </div>
            {!!props.children && (
                <div className={`${classes.content} ${props.flexRow ? classes.flexRow : ''} ${props.contentClassName || ''}`}>
                    {props.children}
                </div>
            )}
        </div>
    )
}