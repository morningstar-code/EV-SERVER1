import { Typography } from '@mui/material';
import { compose, storeObj } from 'lib/redux';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { getMdtOfficers, updateMdtState } from '../actions';
import { getDefaultEvidenceCreate, getDefaultProfileCreate } from '../store';
import useStyles from './index.styles';
import Modal from './modals/modal';
import Tab from './tabs/tab';
import Config from './pages/config';
import Dashboard from './pages/dashboard';
import Incidents from './pages/incidents';
import Profiles from './pages/profiles';
import Reports from './pages/reports';
import Evidence from './pages/evidence';
import Properties from './pages/properties';
import Charges from './pages/charges';
import Staff from './pages/staff';
import Legislation from './pages/legislation';
import Businesses from './pages/businesses';

const getMdtLogo = (props: any) => {
    return 'BCSO' === props.myProfile.department
        ? 'https://gta-assets.subliminalrp.net/images/mdw-bcso.png'
        : 'LSPD' === props.myProfile.department
            ? 'https://gta-assets.subliminalrp.net/images/mdw-lspd.png'
            : 'SASP' === props.myProfile.department
                ? 'https://gta-assets.subliminalrp.net/images/mdw-troopers.png'
                : 'Cyber Crime' === props.myProfile.department
                    ? 'https://gta-assets.subliminalrp.net/images/mdw-cyber.png'
                    : 'SASPR' === props.myProfile.department
                        ? 'https://gta-assets.subliminalrp.net/images/mdw-ranger.png'
                        : 'SDSO' === props.myProfile.department
                            ? 'https://gta-assets.subliminalrp.net/images/mdw-sdso.png'
                            : 'https://gta-assets.subliminalrp.net/images/mdw-generic.png'
}

const mdtSlogans = [
    {
        author: 'Everyone',
        body: function () {
            return React.createElement(
                'span',
                null,
                React.createElement(
                    'span',
                    {
                        role: 'img',
                        'aria-label': 'crab',
                    },
                    '\uD83E\uDD80'
                ),
                '\xA0MDT IS DEAD\xA0',
                React.createElement(
                    'span',
                    {
                        role: 'img',
                        'aria-label': 'crab',
                    },
                    '\uD83E\uDD80'
                ),
                '\xA0LONG LIVE MDW\xA0',
                React.createElement(
                    'span',
                    {
                        role: 'img',
                        'aria-label': 'crab',
                    },
                    '\uD83E\uDD80'
                )
            )
        },
    },
    {
        author: 'Pinzon',
        body: function () {
            return React.createElement(
                'span',
                null,
                'The IT Guy is actually the best thing to ever happen to this department.'
            )
        },
    },
    {
        author: 'Chief of Police, Bobby Smith',
        body: function () {
            return React.createElement(
                'span',
                null,
                '...a back button, you know. Like on Google Chrome, when you press it to go backwards.'
            )
        },
    },
];

let slogan = null;

const getMdtSlogan = () => {
    if (slogan) {
        return slogan;
    }
    const randomSlogan = mdtSlogans[Math.floor(Math.random() * mdtSlogans.length)];
    slogan = randomSlogan;
    return slogan;
}

export const mdtDashboardInitState = {
    page: 'Dashboard',
    storeKey: '',
    tabMounted: true,
}

export const mdtProfilesInitState = {
    page: 'Profiles',
    storeKey: '',
    tabMounted: true,
}

export const mdtDashboardInitialState = {
    bolos: [],
    bulletins: [],
    warrants: [],
}

export const mdtIncidentsInitialState = {
    incident: {},
    incidentCivs: [],
    incidents: [],
    overrideSearchValue: '',
}

export const mdtPropertiesInitialState = {
    propertySelected: {},
    properties: [],
}

export const mdtStaffInitialState = { officerSelected: {} }

export const mdtLegislationInitialState = {
    legislation: {},
    legislations: [],
}

export const mdtPages: any = [
    {
        component: Config,
        initialState: {},
        hideFromNav: true,
        name: 'Config',
        publicApp: false,
    },
    {
        component: Dashboard,
        initialState: mdtDashboardInitialState,
        name: 'Dashboard',
        publicApp: false,
    },
    {
        component: Incidents,
        initialState: mdtIncidentsInitialState,
        name: 'Incidents',
        publicApp: false,
        jobs: ['police', 'judge'],
    },
    {
        component: Profiles,
        initialState: {
            profiles: [],
            profile: getDefaultProfileCreate()
        },
        name: 'Profiles',
        publicApp: true,
    },
    {
        component: Reports,
        initialState: {
            report: {},
            reports: [],
            reportCategories: [],
            searchCategories: [],
            reportCategorySelected: {},
            searchCategorySelected: {
                id: 0,
                name: 'All',
                description: 'All reports',
                template: '',
                deleted: 0,
            },
        },
        name: 'Reports',
        publicApp: false,
        jobs: ['police', 'judge', 'ems', 'doctor', 'doc', 'defender'],
    },
    {
        component: Evidence,
        initialState: {
            evidence: [],
            evidenceSelected: getDefaultEvidenceCreate()
        },
        name: 'Evidence',
        publicApp: false,
        jobs: ['police', 'judge'],
    },
    {
        component: Properties,
        initialState: mdtPropertiesInitialState,
        name: 'Properties',
        publicApp: true,
    },
    {
        component: Charges,
        initialState: {},
        name: 'Charges',
        publicApp: true,
    },
    {
        component: Staff,
        initialState: mdtStaffInitialState,
        name: 'Staff',
        publicApp: true,
    },
    {
        component: Legislation,
        initialState: mdtLegislationInitialState,
        name: 'Legislation',
        publicApp: true,
    },
    {
        component: Businesses,
        initialState: {},
        name: 'Businesses',
        publicApp: true,
    },
]

const { mapStateToProps, mapDispatchToProps } = compose({
    key: 'mdt.tab_1',
    initialState: {}
});

export const mdtTabsOpen = [
    {
        storeKey: 'mdt.tab_1',
        Component: connect(mapStateToProps, mapDispatchToProps)(Tab),
        tabIndex: 1
    }
];

export const openNewMdtTab = (state = undefined) => {
    const tabInitialState = state ? state : {};
    const tabs = storeObj.getState().mdt.tabs + 1;
    const storeKey = `mdt.tab_${tabs}`;
    const { mapStateToProps, mapDispatchToProps } = compose({
        initialState: tabInitialState,
        key: storeKey
    });

    const Component = connect(mapStateToProps, mapDispatchToProps)(Tab);

    mdtTabsOpen.push({
        storeKey: storeKey,
        Component: Component,
        tabIndex: tabs
    });

    updateMdtState({
        tabs: tabs,
        tabActive: tabs
    });

    return { storeKey: storeKey };
}

const MDT: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);

    const tabs = [];

    for (let i = 1; i <= props.tabs; i++) {
        if (!props.tabsRemoved.includes(i)) {
            tabs.push(i);
        }
    }

    return (
        <div className={classes.visibleWrapper}>
            <div className={classes.wrapper}>
                {!!props.modal && (
                    <Modal {...props} />
                )}
                <div className={classes.topBar} onMouseOver={() => props.updateState({ fadeOut: true })} onMouseLeave={() => props.updateState({ fadeOut: false })}>
                    <div className={classes.topBarLogo}>
                        <img src={getMdtLogo(props)} alt="logo" />
                    </div>
                    <div className={classes.topBarTabs}>
                        <div className={classes.topBarTabsWrapper} onMouseOverCapture={(e) => {
                            e.stopPropagation();
                            props.updateState({ fadeOut: false });
                        }}>
                            {tabs.map((tab) => {
                                const active = props.tabActive === tab;
                                let defaultTab = props.publicApp ? 'Profiles' : 'Dashboard';

                                storeObj.getState()[`mdt.tab_${tab}`] && (defaultTab = storeObj.getState()[`mdt.tab_${tab}`].page);

                                return (
                                    <div
                                        key={tab}
                                        className={`${classes.topBarTab} ${active ? classes.topBarActive : ''}`}
                                        onClick={() => {
                                            if (active && tab !== 1) {
                                                const foundIdx = mdtTabsOpen.findIndex((t) => t.tabIndex === tab);

                                                if (foundIdx !== -1) {
                                                    mdtTabsOpen.splice(foundIdx, 1);

                                                    props.updateState({
                                                        tabActive: 1,
                                                        tabsRemoved: [
                                                            ...props.tabsRemoved,
                                                            tab
                                                        ]
                                                    });

                                                    return;
                                                }
                                            }

                                            props.updateState({ tabActive: tab });
                                        }}
                                    >
                                        {active && (
                                            <div className={classes.topBarTabCover}></div>
                                        )}
                                        <Typography variant="body1" style={{ color: 'white' }}>{defaultTab}</Typography>
                                    </div>
                                )
                            })}
                            <div className={classes.topBarTab} style={{ minWidth: 'unset' }} onClick={() => openNewMdtTab()}>
                                <i className="fas fa-plus fa-fw fa-lg" style={{ color: '#fff' }} />
                            </div>
                        </div>
                        <div className={classes.topBarTabsSpacer} />
                    </div>
                    <div className={classes.topBarQuotes}>
                        <div>
                            <Typography variant="h6" style={{ color: '#fff' }}>
                                "{getMdtSlogan().body()}"
                            </Typography>
                            <Typography variant="body1" style={{ color: '#fff', textAlign: 'right' }}>
                                - {getMdtSlogan().author}
                            </Typography>
                        </div>
                        <div className={classes.topBarSpacer} />
                        <div>
                            {!props.myProfile?.character_id && (
                                <Typography variant="body1" style={{ color: '#fff' }}>
                                    Profile Not Found
                                </Typography>
                            )}
                            {!!props.myProfile?.character_id && (
                                <Typography variant="body1" style={{ color: '#fff' }}>
                                    {props.myProfile?.rank} {props.myProfile?.alias ? `"${props.myProfile?.alias}"` : ''} {props.myProfile?.name}
                                </Typography>
                            )}
                        </div>
                    </div>
                </div>
                <div className={classes.appContainer}>
                    {mdtTabsOpen.map((t: any) => (
                        <div
                            key={t.tabIndex}
                            className={classes.appContainerInner}
                            style={{ zIndex: t.tabIndex === props.tabActive ? 100 : -1 }}
                        >
                            <t.Component
                                charges={props.charges}
                                officers={getMdtOfficers()}
                                publicApp={props.publicApp}
                                permissions={props.permissions}
                                storeKey={t.storeKey}
                                myProfile={props.myProfile}
                                character={props.character}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MDT;