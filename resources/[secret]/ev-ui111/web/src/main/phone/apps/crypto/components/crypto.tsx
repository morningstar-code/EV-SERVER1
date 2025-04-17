import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import { ComponentPaper } from "components/paper";
import { ComponentDrawer } from "components/component-drawer";
import { formatCurrency } from "lib/format";
import Button from "components/button/button";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";
import { openPhoneModal } from "main/phone/actions";
import BuySellModal from "./buy-sell-modal";
import ExchangeModal from "./exchange-modal";

const showPrice = {
    '1': false,
    '2': false,
    '3': false,
    '4': true
};

export const cryptoType = {
    '1': 'buy',
    '2': 'exchange',
    '3': 'sell',
    '4': 'exchange'
};

const cryptoExchange = {
    '1': false,
    '2': false,
    '3': true,
    '4': false
};

const Crypto: FunctionComponent<any> = (props) => {
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    return (
        <AppContainer
            emptyMessage={list.length === 0}
            search={{
                filter: ['id', 'name', 'ticker'],
                list: props.list,
                onChange: setList,
            }}
        >
            {list && list.length > 0 && list.map((crypto: any) => (
                <ComponentPaper
                    key={crypto.id}
                    drawer={(
                        <ComponentDrawer
                            items={[
                                {
                                    icon: 'id-card',
                                    text: `${crypto.ticker} (${crypto.id})`
                                },
                                {
                                    icon: 'tag',
                                    text: crypto.name,
                                },
                                {
                                    icon: 'money-check-alt',
                                    text: crypto.amount,
                                },
                                !showPrice[crypto.id] && {
                                    icon: 'poll',
                                    text: crypto.price ? formatCurrency(crypto.price) : '$100.00'
                                }
                            ]}
                        >
                            <div className="flex-centered flex-space-between">
                                {cryptoType[crypto.id] !== 'exchange' && (
                                    <Button.Primary size="small" onClick={() => {
                                        openPhoneModal(
                                            <BuySellModal {...props} crypto={crypto} />
                                        )
                                    }}>
                                        {cryptoType[crypto.id] === 'buy' ? 'Purchase' : 'Sell'}
                                    </Button.Primary>
                                )}
                                {!cryptoExchange[crypto.id] && (
                                    <Button.Secondary size="small" onClick={() => {
                                        openPhoneModal(
                                            <ExchangeModal {...props} crypto={crypto} />
                                        )
                                    }}>
                                        Exchange
                                    </Button.Secondary>
                                )}
                            </div>
                        </ComponentDrawer>
                    )}
                >
                    <ComponentIcon icon={crypto.icon || 'sliders-h'} />
                    <ComponentDetails title={crypto.name} description={crypto.amount} />
                </ComponentPaper>
            ))}
            <ComponentPaper>
                <ComponentIcon icon="lemon" />
                <ComponentDetails title="LME" description="0" />
            </ComponentPaper>
        </AppContainer>
    )
}

export default Crypto;