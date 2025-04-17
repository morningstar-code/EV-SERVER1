import React from 'react';
import useStyles from './index.styles';

export default (props: any) => {
    const [offset, setOffset] = React.useState({
        x: 0,
        y: 0
    });
    const [flipped, setFlipped] = React.useState(false);
    const classes = useStyles({
        flipped: flipped,
        offset: offset
    });

    const handleMouseMove = React.useCallback((event: any) => {
        const width = window.innerWidth / 2 - event.clientX;
        const height = window.innerHeight / 2 - event.clientY;
        let x = 0;
        let y = 0;

        setOffset({
            x: (x += 0.03125 * (-width - x)),
            y: (y += 0.03125 * (height - y))
        });
    }, [0.03125]);

    React.useEffect(() => {
        const audio = new Audio('https://cdn.discordapp.com/attachments/896231955895570462/896925960505528350/octupus.mp3');
        audio.volume = 0.01;
        audio.play();

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            audio && audio.pause();
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [handleMouseMove]);

    const handleClickCard = () => {
        setFlipped(!flipped);

        const el = document.createElement('textarea');
        el.innerText = props.inviteCode;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        el.remove();
    }

    return (
        <div className={classes.card} style={{ pointerEvents: 'all', transform: `perspective(600px) rotateY(${offset.x}deg) rotateX(${offset.y}deg)` }} onClick={handleClickCard}>
            <div className={classes.front}>
                <div className={classes.circleShape}></div>
                <div className={classes.triangleShape}>
                    <div className={classes.innerTriangle}></div>
                </div>
                <div className={classes.squareShape}></div>
            </div>
            <div className={classes.back}>
                <div className={classes.cardNumber}>
                    {props.cardNumber}
                </div>
                <div className={classes.instructions}>
                    You have received more instructions in your clipboard.
                    <br />
                    Do not show it to anyone else.
                </div>
            </div>
        </div>
    )
}