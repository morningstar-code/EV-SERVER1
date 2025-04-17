import React from "react";
import useStyles from "./chat-container.styles";

const getScrollTop = (element: any) => {
    return element.scrollTop;
}

export default (props: any) => {
    const classes = useStyles();

    const [scrollTop, setScrollTop] = React.useState(0);
    const [shouldScroll, setShouldScroll] = React.useState(true);

    const wrapperRef = React.createRef<any>();

    React.useEffect(() => {
        const wrapper = wrapperRef.current;
        setScrollTop(getScrollTop(wrapper));

        const onScroll = (e: any) => {
            let target;
            let targetScrollTop = getScrollTop(e.target);

            setScrollTop(targetScrollTop);
            setShouldScroll(
                targetScrollTop ===
                (target = e.target).scrollHeight -
                target.offsetHeight
            );
        };

        wrapper?.addEventListener("scroll", onScroll);

        return () => wrapper?.removeEventListener("scroll", onScroll);
    }, []);

    React.useEffect(() => {
        shouldScroll
            ? wrapperRef?.current?.scrollTo(0, wrapperRef?.current?.scrollHeight ?? 0)
            : wrapperRef?.current?.scrollTo(0, scrollTop ?? wrapperRef?.current?.scrollHeight);
    }, [props, shouldScroll, wrapperRef, scrollTop]);

    return (
        <div className={classes.wrapper} ref={wrapperRef}>
            {props.children}
        </div>
    )
}