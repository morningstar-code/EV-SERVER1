import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

const Circle: React.FC<any> = (props) => {
    let _0x99bf5d: any = ResponsiveHeight(6, true);
    let _0x4ce232: any = ResponsiveWidth(props.radius, false, true);
    let _0x4337c1 = _0x4ce232 / 2 - _0x99bf5d / 2;
    let _0x128e10 = Math.min(props.fill, 100);
    let _0x23dbfb = 2 * _0x4337c1 * Math.PI;
    let _0x373579 = ((100 - _0x128e10) / 100) * _0x23dbfb;
    let _0x595ecc = props.transitionTime || '1s';

    return (
        <>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: _0x4ce232 + 2, width: _0x4ce232 + 2, transform: 'rotate(-90deg)', zIndex: props.zIndex }}>
                <circle
                    r={_0x4337c1}
                    cx={(_0x4ce232 + 2) / 2}
                    cy={(_0x4ce232 + 2) / 2}
                    fill={props.fillColor || 'transparent'}
                    stroke={props.color}
                    strokeWidth={_0x99bf5d}
                    strokeDasharray={_0x23dbfb}
                    strokeDashoffset={_0x373579}
                    strokeOpacity={isNaN(props.strokeOpacity) ? 1 : props.strokeOpacity}
                    style={props.excludeTransition ? {} : { transition: `stroke-dashoffset ${_0x595ecc} linear`, willChange: 'transition' }}
                />
            </svg>
        </>
    );
}

export default Circle; 