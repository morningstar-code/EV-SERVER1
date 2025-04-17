import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: function (props: any) {
        return {
            display: 'flex',
            flexDirection: 'column',
            height: props.autoHeight ? 'auto' : '100%',
            width: '100%',
            backgroundColor: baseStyles.bgTertiary()
        }
    },
    title: {
        minHeight: 48,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: ResponsiveWidth(8)
    },
    titleText: {},
    actions: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },
    searchBar: {
        maxWidth: '40%',
        paddingRight: ResponsiveWidth(8)
    },
    content: {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowY: 'auto',
        padding: ResponsiveWidth(8)
    },
    flexRow: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});