import React, { FunctionComponent } from "react";
import useStyles from "./index.styles"

const MultiPager: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    if (props.landscapeOptions.split) {
        const pagesLeft = props.pages.find(page => page.index === props.landscapeOptions.indexLeft);
        const pagesRight = props.pages.find(page => page.index === props.landscapeOptions.indexRight);
        const hideRight = !!props.landscapeOptions.hideRight;

        return (
            <div className="inner-phone-app-container-multi-pager inner-phone-app-container-multi-pager-landscape">
                <div className={`page ${hideRight ? '' : 'page-landscape-left'}`}>
                    {pagesLeft.content}
                </div>
                <div className={`page page-landscape-right ${hideRight ? 'page-landscape-right-hidden' : ''}`}>
                    {pagesRight.content}
                </div>
            </div>
        )
    }

    return (
        <div className={classes.wrapper}>
            {props.pages.map((page: any) => {
                const classNames = [classes.page];

                if (page.index < props.activeIndex) {
                    classNames.push(
                        `${classes.hide} ${classes.hideLeft}`
                    )
                } else if (page.index > props.activeIndex) {
                    classNames.push(
                        `${classes.hide} ${classes.hideRight}`
                    );
                }

                return (
                    <div key={page.index} className={`${classNames.join(' ')}`}>
                        {page.content}
                    </div>
                )
            })}
        </div>
    );
}

export default MultiPager;