import { makeStyles } from '@mui/styles';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from '../../../utils/responsive';

export default makeStyles({
    visibleWrapper: function (props: any) {
        return {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: props.show ? 'all' : 'none',
            visibility: props.show ? 'visible' : 'hidden',
            transition: 'visibility 400ms ease-out',
            zIndex: 100
        }
    },
    wrapper: function (props: any) {
        return {
            display: 'flex',
            width: '98vw',
            height: '96vh',
            backgroundColor: baseStyles.bgSecondary(),
            flexDirection: 'column',
            position: 'absolute',
            opacity: props.fadeOut ? 0.4 : 1,
            top: props.show ? '2vh' : 'calc(100vh + 32px)',
            transition: 'top 400ms ease-out'
        }
    },
    appContainer: {
        height: '82.5%',
        width: '100%',
        display: 'flex',
        position: 'relative'
    },
    appContainerInner: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        display: 'flex'
    },
    navLeft: {
        width: '10%',
        height: '100%'
    },
    contentRight: {
        width: '90%',
        height: '100%',
        padding: ResponsiveWidth(8)
    },
    navWrapper: {
        backgroundColor: baseStyles.bgPrimary(),
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    mainMenu: {
        flex: 1
    },
    navItem: {
        padding: ResponsiveWidth(16),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: baseStyles.bgSecondary()
        }
    },
    navActive: {
        backgroundColor: baseStyles.bgSecondary()
    },
    contentWrapper: {
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    contentWrapperColumn: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column'
    },
    contentWrapperAuto: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '100%',
        overflowY: 'auto'
    },
    spacer: {
        width: ResponsiveWidth(16)
    },
    verticalStack: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '100%',
        overflowY: 'scroll',
        '& > div': { marginBottom: ResponsiveHeight(8) }
    },
    flexSpaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentActions: {
        display: 'flex'
    },
    inputWrapper: {
        marginBottom: ResponsiveHeight(8)
    },
    inputWrapperFlex: {
        display: 'flex',
        marginBottom: ResponsiveHeight(8),
        '& > div': { flex: 1 }
    },
    flexChild: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputWrapperBorderTop: {
        borderTop: `2px solid ${baseStyles.bgPrimary()}`,
        paddingTop: ResponsiveHeight(8)
    },
    profileImageWrapper: {
        position: 'relative',
        minHeight: 208,
        minWidth: 208,
        maxHeight: 208,
        maxWidth: 208,
        marginRight: ResponsiveWidth(8),
        display: 'flex',
        alignItems: 'center'
    },
    profileImageWantedContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImageWanted: {
        width: 200
    },
    profileImage: {
        height: '100%',
        width: '100%',
        border: '2px solid black'
    },
    evidenceContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    spinnerContainer: {
        height: '40%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    markdownWrapper: {
        paddingTop: ResponsiveWidth(8),
        height: '100%',
        flex: 1,
        '> textarea': {
            height: '100%',
            borderBottom: 0,
        },
        '& > div, > div div': {
            minHeight: '100%',
            height: '100%',
            maxHeight: '100%',
            overflowY: 'scroll',
        },
        '& .ProseMirror': { padding: ResponsiveWidth(8) }
    },
    syncedDescription: {
        '& p': {
            fontSize: 'calc(.092592592vh * 16)',
            color: '#ffffff8c'
        }
    },
    modalItemButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: ResponsiveHeight(4),
        width: '100%',
        '& > div': { display: 'inline' }
    },
    topBar: {
        display: 'flex',
        height: '17.5%',
        width: '100%',
        backgroundColor: baseStyles.bgTertiary(),
        borderBottom: '2px solid #e43f5a',
        position: 'relative'
    },
    topBarLogo: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: ResponsiveWidth(16),
        '& img': {
            maxHeight: ResponsiveWidth(164),
            maxWidth: ResponsiveWidth(328)
        }
    },
    topBarTabs: {
        display: 'flex',
        alignItems: 'flex-end',
        flex: 1,
        paddingLeft: ResponsiveWidth(16)
    },
    topBarTabsWrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: ResponsiveWidth(16),
        paddingRight: ResponsiveWidth(16)
    },
    topBarTabsSpacer: {
        flex: 1
    },
    topBarTab: {
        position: 'relative',
        cursor: 'pointer',
        padding: ResponsiveWidth(16),
        paddingLeft: ResponsiveWidth(20),
        paddingRight: ResponsiveWidth(20),
        backgroundColor: baseStyles.bgSecondary(),
        height: ResponsiveHeight(44),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${baseStyles.bgSecondary()}`,
        borderBottom: 0,
        marginLeft: ResponsiveWidth(4),
        minWidth: ResponsiveWidth(142),
        '&:hover': {
            border: '2px solid #e43f5a',
            borderBottom: 0
        }
    },
    topBarActive: {
        border: '2px solid #e43f5a',
        borderBottom: 0
    },
    topBarTabCover: {
        position: 'absolute',
        width: '100%',
        left: 0,
        bottom: -4,
        height: 8,
        zIndex: 100,
        backgroundColor: baseStyles.bgSecondary()
    },
    topBarQuotes: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: ResponsiveWidth(8),
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0
    },
    topBarQuotesFiller: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: ResponsiveWidth(8)
    },
    topBarSpacer: {
        flex: 1
    },
    onlineStatus: {
        marginTop: 10
    },
    onlineStatusText: {
        color: 'rgb(74 224 13)',
        fontSize: 13
    },
    employeeButtons: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    judgeControlsWrapper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row-reverse',
        marginBottom: '0.5rem'
    }
});