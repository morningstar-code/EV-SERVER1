import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();
    let pagerType = 'pagerPillbox';

    switch (props.hospital) {
        case 'sandy':
            pagerType = 'pagerSandy';
            break;
        case 'central':
            pagerType = 'pagerCentral';
            break;
    }

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.pager} ${classes[pagerType]}`} />
        </div>
    )
}