import React, { useEffect } from 'react';
import HudCircle from '../../hud-circle';

const Nos: React.FC = () => {
    const [value, setValue] = React.useState(100);

    useEffect(() => {
        setTimeout(() => {
            return setValue(0)
        }, 0)
    }, [])

    return (
        <>
            <div>
                <HudCircle 
                    color="#e43f5a"
                    fill={value}
                    icon="meteor"
                    iconColor="#e43f5a"
                    transitionTime="5s"
                    iconSize={16}
                />
            </div>
        </>
    );
}

export const MemoNos = React.memo(Nos);