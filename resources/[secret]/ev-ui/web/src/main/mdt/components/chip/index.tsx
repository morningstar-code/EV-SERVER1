import { Chip } from '@mui/material';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles(props);
    const propCopy = { ...props };

    delete propCopy.textColor;
    delete propCopy.bgColor;
    delete propCopy.noLabel;

    return (
        <>
            {props.noLabel ? (
                <div className={classes.chipNoLabel} onClick={() => !!props.onClick && props.onClick()}>
                    <Chip
                        icon={props.icon ? (
                            <i className={`fas fa-${props.icon} fa-fw fa-${props.iconSize || 'sm'}`} style={{ color: props.textColor, textAlign: 'center' }} />
                        ) : null}
                        style={{ color: props.textColor, textAlign: 'center' }}
                        sx={{ "& .MuiChip-deleteIcon": { color: props.textColor } }}
                    />
                </div>
            ) : (
                <Chip
                    {...propCopy}
                    className={classes.wrapper}
                    icon={props.icon ? (
                        <i className={`fas fa-${props.icon} fa-fw fa-${props.iconSize || 'sm'}`} style={{ color: props.textColor }} />
                    ) : null}
                    style={{ backgroundColor: props.bgColor, color: props.textColor, ...props.style || {} }}
                    sx={{ "& .MuiChip-deleteIcon": { color: props.textColor } }}
                />
            )}
        </>
    )
}