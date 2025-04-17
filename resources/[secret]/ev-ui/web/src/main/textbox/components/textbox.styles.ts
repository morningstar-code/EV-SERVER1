import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        minWidth: ResponsiveWidth(256),
        maxWidth: ResponsiveWidth(720),

        background: 'radial-gradient(circle, rgba(51,60,69,0.8) 0%, rgba(39,43,47,0.6) 100%)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        borderRadius: '2px',

        padding: ResponsiveWidth(16),

        pointerEvents: 'all'
    },
    inputs: {
        minWidth: ResponsiveWidth(256),
        maxWidth: ResponsiveWidth(720)
    },
    text: {
        color: baseStyles.textColor(),
        fontFamily: 'Arial, Helvetica, sans-serif',
        marginBottom: 16
    },
    button: { 
        display: 'flex',
        
        justifyContent: 'center',
        alignItems: 'center',

        padding: ResponsiveWidth(16),
        paddingTop: 0,
    }
});