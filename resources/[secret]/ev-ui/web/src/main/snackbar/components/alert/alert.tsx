import React from 'react'
import { Alert } from '@mui/material';

const AlertComponent: React.FC<any> = (props) => {
    return (
        <Alert
            elevation={6}
            variant="filled"
            {...props}
            style={{ color: '#fff' }}
        />
    );
}

export default AlertComponent;