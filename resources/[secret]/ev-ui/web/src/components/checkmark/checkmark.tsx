import React from 'react';
import { Checkmark as ReactCheckmark } from 'react-checkmark';
import './checkmark.scss';

const Checkmark: React.FC = () => {
    return (
        <>
            <div className="component-checkmark">
                <ReactCheckmark className="checkmark" color="#009688" size="56px" />
                {/* <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg> */}
            </div>
        </>
    );
}

export default Checkmark;