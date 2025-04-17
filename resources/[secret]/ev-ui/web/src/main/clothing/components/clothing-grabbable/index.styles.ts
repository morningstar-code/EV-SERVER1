import { makeStyles } from "@mui/styles";

export default makeStyles({
    grabbable: {
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'all',
        width: '75vw',
        height: '100vh',
        cursor: 'ew-resize'
    }
});