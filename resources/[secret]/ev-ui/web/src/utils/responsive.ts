//import useWindowDimensions from "../hooks/useWindowDimensions";

//const percentageCalculation = (max: number, val: number) => max * (val / 100);

// export const ResponsiveHeight = (h: number) => {
//     const { height, width } = getWindowDimensions();
//     return percentageCalculation(height, h);
// };

// export const ResponsiveWidth = (w: number) => {
//     const { height, width } = getWindowDimensions();
//     return percentageCalculation(width, w);
// };

export const ResponsiveHeight = function (h, pBool = false) {
    let _0x25a456 = Math.max(1080, window.innerHeight);
    let _0x3e3bcc = _0x25a456 / 1080;

    return pBool
        ? Math.floor(h * _0x3e3bcc)
        : ''.concat(Math.floor(h * _0x3e3bcc).toString(), 'px')
}

export const ResponsiveWidth = function (w, pBool = false, pBool2 = false) {
    if (pBool) {
        return ResponsiveHeight(w)
    }

    let _0x31807e = Math.max(1920, window.innerWidth);
    let _0x159630 = _0x31807e / 1920;
    
    return pBool2
        ? Math.floor(w * _0x159630)
        : ''.concat(Math.floor(w * _0x159630).toString(), 'px')
}