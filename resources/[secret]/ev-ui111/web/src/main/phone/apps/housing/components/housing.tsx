import React, { FunctionComponent } from "react";
import { Tabs, Tab } from "@mui/material";
import AppContainer from "main/phone/components/app-container";
import Main from "./tabs/main";
import Properties from "./tabs/properties";
import StateContracting from "./tabs/statecontracting";
import { isEmployed } from "main/phone/actions";

const Housing: FunctionComponent<any> = (props) => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    return (
        <AppContainer>
            <Tabs
                value={selectedTab}
                onChange={(event, newValue) => setSelectedTab(newValue)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="housing tabs"
                style={{ width: '100%' }}
            >
                <Tab icon={<i className="fas fa-house-user fa-fw fa-lg" />} style={{ minWidth: 0 }} />
                <Tab icon={<i className="fas fa-building fa-fw fa-lg" />} style={{ minWidth: 0 }} />
                {(isEmployed('smol_dick_realtors') || isEmployed('statecontracting')) && (
                    <Tab icon={<i className="fas fa-hammer fa-fw fa-lg" />} style={{ minWidth: 0 }} />
                )}
            </Tabs>
            {selectedTab === 0 && (
                <Main {...props} />
            )}
            {selectedTab === 1 && (
                <Properties {...props} />
            )}
            {selectedTab === 2 && (isEmployed('smol_dick_realtors') || isEmployed('statecontracting')) && (
               <StateContracting {...props} />
            )}
        </AppContainer>
    )
}

export default Housing;