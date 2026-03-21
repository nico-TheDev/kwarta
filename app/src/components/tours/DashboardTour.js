import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { useMeasure, useMount, useSetState } from 'react-use';
import { Box, Button, Modal, Typography } from '@mui/material';

import { theme } from 'theme';

function logGroup(type, data) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
}

export default function DashboardTour({ setShowTour, tourSteps, finishTour }) {
    const [{ run, steps }, setState] = useSetState({
        run: false,
        steps: tourSteps
    });

    useMount(() => {
        setState({ run: true });
    });

    const handleJoyrideCallback = (data) => {
        const { status, type } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setState({ run: false });
            setShowTour(false);
            finishTour();
        }

        logGroup(type, data);
    };

    return (
        <Joyride
            callback={handleJoyrideCallback}
            continuous
            run={run}
            hideCloseButton
            scrollToFirstStep
            showSkipButton
            steps={steps}
            styles={{
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
    );
}
