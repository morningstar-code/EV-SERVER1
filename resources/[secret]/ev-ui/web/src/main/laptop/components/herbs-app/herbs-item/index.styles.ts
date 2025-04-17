import { makeStyles } from '@mui/styles';

export default makeStyles({
    herbItem: {
        display: 'flex',
        borderRadius: 3,
        padding: '1rem',
        alignItems: 'center',
        background: '#303030',
        flexDirection: 'column',
        boxShadow: 'hsl(0deg 0% 0% / 8%) 0px -1px 5px 4px'
    },
    herbStrainTitle: {
        color: '#D6D6D6',
        margin: '0px !important',
        padding: '0px !important',
        fontSize: '1.75vh !important',
        fontWeight: 'bold !important',
        width: '100% !important',
        textAlign: 'center',
        paddingBottom: '0.5rem'
    },
    herbStrainLevels: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '1rem',
        width: '100%'
    },
    herbsProgressParent: {
        width: '100% !important',
        height: '1vh !important',
        borderRadius: '2px !important',
        padding: '0.15rem !important',
        background: '#515151 !important'
    },
    herbsProgress: {
        borderRadius: '2px !important',
        height: '100% !important',
        background: '#56AA78 !important'
    },
    herbStrainCreatedDate: {
        fontSize: '1.3vh !important',
        display: 'block !important',
        marginTop: '0.7rem !important'
    },
    herbData: {
        display: 'flex',
        width: '100%',
        marginTop: '1rem',
        justifyContent: 'space-between'
    },
    herbInput: {
        width: '100%',
        height: '1vh',
        borderRadius: '2px',
        padding: '0.15rem',
        margin: '0.5rem',
        background: '#515151'
    },
    herbInputValue: {
        borderRadius: '2px',
        height: '100%',
        background: '#959595'
    }
});