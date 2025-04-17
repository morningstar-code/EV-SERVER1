import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";
import Square from "./square";

function Cross(coord: any, ...args: any) {
    const arg2 =
        arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : 'cross';
    const arg3 = arguments.length > 2 ? arguments[2] : void 0;
    const array = [];
    const x = coord.x;
    const y = coord.y;

    if (arg2 === 'cross') {
        const found = arg3.find((item) => item.x === x && item.y === y - 1);
        const found1 = arg3.find((item) => item.x === x && item.y === y + 1);
        const found2 = arg3.find((item) => item.x === x - 1 && item.y === y);
        const found3 = arg3.find((item) => item.x === x + 1 && item.y === y);

        found && array.push(found);
        found1 && array.push(found1);
        found2 && array.push(found2);
        found3 && array.push(found3);
    }

    return array;
}

const Game: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);
    const [state, setState] = React.useState([]);

    const playSound = React.useCallback((bool: boolean) => {
        const sound = new Audio(bool ? '' : '');
        sound.volume = bool ? 0.1 : 0.05;
        sound.controls = false;
        sound.play();

        setTimeout(() => {
            sound.remove();
        }, 300);
    }, []);

    const handleClickSquare = (squareId: number, bool?: boolean) => {
        const newState = [...state];
        const foundSquare = newState.find((square) => square.id === squareId);

        if (foundSquare) {
            foundSquare.isClicked = !(null === foundSquare ||
                void 0 === foundSquare
                ? void 0
                : foundSquare.isClicked)

            const cross = Cross(foundSquare, 'cross', state);

            cross.forEach((square) => {
                square.isClicked = !(null === square ||
                    void 0 === square
                    ? void 0
                    : square.isClicked)
            });

            const every = newState.every((square) => square.isClicked);

            if (every) {
                playSound(true);
                props.gameCallback(true);
                setState(newState);
            }

            bool && playSound(false);

            setState(newState);
        }
    }

    const handleHighlightNeighbors = (squareId: number, highlight: any) => {
        const squares = [...state];

        const foundSquare = squares.find((square) => square.id === squareId);

        if (foundSquare) {
            foundSquare.highlight = highlight;

            const cross = Cross(foundSquare, 'cross', state);

            cross.forEach((square) => {
                square.highlight = highlight;
            });

            setState(squares);
        }
    }

    React.useEffect(() => {
        const squares = [];

        for (let i = 0; i < props.gridSize * props.gridSize; i++) {
            const x = i % props.gridSize;
            const y = Math.floor(i / props.gridSize);

            squares.push({
                id: i,
                x: x,
                y: y,
                isClicked: false,
                showNumber: false,
                highlight: false,
                number: i
            });
        }

        let clickedLength = squares.filter((square) => square.isClicked).length;
        
        const clickFunc = (gridSize: number) => {
            const x = gridSize % props.gridSize;
            const y = Math.floor(gridSize / props.gridSize);

            const squareFound = squares.find((square) => square.x === x && square.y === y);

            if (!squareFound) return 'continue';

            if (Math.random() < 0.5) {
                squareFound.isClicked = !squareFound.isClicked;

                Cross(squareFound, 'cross', squares).forEach((square) => {
                    square.isClicked = !square.isClicked;
                });
            }
        }
        
        for (let i = clickedLength; i === 0 || i <= props.gridSize; i++) {
            for (let j = 0; j < props.gridSize * props.gridSize; j++) {
                clickFunc(j);
            }
            clickedLength = squares.filter((square) => square.isClicked).length;
        }

        setState(squares);
    }, [props.gridSize, props.gameCallback, playSound]);

    return (
        <div className={classes.boxClickBox}>
            {state.map((square) => (
                <Square key={square.id} square={square} {...props} clickSquare={handleClickSquare} highlightNeighbors={handleHighlightNeighbors} />
            ))}
        </div>
    );
}

export default Game;