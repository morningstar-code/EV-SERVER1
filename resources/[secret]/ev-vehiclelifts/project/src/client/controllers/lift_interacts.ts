import { liftConfig } from "@shared/config";
import { PolyTarget } from "@shared/classes/polytarget";
import { Interact } from "@shared/classes/interact";

export const InitLiftInteracts = () => {
    for (const lift of liftConfig.lifts) {
        if (!lift.panelPoly) return;
        PolyTarget.addBoxZone(`lift_panel_${lift.name}`, lift.panelPoly.coords, lift.panelPoly.length, lift.panelPoly.width, {
            minZ: lift.panelPoly.minZ,
            maxZ: lift.panelPoly.maxZ,
            heading: lift.panelPoly.heading,
            data: {
                id: `lift_panel_${lift.name}`
            }
        });
        Interact.AddPeekEntryByPolyTarget(`lift_panel_${lift.name}`, [
            {
                event: 'ev-lifts:client:attemptMoveLift',
                id: `lift_panel_${lift.name}_up`,
                icon: 'level-up-alt',
                label: 'Move Lift Up',
                parameters: {
                    id: `lift_panel_${lift.name}`,
                    direction: 'up',
                    liftName: lift.name
                }
            },
            {
                event: 'ev-lifts:client:attemptMoveLift',
                id: `lift_panel_${lift.name}_down`,
                icon: 'level-down-alt',
                label: 'Move Lift Down',
                parameters: {
                    id: `lift_panel_${lift.name}`,
                    direction: 'down',
                    liftName: lift.name
                }
            },
        ], {
            distance: { radius: 5 },
            isEnabled: () => true
        });
    }
};