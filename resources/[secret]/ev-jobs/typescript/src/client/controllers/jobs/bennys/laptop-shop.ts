import { AddPickupBlip } from "../pickups/pickup";
import { GetBennysCatalog } from "./catalog";

export async function InitBennyLaptopShop(): Promise<void> {
    AddPickupBlip("imports_pickup", { x: 1182.39, y: -3322.04, z: 6.03 });

    const catalog = GetBennysCatalog();

    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: "genericShop:setShopData",
            shopId: "imports_parts",
            callback: "ev-jobs:bennys:guineaShopPurchase",
            items: catalog.filter(item => !item.infinite).map(item => {
                return {
                    icon: item.category !== "performance" ? "spray-can" : "cogs",
                    key: `${item.type}_${item.part}`,
                    name: item.name,
                    price: item.importPrice,
                    details: {
                        type: item.type,
                        part: item.part
                    }
                };
            })
        }
    });
}