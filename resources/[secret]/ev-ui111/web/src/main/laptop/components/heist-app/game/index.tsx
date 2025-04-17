import { Typography } from '@mui/material';
import React from 'react';
import useStyles from './index.styles';
import Square from './square';
import qteclick from 'assets/qteclick.ogg';
import short_beep_success from 'assets/short_beep_success.ogg';

const patterns = ['cross', 'circle', 'ushape', 'dshape', 'special1'];

function Cross(coord: any, ...args: any) {
    const arg2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'cross';
    const arg3 = arguments.length > 2 ? arguments[2] : void 0;
    const array = [];
    const x = coord.x;
    const y = coord.y;

    const found = arg3.find((item) => item.x === x && item.y === y - 1);
    const found1 = arg3.find((item) => item.x === x && item.y === y + 1);
    const found2 = arg3.find((item) => item.x === x - 1 && item.y === y);
    const found3 = arg3.find((item) => item.x === x + 1 && item.y === y);
    const found4 = arg3.find((item) => item.x === x - 1 && item.y === y - 1);
    const found5 = arg3.find((item) => item.x === x + 1 && item.y === y - 1);
    const found6 = arg3.find((item) => item.x === x - 1 && item.y === y + 1);
    const found7 = arg3.find((item) => item.x === x + 1 && item.y === y + 1);

    if (arg2 === 'cross') {
        found && array.push(found);
        found1 && array.push(found1);
        found2 && array.push(found2);
        found3 && array.push(found3);
    }

    if (arg2 === 'circle') {
        found && array.push(found);
        found1 && array.push(found1);
        found2 && array.push(found2);
        found3 && array.push(found3);
        found4 && array.push(found4);
        found5 && array.push(found5);
        found6 && array.push(found6);
        found7 && array.push(found7);
    }

    if (arg2 === 'ushape') {
        found && array.push(found);
        found1 && array.push(found1);
        found2 && array.push(found2);
        found3 && array.push(found3);
        found4 && array.push(found4);
        found5 && array.push(found5);
    }

    if (arg2 === 'dshape') {
        found && array.push(found);
        found1 && array.push(found1);
        found2 && array.push(found2);
        found3 && array.push(found3);
        found6 && array.push(found6);
        found4 && array.push(found4);
    }

    if (arg2 === 'special1') {
        found && array.push(found);
        found1 && array.push(found1);
        found3 && array.push(found3);
        found4 && array.push(found4);
    }

    return array;
}

export default (props: any) => {
    const classes = useStyles(props);
    const [blocks, setBlocks] = React.useState([]);
    const [totalBlocks, setTotalBlocks] = React.useState(0);
    const [clickedBlocks, setClickedBlocks] = React.useState(0);
    const [blocksRemaining, setBlocksRemaining] = React.useState(0);

    const playSound = React.useCallback((success: boolean) => {
        const audio = new Audio(success ? short_beep_success : qteclick);
        audio.volume = 0.1;
        audio.controls = false;
        audio.play();

        setTimeout(() => {
            audio.remove();
        }, 300);
    }, []);

    const clickSquare = (squareId: string, bool = true) => {
        const blocksCopy = [...blocks];
        const foundBlock = blocksCopy.find((block: any) => block.id === squareId);

        if (foundBlock) {
            let clickedIdx = foundBlock.isClicked ? 1 : 0;

            setBlocksRemaining((prev) => prev + 1);

            foundBlock.isClicked = false;

            const crossBlocks = Cross(foundBlock, foundBlock.pattern, blocks);

            crossBlocks.forEach((block: any) => {
                block.isClicked && clickedIdx++;
                block.isClicked = false;
            });

            setClickedBlocks((prev) => prev + clickedIdx);

            const everyNotClicked = blocksCopy.every((block: any) => !block.isClicked);

            if (everyNotClicked) {
                playSound(true);
                props.gameCallback(true);
                setBlocks(blocksCopy);
                return;
            }

            if (blocksRemaining + 1 >= 20) {
                props.gameCallback(false);
                setBlocks(blocksCopy);
                return;
            }

            bool && playSound(false);

            setBlocks(blocksCopy);
        }
    }

    const highlightNeighbors = (squareId: number, highlight: boolean) => {
        const blocksCopy = [...blocks];
        const foundSquare = blocksCopy.find((block: any) => block.id === squareId);

        if (foundSquare) {
            foundSquare.highlight = highlight;

            Cross(foundSquare, foundSquare.pattern, blocks).forEach((square: any) => {
                square.highlight = highlight;
            });

            setBlocks(blocksCopy);
        }
    }

    React.useEffect(() => {
        if (blocks.length > 0) return;
        const gennedBlocks = [];

        for (let i = 0; i < props.gridX * props.gridY; i++) {
            const x = i % props.gridX;
            const y = Math.floor(i / props.gridX);

            gennedBlocks.push({
                id: i,
                x: x,
                y: y,
                isClicked: false,
                showNumber: false,
                highlight: false,
                number: i,
                pattern: patterns[Math.floor(Math.random() * patterns.length)]
            });
        }

        let clickedLength = gennedBlocks.filter((square) => square.isClicked).length;

        const clickFunc = (gridSize: number) => {
            const x = gridSize % props.gridX;
            const y = Math.floor(gridSize / props.gridX);

            const squareFound = gennedBlocks.find((block) => block.x === x && block.y === y);

            if (!squareFound) return 'continue';

            if (Math.random() < 0.5) {
                squareFound.isClicked = !squareFound.isClicked;

                Cross(squareFound, squareFound.pattern, gennedBlocks).forEach((square) => {
                    square.isClicked = !square.isClicked;
                });
            }
        }

        for (let i = clickedLength; i === 0 || i < props.gridX * props.gridY / 2; i++) {
            for (let j = 0; j < props.gridX * props.gridY; j++) {
                clickFunc(j);
            }
        }

        clickedLength = gennedBlocks.filter((block: any) => block.isClicked).length;

        setBlocks(gennedBlocks);
        setTotalBlocks(clickedLength);
    }, [props.gridX, props.gridY, props.gameCallback, playSound])

    return (
        <>
            <Typography style={{ color: 'white' }}>
                {totalBlocks - clickedBlocks} Blocks Remaining - {blocksRemaining} / 20
            </Typography>
            <div className={classes.boxClickBox}>
                {blocks && blocks.map((block: any) => (
                    <Square
                        key={block.id}
                        {...block}
                        {...props}
                        highlightNeighbors={highlightNeighbors}
                        clickSquare={clickSquare}
                    />
                ))}
            </div>
        </>
    )
}