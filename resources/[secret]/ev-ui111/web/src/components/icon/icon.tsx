import React from 'react';

interface IconProps {
    color?: any;
    size?: any;
    style?: any;
    icon: any;
    onClick?: any;
    transform?: any;
    fixedWidth?: boolean;
}

const Icon: React.FC<IconProps> = (props) => {
    return (
        <>
            <i onClick={props.onClick} className={`${Array.isArray(props.icon) ? props.icon[0] : 'fas'} fa-${Array.isArray(props.icon) ? props.icon[1] : props.icon} ${props.fixedWidth && 'fa-fw'} fa-${props.size ?? 'lg' }`} style={{ color: props.color ?? 'white', ...props.style, transform: props.transform ?? 'unset' }}>{props.children}</i>
        </>
    );
}

export default Icon;