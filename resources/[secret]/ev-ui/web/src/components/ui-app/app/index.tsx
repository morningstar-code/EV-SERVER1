import { isDevel } from 'lib/env';
import React from 'react';
import useStyles from './index.styles';

interface AppProps {
    center?: boolean;
    name: string;
    zIndex?: number;
    hasFocus?: boolean;
    style?: any;
    onError?: () => void;
    onEscape?: () => void;
    onShow?: () => void;
}

const App: React.FC<AppProps> = (props) => {
    const classes = useStyles();

    const inputStyle = {
        opacity: 0,
        pointerEvents: 'none',
        position: 'fixed',
        width: 1,
        height: 1,
        left: -1,
        top: -1,
    } as any;

    const inputRef1 = React.useRef<HTMLInputElement>(null);
    const inputRef2 = React.useRef<HTMLInputElement>(null);
    const ref = React.useRef<any>(false);

    const handleFocus = (ref: any) => {
        return (e) => {
            e.preventDefault();
            e.stopPropagation();
            ref.current.focus();
        }
    }

    const handleInputKeyDown = (e) => {
        if (!props.hasFocus) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    React.useEffect(() => {
        if (ref.current !== props.hasFocus) {
            ref.current = props.hasFocus;
            inputRef1.current.focus();
        }
    }, [props.hasFocus]);

    const className = isDevel() ? `${props.name}-app-wrapper` : '';

    return (
        <>
            <div style={{ ...props.style, zIndex: props.zIndex !== undefined ? props.zIndex : 100, ...props.style }} className={`${className} ${classes.wrapper}${props.center ? ` ${classes.flexCenter}` : ''}`}>
                <input onFocus={() => handleFocus(inputRef2)} style={inputStyle} tabIndex={0} />
                <input onKeyDown={handleInputKeyDown} ref={inputRef1} style={inputStyle} tabIndex={-1} />
                {props.children}
                <input onKeyDown={handleInputKeyDown} ref={inputRef2} style={inputStyle} tabIndex={-1} />
                <input onFocus={() => handleFocus(inputRef1)} style={inputStyle} tabIndex={0} />
            </div>
        </>
    );
}

export default App;