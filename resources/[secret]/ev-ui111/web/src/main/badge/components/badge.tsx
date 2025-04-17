import { getCharacter } from 'lib/character';
import { Typography } from '@mui/material';
import './badge.scss';

const getDepartmentName = (department: string) => {
    switch (department) {
        case 'Cyber Crime':
            return 'Cyber Crimes'
        case 'LSPD':
            return 'Los Santos PD'
        case 'BCSO':
            return 'Blaine County Sheriff'
        case 'PBSO':
            return 'Paleto Bay Sheriff'
        case 'SDSO':
            return 'Senora Desert Sheriff'
        case 'SASP':
            return 'State Troopers'
        case 'SASPR':
            return 'Park Rangers'
        default:
            return 'State Official'
    }
}

const getDepartmentLogo = (department: string) => {
    switch (department) {
        case 'LSPD':
            return 'https://gta-assets.subliminalrp.net/images/badges/LSPD.png'
        case 'SASPR':
            return 'https://gta-assets.subliminalrp.net/images/badges/SAPR.png'
        case 'BCSO':
            return 'https://gta-assets.subliminalrp.net/images/badges/BCSO.png'
        case 'PBSO':
            return 'https://gta-assets.subliminalrp.net/images/badges/PBSO.png'
        case 'SDSO':
            return 'https://gta-assets.subliminalrp.net/images/badges/SDSO.png'
        case 'Cyber Crime':
            return 'https://gta-assets.subliminalrp.net/images/badges/mdw-cyber1.png'
        case 'SASP':
            return 'https://gta-assets.subliminalrp.net/images/badges/SASP.png'
        default:
            return 'https://gta-assets.subliminalrp.net/images/badges/Default.png'
    }
}

const getDepartmentColor = (department: string) => {
    switch (department) {
        case 'Cyber Crime':
            return '#162841'
        case 'LSPD':
            return '#171520'
        case 'BCSO':
        case 'PBSO':
        case 'SDSO':
            return '#A67924'
        case 'SASP':
            return '#181F2B'
        case 'SASPR':
            return '#2F3823'
        default:
            return '#161614'
    }
}

export default (props: any) => {
    return (
        <div className="badge-app-wrapper">
            <div className={`exterior-wrapper ${getCharacter().id === 1002 ? 'exterior-wrapper-ff' : ''}`} style={{ backgroundImage: `url(https://gta-assets.subliminalrp.net/images/dark_leather.png)` }}>
                <div className="interior-wrapper">
                    <div className="row">
                        <div className="column">
                            <div className="left-column">
                                <div className="information-wrapper">
                                    <div className="information">
                                        <div className="profile-image-holder">
                                            <img src={props.image} alt="profile" />
                                        </div>
                                        <div className="name-info">
                                            <div className="banner" style={{ backgroundColor: getDepartmentColor(props.department) }}>
                                                <Typography variant="body2" style={{ color: 'white', textAlign: 'center' }}>
                                                    {getDepartmentName(props.department)}
                                                </Typography>
                                            </div>
                                            <div className="name-info-wrap">
                                                <div className="rank">
                                                    <Typography variant="body1" style={{ color: 'white' }}>
                                                        {props.rank || 'Chief of Police'}
                                                    </Typography>
                                                </div>
                                                <div className="name">
                                                    <Typography variant="h6" style={{ color: 'white' }}>
                                                        {props.name || 'Francis J. Francer'}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className="callsign">
                                                <Typography variant="body1" style={{ color: 'white' }}>
                                                    #{props.badge || '499'}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="right-column">
                                <div className="badge-wrapper">
                                    <img alt="badge" className="badge" src={getDepartmentLogo(props.department)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}