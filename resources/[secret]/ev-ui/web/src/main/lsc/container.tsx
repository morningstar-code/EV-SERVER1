import React from "react";
import AppWrapper from "components/ui-app/ui-app"
import { useSelector } from "react-redux"
import { setShowCard } from "./actions";
import store from "./store";
import Card from "./components/card";

export default (props: any) => {
    const showCard = useSelector((state: any) => state[store.key].showCard);

    const [cardInfo, setCardInfo] = React.useState({
        stateId: 'N/A',
        firstName: 'N/A',
        lastName: 'N/A',
        dob: 'N/A',
        eyeColor: 'N/A',
        height: 'N/A',
        expiration: 'N/A',
        class: 'N/A',
        sex: 'N/A'
    });

    const onHide = () => setShowCard(false);

    return (
        <AppWrapper
            center={true}
            name="lsc"
            onError={onHide}
            onEscape={onHide}
            onHide={onHide}
            onShow={(data: any) => {
                setShowCard(true);
                setCardInfo({
                    stateId: data?.stateId ?? 'N/A',
                    firstName: data?.firstName ?? 'N/A',
                    lastName: data?.lastName ?? 'N/A',
                    dob: data?.dob ?? 'N/A',
                    eyeColor: data?.eyeColor ?? 'N/A',
                    height: data?.height ?? 'N/A',
                    expiration: data?.expiration ?? 'N/A',
                    class: data?.class ?? 'N/A',
                    sex: data?.sex ?? 'N/A'
                });
            }}
        >
            {showCard && (
                <div style={{ paddingLeft: '2%', width: '100%' }}>
                    <Card cardInfo={cardInfo} />
                </div>
            )}
        </AppWrapper>
    )
}