import React from 'react';
import useStyles from './index.styles';
import { Typography } from '@mui/material';

interface GeneralManagerProps {
    activeItem: number;
    items: NavbarItem[];
    onMenuItemClick: (item: NavbarItem) => void;
}

const GeneralManager: React.FC<GeneralManagerProps> = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                <div className={classes.left}>
                    {props.items && props.items.map((item, index) => (
                        <div key={item.id} className={`${classes.menuItem} ${props.activeItem === item.id ? classes.menuItemActive : ''}`} onClick={() => props.onMenuItemClick(item)}>
                            <Typography variant="body1" style={{ color: 'white' }}>{item.label}</Typography>
                        </div>
                    ))}
                </div>
                <div className={classes.right}>
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default GeneralManager;