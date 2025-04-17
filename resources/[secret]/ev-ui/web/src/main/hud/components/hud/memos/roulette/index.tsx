import React, { useEffect } from 'react';
import HudCircle from '../../hud-circle';

const Roulette: React.FC = () => {
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
                    color="#5C6BC0"
                    fill={value}
                    icon="stopwatch"
                    transitionTime="60s"
                    iconSize={16}
                />
            </div>
        </>
    );
}

export const MemoRoulette = React.memo(Roulette);