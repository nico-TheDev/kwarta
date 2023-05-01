import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { useMeasure, useMount, useSetState } from 'react-use';
import { Box, Button, Modal, Typography } from '@mui/material';

import { theme } from 'theme';

const TOUR_STEPS = [
    {
        target: '.app__carousel',
        content: <Typography variant='caption'>Welcome to CASH: Financial Monitoring Application</Typography>,
        disableBeacon: true,
        source: '/static/images/steps/step1.png',
        placement: 'bottom'
    },
    {
        target: '.app__carousel',
        content: (
            <Typography variant='caption'>
                To get started, you need to create an account first. Go to the accounts tab (1) and click add account (2)
            </Typography>
        ),
        source: '/static/images/steps/step2.png',
        placement: 'bottom'
    },
    {
        target: '.app__carousel',
        content: (
            <Typography variant='caption'>
                Fill up the required fields to create an account. Wait for the account to appear at the account screen
            </Typography>
        ),
        source: '/static/images/steps/step3.png',
        placement: 'bottom'
    },
    {
        target: '.app__carousel',
        content: (
            <Typography variant='caption'>Click the add transaction button to create your first transaction</Typography>
        ),
        source: '/static/images/steps/step4.png',
        placement: 'bottom'
    },
    {
        target: '.app__carousel',
        content: (
            <Typography variant='caption'>
                Fill up the fields then use the account you just created. Wait for the dashboard to appear after
                submission.
            </Typography>
        ),
        source: '/static/images/steps/step5.png',
        placement: 'bottom'
    },
    {
        target: '.app__carousel',
        content: (
            <Typography variant='caption'>Congratulations! You just started your first step in using CASH.</Typography>
        ),
        source: '/static/images/steps/step1.png',
        placement: 'bottom'
    }
];

const isPortrait = window.innerHeight > window.innerWidth;
const imageHeight = isPortrait ? 700 : 300;
const imageWidth = 1000;
const ratio = imageHeight / imageWidth;

function logGroup(type, data) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
}

export default function tour({ open, handleClose }) {
    const [ref, { width }] = useMeasure();
    const [{ run, stepIndex, steps }, setState] = useSetState({
        run: false,
        stepIndex: 0,
        steps: TOUR_STEPS
    });

    useMount(() => {
        setState({ run: true });
    });

    const handleClickReset = () => {
        setState({ run: true, stepIndex: 0 });
    };

    const handleJoyrideCallback = (data) => {
        const { action, index, status, type } = data;

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
        } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            setState({ run: false });
            handleClose();
        }

        logGroup(type, data);
    };

    return (
        <>
            <Joyride
                callback={handleJoyrideCallback}
                continuous
                run={run}
                scrollToFirstStep
                showSkipButton
                stepIndex={stepIndex}
                steps={TOUR_STEPS}
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

            <Modal open={open} onClose={handleClose}>
                <>
                    <Box ref={ref} className='app__carousel'>
                        <Carousel
                            selectedItem={stepIndex}
                            showArrows={!run}
                            showIndicators={false}
                            showStatus={false}
                            showThumbs={false}
                        >
                            {TOUR_STEPS.map((item) => (
                                <Box
                                    sx={{
                                        height: '65vh',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img
                                        alt='1'
                                        src={item.source}
                                        style={{
                                            width: '70%',
                                            height: '100%',
                                            display: 'block',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            ))}
                        </Carousel>
                    </Box>
                    {/* {!run && stepIndex > 0 && (
                        <Box mt='4'>
                            <Button onClick={handleClickReset}>Restart</Button>
                        </Box>
                    )} */}
                </>
            </Modal>
        </>
    );
}
