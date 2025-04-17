import React, { useEffect } from 'react';
import HudCircle from '../../hud-circle';

const Blackjack: React.FC = () => {
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
                    icon="stopwatch-20"
                    transitionTime="20s"
                    iconSize={16}
                />
            </div>
        </>
    );
}

export const MemoBlackjack = React.memo(Blackjack);