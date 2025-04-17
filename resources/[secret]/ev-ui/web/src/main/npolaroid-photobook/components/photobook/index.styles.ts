import { makeStyles } from '@mui/styles';

export default makeStyles({
    photoBookBacking: {
        backgroundColor: 'rgb(200,200,200, 0.3)',
        padding: '3rem',
        borderRadius: '0.5rem',
        position: 'relative',
        height: '90vh',
        width: '75vw'
    },
    photobookPlastic: {
        padding: '3rem',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr',
        rowGap: '5rem',
        columnGap: '5rem',
        overflowY: 'scroll',
        pointerEvents: 'all',
        userSelect: 'none',
        animation: 'fadeIn 2s'
    },
    tapeSection: {
        position: 'absolute',
        width: '100%',
        '&:first-of-type': {
            top: '0'
        },
        '&:last-of-type': {
            bottom: '0'
        },
        '&:before, &:after': {
            content: '""',
            width: '5vmin',
            height: '2vmin',
            position: 'absolute',
            backgroundColor: '#dbd8be',
            opacity: '0.6',
            borderRight: '1px dotted #b7b49d',
            borderLeft: '1px dotted #b7b49d'
        },
        '&:last-of-type:after': {
            transform: 'rotate(-55deg)',
            right: '-2vmin',
            top: '-2vmin'
        },
        '&:first-of-type:before': {
            transform: 'rotate(-55deg)',
            left: '-2vmin'
        },
        '&:first-of-type:after': {
            right: '-2vmin',
            opacity: 0,
            top: 0
        },
        '&:last-of-type:before': {
            transform: 'rotate(55deg)',
            left: '-2vmin',
            bottom: '0',
            opacity: 0
        }
    },
    photoAction: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '1rem',
        gap: '1.5rem'
    }
});