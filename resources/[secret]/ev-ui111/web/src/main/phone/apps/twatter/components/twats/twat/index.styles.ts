import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: {
        marginBottom: ResponsiveHeight(16),
        background: baseStyles.colorTwat(),
        width: '100%',
        padding: `${ResponsiveHeight(4)} ${ResponsiveWidth(8)}`,
        borderRadius: ResponsiveHeight(4)
    },
    content: {
        margin: `${ResponsiveHeight(8)} 0`,
        '> p': {
            wordWrap: 'break-word'
        }
    },
    footer: {
        display: 'flex'
    },
    when: {
        textAlign: 'right',
        flex: 1
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        '& div': {
            marginRight: ResponsiveWidth(8)
        }
    },
    codeButton: {
        marginBottom: `${ResponsiveHeight(8)} !important`
    }
});