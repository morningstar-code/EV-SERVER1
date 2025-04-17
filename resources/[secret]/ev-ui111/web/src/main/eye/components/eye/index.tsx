import React from 'react';
import Typography from '@mui/material/Typography';
import useStyles from "./index.styles";

const Eye: React.FC<any> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <img
                src={props?.active ? 'https://dvexdev.github.io/DveX.Images/peek-active-1.png' : 'https://dvexdev.github.io/DveX.Images/peek.png'}
                alt="peek"
                style={{ maxWidth: '2.5vw', maxHeight: '2.5vw' }}
            />
            <div className={classes.options}>
                {props?.visible.sort((a, b) => a.index - b.index).map((item, index) => (
                    <div key={index} className={classes.option} onClick={() => props?.selectOption(item)}>
                        <i className={`fas fa-${item.icon} fa-fw fa-lg ${classes.optionIcon}`}></i>
                        <Typography variant="h6" style={{ color: '#fff' }}>
                            {item.label}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Eye;