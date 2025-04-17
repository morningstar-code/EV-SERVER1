import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import { mdtPages } from '../';
import useStyles from '../index.styles';
import Navbar from '../navbar';

export default (props: any) => {
    const classes = useStyles(props);
    const foundPage = mdtPages.find((page) => page.name === props.page);
    const pageKey = `${props.storeKey}.${foundPage.name}`;

    const { mapStateToProps, mapDispatchToProps } = compose({
        initialState: {},
        key: pageKey
    });

    const PageComponent = connect(mapStateToProps, mapDispatchToProps)(foundPage.component);

    return (
        <>
            <div className={classes.navLeft}>
                <Navbar {...props} pages={mdtPages} />
            </div>
            <div className={classes.contentRight}>
                <PageComponent {...props} myStoreKey={pageKey} />
            </div>
        </>
    )
}