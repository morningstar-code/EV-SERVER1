import { Tooltip } from '@mui/material';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.left}>
                {props.children}
            </div>
            <div className={classes.right}>
                <div className={`${classes.menuItem} ${classes.logo}`}>
                    <img src="https://i.imgur.com/N4vNhB3.png" alt="https://i.imgur.com/N4vNhB3.png" />
                </div>
                {props.items && props.items.length > 0 && props.items.map((item: any) => (
                    <Tooltip key={item.id} title={item.label} placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div
                            className={`${classes.menuItem} ${props.activeItem === item.id ? classes.menuItemActive : null}`}
                            onClick={() => props.onMenuItemClick(item)}
                        >
                            {item.icon}
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}