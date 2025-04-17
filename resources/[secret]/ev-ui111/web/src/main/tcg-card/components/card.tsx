import React from "react";
import "./card.scss";

export default (props: any) => {
    const [flipped, setFlipped] = React.useState(props?.flipped);
    const cardRef = React.useRef(null);
    const [boundingClientRect, setBoundingClientRect] = React.useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });
    const [style, setStyle] = React.useState({});
    const [style2, setStyle2] = React.useState({});

    const flipCard = (data?: any) => {
        if (!flipped) {
            setFlipped(props?.flipped);

            if (data) {
                props?.onFlipped && props?.onFlipped(props?.id);
            } else {
                props?.playSound(
                    props?.print.id,
                    props?.rarity,
                    props?.holo
                )
            }

            data && onMouseMove(data);
        }
    }

    React.useEffect(() => {
        if (props?.flipped !== flipped) {
            flipCard();
        }
    })

    const currentTime = new Date().getTime();

    const onMouseMove = (data: any) => {
        if (!props?.inBinder && new Date().getTime() - currentTime >= 25) {
            const x = data.clientX - boundingClientRect.x;
            const y = data.clientY - boundingClientRect.y;

            const xy = {
                x: x - boundingClientRect.width / 2,
                y: y - boundingClientRect.height / 2
            }

            const calc = Math.sqrt(Math.pow(xy.x, 2) + Math.pow(xy.y, 2));

            let scaleStyle = 'scale3d(1.05, 1.05, 1.05)';

            props?.flipped && (scaleStyle = 'scale3d(1.75, 1.75, 1.75)');

            setStyle({
                ...style,
                transform: `${scaleStyle} rotate3d(${xy.y / 100}, ${-xy.x / 100}, 0, ${2 * Math.log(calc)}deg)`
            });

            const backgroundImage = (xy.x / boundingClientRect.width) * 90 + (xy.y / boundingClientRect.height) * 90 + 45;

            if (props?.holo !== 'none') {
                setStyle2({
                    ...style2,
                    opacity: 0.666,
                    backgroundImage: `linear-gradient(${backgroundImage}deg, transparent 0%, rgb(0, 231, 255) 15%, rgb(255, 0, 231) 35%, transparent 50%, rgb(0, 231, 255) 65%, rgb(255, 0, 231) 85%, transparent 100%)`,
                    backgroundPosition: `${xy.x / 2 - boundingClientRect.width / 2}px ${xy.y / 2 - boundingClientRect.height / 2}px`
                });
            }
        }
    }

    const calculateQuality = () => {
        return props?.burnt ? 0 : Math.round((props?.qualityCentering + props?.qualitySurface + props?.qualityEdge + props?.qualityCorners) / 4);
    }

    const getCardImg = () => {
        return props?.print.hiddenUnlessFound && props?.count < 1 ? 'https://npgtav.b-cdn.net/tcg-sets/999_mystery.webp' : props?.printSet?.baseUrl + props?.print?.image;
    }

    return (
        <div
            className={`card-sleeve${props?.fade ? ' card-sleeve--fade' : ''}${props?.graded ? ' card-sleeve--graded' : ''}`}
            onClick={(e: any) => props?.inBinder ? props?.spreadOutCards(props?.print) : flipCard(e)}
            onMouseEnter={() => props?.isNew && props?.onHoverEnterNew(props?.newCardIds)}
        >
            {props?.isNew && (
                <div className="card-sleeve__new"></div>
            )}
            <div
                ref={cardRef}
                className={`card card--${props?.rarity}${props?.holo !== 'none' ? ' card--holo' : ''}${props?.flipped ? ' active' : ''}${props?.burn ? ' card--burn' : ''}${props?.burnt ? ` card--burnt-${(props?.id % 4) + 1}` : ''}${props?.print?.fullArt ? ' card--full-art' : ''}${props?.print?.classModifier ? ` card--${props?.print?.classModifier}` : ''}`}
                onMouseEnter={() => {
                    props?.inBinder || setBoundingClientRect(cardRef.current.getBoundingClientRect());
                    props?.holo !== 'none' && props?.onHoverEnterHolo();
                }}
                onMouseLeave={() => {
                    if (!props?.inBinder) {
                        setStyle({
                            transform: ''
                        });
                        setStyle2({
                            opacity: '',
                            backgroundImage: '',
                            backgroundPosition: ''
                        });
                    }

                    props?.onHoverLeaveHolo();
                }}
                onMouseMove={onMouseMove}
                onMouseUp={(e: any) => {
                    if (props?.flipped && props?.markCardForSale && e.button === 0 && props?.holo === 'none') {
                        props?.markCardForSale(props?.id);
                    }
                    if (props?.flipped && props?.showCard && e.button === 1) {
                        props?.showCard({
                            id: props?.id,
                            printId: props?.print.id,
                            printSetId: props?.printSet.id,
                            protection: props?.protection,
                            graded: props?.graded,
                            rarity: props?.rarity,
                            holo: props?.holo,
                            qualityGeneral: props?.qualityGeneral,
                            qualityCentering: props?.qualityCentering,
                            qualitySurface: props?.qualitySurface,
                            qualityEdge: props?.qualityEdge,
                            qualityCorners: props?.qualityCorners,
                            burnt: props?.burnt
                        });
                    } else if (props?.withdrawCard && e.button === 2) {
                        props?.withdrawCard(props?.print.id, props?.cardId);
                    }
                }}
                style={style}
            >
                <div className="card__back">
                    <img src="https://i.imgur.com/nLlrXud.png" alt="back-img" />
                </div>
                {props?.burnt && (
                    <div className="card__front-burnt">
                        <div className="card__burn">
                            <div className="card__front-wrapper" data-number={props?.print.numbering}>
                                {props?.holo !== 'none' && (
                                    <div className={`card__holo card__holo--${props?.holo}`} style={style2}></div>
                                )}
                                <img src={getCardImg()} alt="card-img" />
                                {props?.qualitySurface && props?.qualitySurface < 10 && (
                                    <div className={`card__surface card__surface--${props?.qualitySurface}`}></div>
                                )}
                                {props?.qualityEdge && props?.qualityEdge < 10 && (
                                    <div className={`card__edge card__edge--${props?.qualityEdge}`}></div>
                                )}
                                {props?.qualityCorners && props?.qualityCorners < 10 && (
                                    <div className={`card__corners card__corners--${props?.qualityCorners}`}></div>
                                )}
                                {props?.qualityCentering && props?.qualityCentering < 10 && (
                                    <div className={`card__centering card__centering--${props?.qualityCentering}`}></div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {!props?.burnt || (props?.burnt && props?.burnt) && (
                    <div className="card__front" data-number={props?.print.numbering}>
                        {props?.holo !== 'none' && (
                            <div className={`card__holo card__holo--${props?.holo}`} style={style2}></div>
                        )}
                        <img src={getCardImg()} alt="card-img" />
                        {props?.qualitySurface && props?.qualitySurface < 10 && (
                            <div className={`card__surface card__surface--${props?.qualitySurface}`}></div>
                        )}
                        {props?.qualityEdge && props?.qualityEdge < 10 && (
                            <div className={`card__edge card__edge--${props?.qualityEdge}`}></div>
                        )}
                        {props?.qualityCorners && props?.qualityCorners < 10 && (
                            <div className={`card__corners card__corners--${props?.qualityCorners}`}></div>
                        )}
                        {props?.qualityCentering && props?.qualityCentering < 10 && (
                            <div className={`card__centering card__centering--${props?.qualityCentering}`}></div>
                        )}
                    </div>
                )}
                {props?.isMarkedForSale && (
                    <div className="card__marked-for-sale">
                        <i className="fas fa-dollar-sign"></i>
                    </div>
                )}
                {props?.protection === 'case' && (
                    <div className={`card__case${props?.graded && calculateQuality() === 10 ? ' card__case--perfect' : ''}`}>
                        {props?.graded && (
                            <div>
                                <p className="card__case-details left">
                                    2021 NPC - {props?.printSet.name}
                                    <br />
                                    {props?.print.name}
                                    <br />
                                    {props?.rarity.toUpperCase()} {props?.holo !== 'none' && ' - ' + props?.holo.toUpperCase()}
                                </p>
                                <p className="card__case-details right">
                                    #{props?.print.numbering}
                                    <br />
                                    {[
                                        'SHIT',
                                        'PR',
                                        'GOOD',
                                        'VG',
                                        'VG-EX',
                                        'EX',
                                        'EX-MT',
                                        'NM',
                                        'NM-MT',
                                        'MINT',
                                        'GEM-MT',
                                    ][calculateQuality()]}
                                    <br />
                                    {calculateQuality()}
                                    <br />
                                    {props?.id.toString().padStart(8, '0')}
                                </p>
                            </div>
                        )}
                    </div>
                )}
                {props?.burn && (
                    <div className="fire">
                        <audio autoPlay={true} src="nui://ev-tcg/public/common/burn-card.ogg" />
                        <video autoPlay={true} muted={true} playsInline={true}>
                            <source src="nui://ev-tcg/public/common/burn-card.webm" type="video/webm" />
                        </video>
                    </div>
                )}
            </div>
            {props?.count > 1 && (
                <div className="card-sleeve__count">
                    {props?.count > 99 ? '99+' : props?.count}
                </div>
            )}
        </div>
    )
}