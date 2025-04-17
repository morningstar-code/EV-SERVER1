import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight } from '../../../../../../../utils/responsive';

export default makeStyles({
    myAd: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ResponsiveHeight(16)
    },
    ad: {
        width: '100%',
        backgroundColor: baseStyles.colorYellow(),
        display: 'flex',
        flexDirection: 'column',
        color: baseStyles.bgPrimary(),
        border: `1px solid ${baseStyles.bgPrimary()}`,
        textAlign: 'center',
        marginBottom: ResponsiveHeight(16)
    },
    details: {
        display: 'flex',
        padding: '4px',
        borderTop: `1px solid ${baseStyles.bgPrimary()}`
    },
    name: {
        flex: 1,
        borderRight: `1px solid ${baseStyles.bgPrimary()}`
    }
});