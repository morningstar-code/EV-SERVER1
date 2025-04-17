import { PolyZone } from '@shared/classes/polyzone';
import * as Controllers from './controllers';

(async () => {
    await Controllers.Init();
    
    PolyZone.addBoxZone('test_zone', {
        x: 197.79,
        y: -3029.73,
        z: 5.82,
    }, 26, 18, {
        name: 'test_zone',
        heading: 357
    });
})();