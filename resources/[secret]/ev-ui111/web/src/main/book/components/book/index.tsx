import useStyles from './index.styles';
import HTMLFlipBook from 'react-pageflip';

export default (props: any) => {
    const classes = useStyles();
    let width = props.width;
    let height = props.height;
    const widthCalc = 0.48 * window.innerWidth;
    const heightCalc = 0.9 * window.innerHeight;

    if (width > widthCalc || height > heightCalc) {
        const calc = Math.min(widthCalc / width, heightCalc / height);
        width = Math.round(width * calc);
        height = Math.round(height * calc);
    }

    return (
        <div className={classes.container} style={{ height: height, width: 2 * width }}>
            <HTMLFlipBook
                width={width}
                height={height}
                size="fixed"
                maxShadowOpacity={0.5}
                showCover={true}
                className="demo-book"
                drawShadow={false}
                minWidth={300}
                maxWidth={width}
                minHeight={500}
                maxHeight={height}
                flippingTime={1000}
                usePortrait={true}
                startZIndex={1}
                autoSize={true}
                mobileScrollSupport={true}
                swipeDistance={30}
                clickEventForward={true}
                useMouseEvents={true}
                startPage={0}
                showPageCorners={true}
                disableFlipByClick={false}
                style={{}}
            >
                {props.pages && props.pages.map((page: any, index: number) => (
                    <div key={`page_${index}`}>
                        <img
                            src={page}
                            width={width}
                            height={height}
                            alt="page"
                        />
                    </div>
                ))}
            </HTMLFlipBook>
        </div>
    )
}