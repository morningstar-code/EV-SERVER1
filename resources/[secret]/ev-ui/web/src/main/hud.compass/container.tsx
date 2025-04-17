import React from 'react';
import { ResponsiveHeight } from 'utils/responsive';
import Compass from './components/compass';

class Container extends React.Component<any> {
    render() {
        return (
            <div className="hud.compass-app-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: ResponsiveHeight(32), margin: '0 !important', padding: '0 !important', border: '0 !important', outline: '0 !important', overflow: 'hidden !important', pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignContent: 'center', color: 'white' }}>
                <Compass />
            </div>
        )
    }
}

export default Container;