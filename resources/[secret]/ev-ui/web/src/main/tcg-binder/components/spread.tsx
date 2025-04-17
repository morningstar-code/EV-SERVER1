import React from 'react';
import Card from '../../tcg-card/components/card';
import './spread.scss';

export default (props: any) => {
    const rarityValue = {
        common: 3,
        uncommon: 2,
        rare: 1
    }

    const holoValue = {
        none: 3,
        reverse: 2,
        holo: 1
    }

    const cards = Object.entries(props.cards).map((entry: any[]) => {
        return { id: Number(entry[0]), ...entry[1] };
    });

    cards.sort((a: any, b: any) => {
        return rarityValue[a.rarity] - rarityValue[b.rarity] || holoValue[a.holo] - holoValue[b.holo];
    });

    return (
        <div className="card-spread">
            <div className="card-spread__wrapper">
                {Object.values(cards).map((card: any) => (
                    <Card
                        inSpread={true}
                        cardId={card.id}
                        isMarkedForSale={props.markedForSaleCardIds.includes(card.id)}
                        {...card}
                        flipped={true}
                        print={props.print}
                        printSet={props.printSet}
                        onHoverEnterHolo={props.onHoverEnterHolo}
                        onHoverLeaveHolo={props.onHoverLeaveHolo}
                        markCardForSale={props.markCardForSale}
                        showCard={props.showCard}
                        withdrawCard={props.withdrawCard}
                        key={card.id}
                    />
                ))}
            </div>
        </div>
    )
}