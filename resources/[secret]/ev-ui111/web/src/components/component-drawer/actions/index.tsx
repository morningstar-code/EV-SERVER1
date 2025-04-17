import React, { FunctionComponent } from "react";
import { Tooltip, Typography } from "@mui/material";
import Icon from "components/icon/icon";

const Actions: FunctionComponent<any> = (props) => {
    const item = props.item;
    const showActions = props.showActions;
    
    return (
        <>
            <div className="icon">
                <i className={`fas fa-${item.icon} fa-fw fa-lg`} />
            </div>
            <div className="text">
                <Typography variant="body2" style={{ color: '#fff' }}>{item.text}</Typography>
            </div>
            {showActions && item?.actions?.length > 0 && (
                <div className="actions">
                    {item.actions.map((action: any, index: number) => (
                        <Tooltip key={`${action.icon}${action.title}`} title={item.title} sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div onClick={action.onClick ? (e) => {
                                action.onClick();
                                e.stopPropagation();
                            } : () => { } }>
                                <Icon icon={action.icon} size="lg" />
                            </div>
                        </Tooltip>
                    ))}
                </div>
            )}
        </>
    )
}

export default Actions;