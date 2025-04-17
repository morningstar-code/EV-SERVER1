import React from 'react';
import { ResponsiveHeight, ResponsiveWidth } from '../../../../../utils/responsive';

const Circle: React.FC<CircleProps> = (props) => {
    let _0x2e7ee0 = props.color,
    _0x28ee29 = props.fill,
    _0x4fcd36 = props.radius,
    _0x40288d = void 0 === _0x4fcd36 ? 98 : _0x4fcd36,
    _0x1778ae = props.strokeWidth,
    _0x38dbc4 = void 0 === _0x1778ae ? 6 : _0x1778ae,
    _0x57e2eb = props.transitionTime,
    _0x23c215 = void 0 === _0x57e2eb ? '600ms' : _0x57e2eb,
    _0xe8215: any = ResponsiveHeight(_0x38dbc4, true),
    _0x2f64e2: any = ResponsiveWidth(_0x40288d, false, true),
    _0x19454c = _0x2f64e2 / 2 - _0xe8215 / 2,
    _0x4e0c57 = Math.min(_0x28ee29, 100),
    _0x65a868 = 2 * _0x19454c * Math.PI,
    _0x224a2f = ((100 - _0x4e0c57) / 100) * _0x65a868,
    _0x13c2eb = {
        height: _0x2f64e2 + 2,
        width: _0x2f64e2 + 2,
        transform: 'rotate(-90deg)',
        filter: 'drop-shadow( 0px 0px 2px rgba(0, 0, 0, .4))',
    }

    return (
        <>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={_0x13c2eb}>
                <circle 
                    r={_0x19454c}
                    cx={(_0x2f64e2 + 2) / 2}
                    cy={(_0x2f64e2 + 2) / 2}
                    fill="transparent"
                    stroke={_0x2e7ee0}
                    strokeWidth={_0xe8215}
                    strokeDasharray={_0x65a868}
                    strokeDashoffset={_0x224a2f}
                    style={{
                        transition: `stroke-dashoffset ${_0x23c215} linear`,
                        willChange: 'transition',
                    }}
                />
            </svg>
        </>
    );
}

export const MemoCircle = React.memo(Circle);