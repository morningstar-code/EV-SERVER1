import React from 'react';
import Typography from '@mui/material/Typography';

interface TextProps {
    variant?: any;
    className?: string;
    style?: any;
    sx?: any;
    gutterBottom?: boolean;
}

const Text: React.FC<TextProps> = (props) => {
    return (
        <Typography className={props.className} variant={props.variant} style={{ color: 'white', ...props.style }} sx={props.sx} gutterBottom={props.gutterBottom}>
            {props.children}
        </Typography>
    );
}

export default Text;