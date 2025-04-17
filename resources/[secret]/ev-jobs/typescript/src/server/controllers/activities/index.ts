import { StoreDeliveriesActivity } from "./store-deliveries";
import { SanitationWorkerActivity } from "./sanitation-worker";
import { FishingActivity } from "./fishing";
import { ImpoundWorkerActivity } from "./impound";
import { HouseRobberyActivity } from "./house-robbery";
import { ChopShopActivity } from "./chop-shop";
import { DarkmarketActivity } from "./darkmarket";

export const Activities = {
    "store_deliveries": StoreDeliveriesActivity,
    "sanitation_worker": SanitationWorkerActivity,
    "fishing": FishingActivity,
    "impound": ImpoundWorkerActivity,
    "house_robbery": HouseRobberyActivity,
    "chopshop": ChopShopActivity,
    "darkmarket": DarkmarketActivity
} as { [key: string]: any };