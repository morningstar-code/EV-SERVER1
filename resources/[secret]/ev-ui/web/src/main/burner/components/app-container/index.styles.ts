import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

export default makeStyles({
    wrapper: function(data: any) {
        return {
            position: 'relative',
            overflow: 'hidden',
            background: data.background ? data.background : baseStyles.bgPrimary(),
            paddingBottom: ResponsiveHeight(40),
            paddingTop: ResponsiveHeight(32),
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            boxShadow: 'none',
            opacity: 1,
            animation: false === data.fadeIn ? 'unset' : 'fadeinpls',
            animationIterationCount: 1,
            animationDuration: '800ms'
        }
    },
    container: function(data: any) {
        return {
            maxHeight: data.search ? `calc(100% - ${ResponsiveHeight(72)})` : '100%',
            minHeight: data.search ? `calc(100% - ${ResponsiveHeight(72)})` : '100%',
            height: data.search ? `calc(100% - ${ResponsiveHeight(72)})` : '100%',
            width: '100%',
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: data.removePadding ? 0 : `0 ${ResponsiveHeight(16)}`
        }
    },
    actions: {
        position: 'absolute',
        top: ResponsiveHeight(32),
        right: ResponsiveWidth(16),
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 1
    },
    action: {
        color: 'white',
        marginLeft: ResponsiveWidth(16)
    },
    searchContainer: function(data: any) {
        return {
            padding: data.removePadding ? 0 : `${ResponsiveHeight(8)} ${ResponsiveWidth(16)}`,
            marginBottom: ResponsiveHeight(8),
            position: 'relative',
            height: ResponsiveHeight(64),
            width: '100%',
            display: 'flex'
        }
    },
    search: {
        width: '100%',
        position: 'relative'
    },
    backButton: {
        display: 'flex',
        width: ResponsiveWidth(40),
        alignItems: 'center'
    }
});