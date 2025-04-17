import React from 'react';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

const Circle: React.FC<any> = (props) => {
    let _0x598110 = props.color,
    _0x137b05 = props.fill,
    _0x2ee98c = props.fillFactor,
    _0x4f9640 = void 0 === _0x2ee98c ? 4 : _0x2ee98c,
    _0x4f9330 = props.rotate,
    _0xcbf130 = props.radius,
    _0x5f485c = void 0 === _0xcbf130 ? 98 : _0xcbf130,
    _0x151c9e = props.reverse,
    _0x5d6f83 = void 0 !== _0x151c9e && _0x151c9e,
    _0x14bcfe = props.show,
    _0x5c5fdf = void 0 === _0x14bcfe || _0x14bcfe,
    _0x59bb63 = props.strokeWidth,
    _0x2ee03e = void 0 === _0x59bb63 ? 6 : _0x59bb63,
    _0x590f5d = props.transitionTime,
    _0x403e60 = void 0 === _0x590f5d ? '600ms' : _0x590f5d,
    _0x5a6f92 = props.excludeTransition,
    _0x1cff75 = void 0 === _0x5a6f92 || _0x5a6f92,
    _0x1a96be: any = ResponsiveHeight(_0x2ee03e, true),
    _0x49c5a4: any = ResponsiveWidth(_0x5f485c, false, true),
    _0x3a37d1 = _0x49c5a4 / 2 - _0x1a96be / 2,
    _0x2077a3 = Math.min(_0x137b05, 100) / _0x4f9640,
    _0x31bc06 = 2 * _0x3a37d1 * Math.PI,
    _0x42b6b1 = null
_0x42b6b1 = _0x5d6f83
    ? ((100 + _0x2077a3) / 100) * _0x31bc06
    : ((100 - _0x2077a3) / 100) * _0x31bc06
let _0x681327 = {
    height: _0x49c5a4 + 2,
    width: _0x49c5a4 + 2,
    transform: `rotate(${_0x4f9330}deg)`
}
let _0x595ecc = props.transitionTime || '1s'

    return (
        <>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={_0x681327}>
                <circle 
                    r={_0x3a37d1}
                    cx={(_0x49c5a4 + 2) / 2}
                    cy={(_0x49c5a4 + 2) / 2}
                    fill="transparent"
                    stroke={_0x598110}
                    strokeWidth={_0x1a96be}
                    strokeDasharray={_0x31bc06}
                    strokeDashoffset={_0x42b6b1}
                    style={{
                        transition: `stroke-dashoffset ${_0x403e60} linear`,
                        willChange: 'transition',
                    }}
                />
            </svg>
        </>
    );
}

export const MemoCircle = React.memo(Circle);