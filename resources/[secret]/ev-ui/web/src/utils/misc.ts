// Will return whether the current environment is in a regular browser

import React, { useRef } from "react";

// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative

// Basic no operation function
export const noop = () => { }

export const GetRandom = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min)) + min;
}

export const Wait = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export const DelayCallback = (callback: Function, delay: number): any => {
    const ref = useRef({ cb: callback, delay: delay });

    React.useEffect(() => {
        ref.current = { cb: callback, delay: delay };
    });

    React.useCallback(() => {
        setTimeout(function() {
            ref.current.delay === delay && ref.current.cb.apply(ref.current, arguments);
        }, delay);
    }, [delay]);
}