import { makeStyles } from "@mui/styles";
import { baseStyles } from "lib/styles";
import { ResponsiveWidth } from "utils/responsive";

export default makeStyles({
    clickSquare: {
        height: '100%',
        width: '100%',
        backgroundColor: '#094D1C',
        borderRadius: '0.2vh',
        transition: 'background-color 0.1s ease'
    },
    clickableSquare: {
        backgroundColor: '#3DEC55',
    },
    clickSquareWasClicked: {
        backgroundColor: '#3DEC55',
    },
    clickSquareHovered: {
        backgroundColor: '#469751',
    },
    clickedSquareHovered: {
        backgroundColor: '#bef3c5',
    },
    clickSquareFailedClick: {
        backgroundColor: '#FF0000',
    },
    boxClickBox: function (props: any) {
        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${props.gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${props.gridSize}, 1fr)`,
            gridGap: ResponsiveWidth(16),
            width: '100%',
            height: '100%',
            padding: props.gridSize > 7 ? '2%' : '4%'
        }
    },
    clickSquareNumber: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none'
    }
});