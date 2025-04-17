import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        marginBottom: ResponsiveHeight(4)
    },
    wrapperCharge: {
        marginBottom: ResponsiveHeight(4)
    },
    contentCharge: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    charge: {
        width: '23%',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: ResponsiveHeight(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid black',
        padding: ResponsiveWidth(4),
        backgroundColor: 'rgb(65, 113, 17)',
        '& p': {
            textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F'
        }
    },
    chargeFelony: {
        backgroundColor: 'rgb(128, 89, 0)'
    },
    chargeHut: {
        backgroundColor: '#802000'
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: ResponsiveHeight(4),
        marginTop: ResponsiveHeight(2)
    },
    accessoryTitle: {
        textAlign: 'center',
        width: '100%',
        margin: ResponsiveHeight(2),
        marginBottom: 0,
        paddingTop: ResponsiveHeight(2),
        borderTop: '1px solid black'
    },
    descriptionBox: {
        padding: ResponsiveWidth(4),
        border: '1px solid black',
        backgroundColor: baseStyles.bgPrimary()
    },
    tooltipWidth: {
        maxWidth: '50%'
    }
});