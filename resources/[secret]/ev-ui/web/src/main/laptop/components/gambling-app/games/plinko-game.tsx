import React from "react";

export default () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        //PLINKO GAME
        const plinko = {
            rows: 10,
            columns: 10,
            width: 50,
            height: 50,
            radius: 10,
            color: '#000000',
            ball: {
                radius: 10,
                color: '#ffffff'
            }
        }

        const drawPlinko = () => {
            ctx.fillStyle = plinko.color;

            for (let i = 0; i < plinko.rows; i++) {
                for (let j = 0; j < plinko.columns; j++) {
                    ctx.beginPath();
                    ctx.arc(j * plinko.width + (i % 2 === 0 ? 0 : plinko.width / 2), i * plinko.height, plinko.radius, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }

        const drawBall = (x: number, y: number) => {
            'use strict';
            ctx.fillStyle = plinko.ball.color;
            ctx.beginPath();
            ctx.arc(x, y, plinko.ball.radius, 0, 2 * Math.PI);
            ctx.fill();
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPlinko();
            drawBall(0, 0);
        }

        draw();

        // const animate = () => {
        //     requestAnimationFrame(animate);
        //     draw();
        // }

        // animate();
    }, []);

    return (
        <canvas ref={canvasRef} height={570} width={760} />
    )
}