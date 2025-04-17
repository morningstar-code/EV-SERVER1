import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';
import Draggable from 'react-draggable';
import { nuiAction } from 'lib/nui-comms';
import { updateLaptopState } from '../../actions';
import { isEnvBrowser } from 'utils/misc';
import GroupInfo from './tabs/group-info';
import Members from './tabs/members';
import Progression from './tabs/progression';
import Staff from './tabs/staff';

const StreetRepApp: FunctionComponent = () => {
    const [groupInfo, setGroupInfo] = React.useState<{ members: StreetGangMember[], isLeader: boolean }>();
    const [isStaff, setIsStaff] = React.useState(true);
    const [selectedTab, setSelectedTab] = React.useState("groupInfo");

    const fetchGangInfo = React.useCallback(async () => {
        if (isEnvBrowser()) {
            return;
        }
        const result = await nuiAction("ev-gangsystem:ui:fetchGangInfo", {}, { returnData: {
            members: [],
            isLeader: true
        } });
        if (result.meta.ok) {
            setGroupInfo(result.data);
        }
    }, []) as unknown as () => StreetGangInfo;

    const isStaffMember = React.useCallback(async () => {
        if (isEnvBrowser()) {
            return;
        }
        const result = await nuiAction("ev-gangsystem:ui:fetchIsStaff", {}, { returnData: { isStaff: false } });
        if (result.meta.ok) {
            setIsStaff(result.data?.isStaff);
        }
    }, []);

    React.useEffect(() => {
        fetchGangInfo();
        isStaffMember();
    }, [fetchGangInfo, isStaffMember]);

    const classes = useStyles();

    const tabActiveClass = (tab: string) => {
        return selectedTab === tab ? classes.menuItemActive : classes.menuItem;
    }

    const updateTab = (tab: string) => {
        setSelectedTab(tab);
    }

    return (
        <Draggable handle="#app-header">
            <div className={classes.container}>
                <header id="app-header" className={classes.menu}>
                    <ul className={classes.menuItems}>
                        <li onClick={() => updateTab('groupInfo')} className={tabActiveClass('groupInfo')}>Group Info</li>
                        <li onClick={() => updateTab('progression')} className={tabActiveClass('progression')}>Progression</li>
                        <li onClick={() => updateTab('members')} className={tabActiveClass('members')}>Members</li>
                        {isStaff && <li onClick={() => updateTab('staff')} className={tabActiveClass('staff')}>Staff</li>}
                    </ul>
                    <i onClick={() => updateLaptopState({ showStreetApp: false })} className="fas fa-times fa-fw fa-1x" style={{ color: '#fff', cursor: 'pointer' }}></i>
                </header>
                {selectedTab === 'members' && (
                    <Members
                        members={groupInfo?.members ?? []}
                        fetchGangInfo={fetchGangInfo}
                        isLeader={groupInfo?.isLeader ?? false}
                    />
                )}
                {selectedTab === 'progression' && (
                    <Progression />
                )}
                {selectedTab === 'groupInfo' && (
                    <GroupInfo gangInfo={null} />
                )}
                {selectedTab === 'staff' && (
                    <Staff isStaff={isStaff} />
                )}
            </div>
        </Draggable>
    );
}

export default StreetRepApp;