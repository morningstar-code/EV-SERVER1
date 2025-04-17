import Button from "components/button/button";
import { formatCurrency } from "lib/format";
import { ComponentDetails } from "components/component-details";
import { ComponentDrawer } from "components/component-drawer";
import { ComponentIcon } from "components/component-icon";
import { ComponentPaper } from "components/paper";
import moment from "moment";
import React, { FunctionComponent } from "react";

const Tax: FunctionComponent<any> = (props) => {
    const asset = props.asset;

    return (
        <ComponentPaper
            drawer={(
                <ComponentDrawer
                    items={[
                        {
                            tooltip: 'Due Date',
                            icon: 'calendar',
                            text: moment(asset.due_date * 1000).fromNow(),
                        }
                    ]}
                >
                    <div className="flex flex-centered" style={{ padding: 8 }}>
                        <Button.Primary onClick={() => { }}>
                            Pay Now
                        </Button.Primary>
                    </div>
                </ComponentDrawer>
            )}
        >
            <ComponentIcon icon={asset.asset_type === 'vehicle' || asset.asset_type === 'land' ? 'car' : 'house'} />
            <ComponentDetails title={asset.asset_type === 'land' ? 'Vehicles' : asset.asset_name} description={formatCurrency(asset.amount)} />
        </ComponentPaper>
    )
}

export default Tax;