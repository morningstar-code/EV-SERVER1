import React from 'react';

export default (props: any) => {
    const tutorialList = [
        {
            description: 'Use these tabs to swap between the different sets.',
            style: {
                left: '75%',
                top: '15%',
                width: '14%',
            },
            buttonText: 'Next',
        },
        {
            description: 'The settings tab can change the voice pack volume and enable or disable voice packs. You can also name your binder.',
            style: {
                left: '73%',
                top: '75%',
                width: '15%',
            },
            buttonText: 'Next',
        },
        {
            description: 'Click a filter to toggle it off. All filters are on by default.',
            style: {
                left: '28.75%',
                top: '82%',
            },
            buttonText: 'Finish',
        }
    ];

    return (
        <div>
            {tutorialList[props.activeStep] && (
                <div className="tutorial">
                    <div className="tutorial__bubble" style={tutorialList[props.activeStep].style}>
                        <p>
                            {tutorialList[props.activeStep].description}
                        </p>
                        <button onClick={() => props.updateSettings({ tutorialStep: props.activeStep + 1 })}>
                            {tutorialList[props.activeStep].buttonText}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}