import { Delay } from '@shared/utils/tools';
import * as Controllers from './controllers';
import { Repository } from './database/repository';
import v8 from 'v8';

const startHeapStatisticsTick = async () => {
    setTick(async () => {
        const heapStats: any = v8.getHeapStatistics();
        //convert the stats to MB
        const mappedStats = Object.keys(heapStats).map((key) => {
            return {
                [key]: Math.round((heapStats[key] / 1024 / 1024) * 100) / 100 + ' MB',
            };
        });
        console.log(mappedStats);
        await Delay(300 * 1000); // 5 minutes
    });
}

const startUsedHeapSizeTick = async () => {
    setTick(async () => {
        const heapUsed = process.memoryUsage().heapUsed;
        const usedHeapSize = Math.round((heapUsed / 1024 / 1024) * 100) / 100;
        console.log(`[JS USED HEAP SIZE](${Date.now()}): ${usedHeapSize} MB`);
        await Delay(120 * 1000); // 2 minutes
    });
}

(async () => {
    await Controllers.Init();
    //await startHeapStatisticsTick();
    await startUsedHeapSizeTick();
    await Repository.checkExpiredWarrants();
})();