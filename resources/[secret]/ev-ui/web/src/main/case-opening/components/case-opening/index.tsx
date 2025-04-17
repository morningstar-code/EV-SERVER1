import React from 'react';
import Button from 'components/button/button';
import { baseStyles } from 'lib/styles';
import { GetRandom } from 'utils/misc';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();
    const [finished, setFinished] = React.useState(false);
    const [spinActive, setSpinActive] = React.useState(false);
    const [calcedImageIdx, setCalcedImageIdx] = React.useState(0);
    const [images, setImages] = React.useState(props.images);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const imgs = props.images.map((img: any) => {
            images.visible = true;
            return img;
        });

        const arr = Array(15).fill(imgs).flat();
        const arr2 = imgs.map((img: any) => {
            return {
                ...img,
                end: true
            }
        });

        setImages([
            ...arr,
            ...arr2
        ]);
    }, [props.images]);

    const playCaseOpeningSound = React.useCallback(() => {
        const audio = new Audio('/sounds/case-opening.mp3');
        audio.volume = 0.1;
        audio.controls = false;
        audio.play();

        setTimeout(() => {
            audio.remove();
        }, 250);
    }, []);

    const spinCase = React.useCallback(() => {
        setSpinActive(true);

        const imagesLength = props.images.length;
        const imageIdx = props.correctImageIndex;
        const calculatedImageIdx = 425 * (15 * imagesLength + imageIdx) + GetRandom(-10, 10) + 600;

        setCalcedImageIdx(calculatedImageIdx);
    }, [props.correctImageIndex, props.images.length]);

    const caseTransitionStart = React.useCallback(() => {
        if (!finished) {
            const imagesLength = props.images.length;
            const imageIdx = props.correctImageIndex;
            let calc = 15;
            let idx = 0;
            let calculatedImageIdx = (0.2 * (calc * imagesLength + imageIdx) - 5) / 0.2;

            if (!(idx < calc - 5)) {
                return;
            }

            playCaseOpeningSound();

            idx >= 25 && (calculatedImageIdx += Math.exp(idx / 33));

            idx++;

            return;
        }
    }, [props.images.length, props.correctImageIndex, finished, playCaseOpeningSound]);

    const caseTransitionEnd = React.useCallback(() => {
        setSpinActive(false);
        setFinished(true);
        setCalcedImageIdx(0);
        setImages([props.images[props.correctImageIndex]]);
        props.openingFinished();
    }, [props]);

    React.useEffect(() => {
        ref?.current?.addEventListener('transitionstart', caseTransitionStart);
        ref?.current?.addEventListener('transitionend', caseTransitionEnd);

        return () => {
            ref?.current?.removeEventListener('transitionstart', caseTransitionStart);
            ref?.current?.removeEventListener('transitionend', caseTransitionEnd);
        }
    }, [images, ref, caseTransitionStart, caseTransitionEnd]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div
                    className={classes.imageContainer}
                    ref={ref}
                    style={{ marginRight: `${calcedImageIdx}px`, transition: `margin ${0.2 * images.length}s cubic-bezier(0, 0, 0.2, 1) 5s` }}
                >
                    {spinActive && (
                        <div className={classes.middleLine}></div>
                    )}
                    {images && images.length > 0 && images.filter(img => img.visible).map((img: any, idx: number) => {
                        return (
                            <div
                                key={idx}
                                className={classes.imageHolder}
                                style={{
                                    background: 'linear-gradient(to top left, rgba('
                                        .concat(img.colors.join(', '), ', ')
                                        .concat(img.alpha, '), ')
                                        .concat(baseStyles.bgTertiary(), ' 33%)')
                                }}
                                //background: `linear-gradient(to top left, rgba(${img.colors.join(', ')}, ${img.alpha}), ${baseStyles.bgTertiary} 33%`
                            >
                                <img src={img.url} alt="case-opening" />
                            </div>
                        )
                    })}
                </div>
                {!spinActive && !finished && (
                    <Button.Primary onClick={() => {
                        spinActive || spinCase();
                    }}>
                        Spin
                    </Button.Primary>
                )}
            </div>
        </div>
    )
}