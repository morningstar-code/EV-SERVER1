import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { wifiProducts } from "./products.config";
import { closeConfirmModal, closePhoneModal, getCurrentLocation, openConfirmModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import HeItems from "./components/heitems";
import { nuiAction } from "lib/nui-comms";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    purchaseItem = (item: any) => {
        return (
            openConfirmModal(async () => {
                setPhoneModalLoading();
                const results = await nuiAction("ev-ui:heistsPurchaseItem", {
                    item: item.key,
                    price: item.price,
                    crypto_id: item?.crypto_id ?? 1
                });

                if (results.meta.ok) {
                    closePhoneModal();
                    closeConfirmModal();
                    return;
                }

                setPhoneModalError(results.meta.message, true);
            }, 'Confirm Purchase')
        )
    }

    render() {
        const products = wifiProducts[getCurrentLocation()].filter(product => !product.show || product.show());
        return (
            <HeItems items={products} purchaseItem={this.purchaseItem} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);