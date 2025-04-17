import Draggable from 'react-draggable';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import PlinkoGame from './games/plinko-game';

export default () => {
    return (
        <Draggable handle="#app-header">
            <div className="app-wrapper">
                <AppHeader appName="Bake Casino" color="#171717" textColor="#d3cfcf" onClose={() => updateLaptopState({ showGamblingApp: false })} style={{ color: '#ffffff' }} />
                <div className="app-container">
                    <PlinkoGame />
                </div>
            </div>
        </Draggable>
    )
}