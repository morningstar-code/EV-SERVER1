import { wait } from "../functions"
import { secondsPerMinute } from "../../common/time"

let timeFrozen = false
let currentTime = 0
let isDayTime = true
let isNightTime = false

setImmediate(() => {
  emitNet('ev-weather:client:time:request')
})

onNet('ev-weather:client:time', (time: number) => {
  if (timeFrozen) {
    return
  }
  currentTime = time
})

const checkTimeHeader = () => {
  currentTime++;
  if (currentTime >= 1440) {
    currentTime = 0;
  }
  const time = Math.floor(currentTime / 60);
  emit('timeheader', time, currentTime % 60);

  if (time > 19 || time < 5) {
    isNightTime = true;
  } else {
    isNightTime = false;
  }

  emit('ev-weather:client:nightTime', isNightTime);

  if (time <= 19 && time >= 7 && !isDayTime) {
    isDayTime = true;
    emit('daytime', isDayTime);
  } else if (isDayTime) {
    isDayTime = false;
    emit('daytime', isDayTime);
  }
}

setTick(async () => {
  checkTimeHeader();
  await wait(6000);
})

setInterval(() => {
  if (!timeFrozen) {
    currentTime++
    if (currentTime >= 1440) {
      currentTime = 0
    }

    setIngameTime()
  }
}, secondsPerMinute * 1000)

const setIngameTime = (): void => {
  const hour = Math.floor(currentTime / 60)
  const minute = currentTime % 60

  NetworkOverrideClockTime(hour, minute, 0)
}

global.exports('FreezeTime', (freeze: boolean, freezeAt?: number) => {
  timeFrozen = freeze
  if (timeFrozen && freezeAt) {
    currentTime = freezeAt
    setIngameTime()
    return
  }
  if (!timeFrozen) {
    emitNet('ev-weather:client:time:request')
  }
})

global.exports('isNightTime', () => {
  return isNightTime;
});