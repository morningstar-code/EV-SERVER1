import React from 'react';
import AppContainer from 'main/phone/components/app-container';
import { Tab } from "@mui/material";
import History from './tabs/history';
import DropdownTabs from './dropdown-tabs';
import Maps from './tabs/maps';
import Leaderboard from './tabs/leaderboard';
import { hasPdDongle, isRacingManagement } from '../actions';
import Shortlist from './tabs/shortlist';
import Management from './tabs/management';
import Chat from './chat';
import Tournaments from './tabs/tournaments';

interface RacingProps {
    updateState: (state: any) => void;
    currentConversation: any;
    character: Character;
    creatingRace: boolean;
    maps: RaceTrack[];
    tournaments: RaceTournament[];
}

export default (props: React.PropsWithChildren<RacingProps>) => {
    const isPd = hasPdDongle();
    const [selectedTab, setSelectedTab] = React.useState<number>(0);
    const [value, setValue] = React.useState<string>('');
    const [race, setRace] = React.useState<RaceTrack | null>(null);

    React.useEffect(() => {
        props.updateState({
            currentConversation: null
        });
    }, [selectedTab]);

    const tournamentsOption = {
        text: 'Tournaments',
        value: 'tournaments'
    }

    const dropDownItems = [tournamentsOption];

    if (isRacingManagement()) {
        dropDownItems.push({
            text: 'Management',
            value: 'management'
        });
    }

    return (
        <AppContainer
            containerStyle={{ display: 'flex', flexDirection: 'column' }}
        >
            {props.currentConversation === null && (
                <>
                    <DropdownTabs
                        value={selectedTab}
                        dropdownValue={value}
                        onChange={(event, newValue) => {
                            setSelectedTab(newValue);
                            //setValue('');
                        }}
                        onDropdownChange={(event, newValue) => setValue(newValue)}
                        dropdownItems={dropDownItems}
                        dropdownTab={<Tab key="dropdown" icon={<i className="fas fa-ellipsis-v fa-fw fa-lg" />} style={{ minWidth: 0 }} />}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="racing tabs"
                        style={{ width: '100%' }}
                    >
                        <Tab
                            key="history"
                            icon={<i className="fas fa-flag-checkered fa-fw fa-lg" />}
                            style={{ minWidth: 0 }}
                        />
                        <Tab
                            key="maps"
                            icon={<i className="fas fa-map-marker fa-fw fa-lg" />}
                            style={{ minWidth: 0 }}
                        />
                        <Tab
                            key="leaderboard"
                            icon={<i className="fas fa-trophy fa-fw fa-lg" />}
                            style={{ minWidth: 0 }}
                        />
                        {!isPd && (
                            <Tab
                                key="shortlist"
                                icon={<i className="fas fa-medal fa-fw fa-lg" />}
                                style={{ minWidth: 0 }}
                            />
                        )}
                    </DropdownTabs>
                    {selectedTab === 0 && (
                        <History
                            {...props}
                        />
                    )}
                    {selectedTab === 1 && (
                        <Maps
                            {...props}
                            maps={props.maps}
                            onRaceCreated={() => setSelectedTab(0)}
                            openLeaderboard={(race: RaceTrack) => {
                                setRace(race);
                                setSelectedTab(2);
                            }}
                        />
                    )}
                    {selectedTab === 2 && (
                        <Leaderboard
                            {...props}
                            race={race}
                        />
                    )}
                    {selectedTab === 3 && !isPd && (
                        <Shortlist
                            {...props}
                        />
                    )}
                    {value === "tournaments" && (
                        <Tournaments
                            {...props}
                        />
                    )}
                    {value === "management" && (
                        <Management
                            {...props}
                        />
                    )}
                </>
            )}
            {props.currentConversation !== null && (
                <Chat
                    {...props}
                />
            )}
        </AppContainer>
    )
}