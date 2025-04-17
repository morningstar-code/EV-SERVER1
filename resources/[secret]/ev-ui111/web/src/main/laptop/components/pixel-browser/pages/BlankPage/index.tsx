import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';

const BlankPage: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
        </div>
    );
}

export default BlankPage;