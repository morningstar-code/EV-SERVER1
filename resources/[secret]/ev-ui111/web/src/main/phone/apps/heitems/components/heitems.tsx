import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";

const HeItems: FunctionComponent<any> = (props: any) => {
    return (
        <AppContainer>
            {props.items.map((item: any) => (
                <ComponentPaper
                    key={item.key}
                    actions={[
                        {
                            icon: 'hand-holding-usd',
                            title: 'Purchase',
                            onClick: () => props.purchaseItem(item)
                        }
                    ]}
                >
                    <ComponentIcon icon={item.icon} />
                    <ComponentDetails
                        title={item.name}
                        description={`${item.price} ${item.crypto_id === 2 ? 'GUINEA' : 'SHUNGITE'}`}
                    />
                </ComponentPaper>
            ))}
        </AppContainer>
    )
}

export default HeItems;