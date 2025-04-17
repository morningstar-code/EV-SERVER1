import React, { useEffect } from 'react';
import HudCircle from '../../hud-circle';

const Boosting: React.FC = () => {
    const [value, setValue] = React.useState(100);

    useEffect(() => {
        setTimeout(() => {
            return setValue(0)
        } , 32)
    }, [])

    return (
        <>
            <div>
                <HudCircle 
                    color="#e43f5a"
                    fill={value}
                    icon="stopwatch"
                    transitionTime="30s"
                    iconSize={16}
                />
            </div>
        </>
    );
}

export const MemoBoosting = React.memo(Boosting);