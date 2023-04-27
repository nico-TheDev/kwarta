import React from 'react';
import JoyRide from 'react-joyride';
import { theme } from 'theme';

const TOUR_STEPS = [
    {
        target: '.sidebar',
        content: 'This is the App Sidebar',
        disableBeacon: true
    },
    {
        target: '.navigation-list',
        content: 'Use these to navigate between the application'
    },
    {
        target: '.tour-post',
        content: 'here is the post card'
    },
    {
        target: '.tour-contact',
        content: 'this is the contact form'
    },
    {
        target: '.tour-footer',
        content: 'see our footer'
    }
];
export default function tour() {
    return (
        <>
            <JoyRide
                steps={TOUR_STEPS}
                continuous={true}
                showSkipButton={true}
                showProgress={true}
                styles={{
                    tooltipContainer: {
                        textAlign: 'left'
                    },
                    buttonBack: {
                        marginRight: 10
                    },
                    buttonNext: {
                        backgroundColor: theme.palette.primary.main
                    },
                    options: {
                        zIndex: 1000000
                    }
                }}
            />
        </>
    );
}
