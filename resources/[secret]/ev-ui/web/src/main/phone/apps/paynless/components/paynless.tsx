import { Tab, Tabs } from "@mui/material";
import { isEmployed } from "main/phone/actions";
import AppContainer from "main/phone/components/app-container";
import React from "react";
import Owned from "./tabs/owned";
import Manage from "./tabs/manage";

export default (props: React.PropsWithChildren<{ units: Unit[], character: Character, getUnits: () => void }>) => {
    const [units, setUnits] = React.useState<Unit[]>(props.units);
    const [tab, setTab] = React.useState(0);

    const primaryActions = [];

    React.useEffect(() => {
        setUnits(props.units);
    }, [props.units]);

    //Need to show empty message if they are on owned tab and have no units owned
    return (
        <AppContainer
            emptyMessage={units.length === 0}
            primaryActions={primaryActions}
            search={{
                filter: ['id', 'business_name', 'size', 'tenant_cid'],
                list: props.units,
                onChange: setUnits
            }}
        >
            <Tabs centered variant="fullWidth" value={tab} onChange={(e, tab) => setTab(tab)} style={{ marginBottom: 10 }}>
                <Tab label="Owned" />
                {isEmployed("paynless") && (
                    <Tab label="Manage" />
                )}
            </Tabs>
            {tab === 0 && (
                <Owned {...props} getUnits={props.getUnits} units={units.filter((u) => u.tenant_cid === props.character.id)} />
            )}
            {tab === 1 && (
                <Manage {...props} getUnits={props.getUnits} units={units} />
            )}
        </AppContainer>
    )
}