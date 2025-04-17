import React from "react";
import { Tooltip } from "@mui/material";
import "./component-paper.scss";

function ComponentPaper({
    children,
    actions = [],
    className = '',
    drawer = null,
    notifications = false,
    notificationsColor = '#4DD0E1',
    onClick,
    expandDrawerOnActionClick = false,
    style = {},
}: any) {
    const [showActions, setShowActions] = React.useState(false);
    const [drawerExpanded, setDrawerExpanded] = React.useState(false);

    return (
        <div className={`component-paper ${className}`} onClick={onClick ? () => onClick() : () => { }} style={style}>
            {notifications && (
                <div className="notification" style={{ backgroundColor: notificationsColor }}></div>
            )}
            <div className="main-container" onClick={() => {
                if (drawer !== null) {
                    setDrawerExpanded(!drawerExpanded);
                }
            }}
                onMouseEnter={() => setShowActions(true)}
                onMouseLeave={() => setShowActions(false)}
            >
                {children}
                {showActions && actions.length > 0 && (
                    <div className={`actions ${showActions && 'actions-show'}`}>
                        {actions.map((action: any, index: number) => (
                            <Tooltip key={`${action.icon}${action.title}`} title={action.title} sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                <div onClick={action.onClick ? (e) => {
                                    action.onClick();
                                    expandDrawerOnActionClick || e.stopPropagation();
                                } : () => { }}>
                                    <i className={`fas fa-${action.icon} fa-fw fa-lg`} style={{ color: '#fff' }}></i>
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                )}
            </div>
            {drawer !== null && drawerExpanded && (
                <div className="drawer">
                    {drawer}
                </div>
            )}
        </div>
    );
}

export {
    ComponentPaper
}