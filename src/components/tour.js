import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { useMeasure, useMount, useSetState } from 'react-use';
import { Box, Button, Modal, Typography } from '@mui/material';

import { theme } from 'theme';



const isPortrait = window.innerHeight > window.innerWidth;
const imageHeight = isPortrait ? 700 : 300;
const imageWidth = 1000;
const ratio = imageHeight / imageWidth;

function logGroup(type, data) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
}

export default function tour({ open, handleClose, setShowTour }) {
    const [ref, { width }] = useMeasure();
    // accounts_step_one
    const TOUR_STEPS = [
        {
            target: '.app__carousel',
            content: <Typography variant='body2'>Welcome to CASH: Financial Monitoring Application</Typography>,
            disableBeacon: true,
            source: '/static/images/steps/step1.png',
            placement: 'bottom'
        },
        {
            target: '.app__carousel',
            content: (
                <Typography variant='body2'>
                    To get started, you need to create an account first. Go to the Accounts tab (1). Click add account
                    (2).
                </Typography>
            ),
            source: '/static/images/steps/step2.png',
            placement: 'bottom'
        },
        {
            target: '.app__carousel',
            content: (
                <Typography variant='body2'>
                    Fill the Account Name field (1). Fill the Account Amount field (2).
                </Typography>
            ),
            source: '/static/images/steps/step3.png',
            placement: 'bottom'
        },
        {
            target: '.app__carousel',
            content: (
                <Typography variant='body2'>
                    Select a Color (1). Select an Icon (2). If all fields are filled, click submit (3).
                </Typography>
            ),
            source: '/static/images/steps/step4.png',
            placement: 'bottom'
        },
        {
            target: '.app__carousel',
            content: (
                <Typography variant='body2'>
                    After adding an account, you can now add a transaction. Click the Add Transaction.
                </Typography>
            ),
            source: '/static/images/steps/step5.png',
            placement: 'bottom'
        },
        {
            target: '.app__carousel',
            content: (
                <Typography variant='body2'>
                    Fill the Amount field (1). Select if Income or Expense (2). Select an Account (3). Select a Category
                    (4).
                </Typography>
            ),
            source: '/static/images/steps/step6.png',
            placement: 'bottom'
        },
        {
            target: '.app__carousel',
            content: (
                <Typography variant='body2'>
                    Change the date (1). Fill the Comment field (2). Upload a picture (3). If all fields are filled,
                    click submit (4).
                </Typography>
            ),
            source: '/static/images/steps/step7.png',
            placement: 'bottom'
        },
        {
            target: '.app__carousel',
            content: (
                <Typography variant='body2'>
                    Congratulations! You just started your first step in using CASH.
                </Typography>
            ),
            source: '/static/images/steps/step1.png',
            placement: 'bottom'
        }
    ];
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
            setShowTour(false);
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
                    tooltip: {
                        width: 750
                    },
                    tooltipContainer: {
                        textAlign: 'center'
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
                                        height: {
                                            xs: '100vh',
                                            md: '65vh'
                                        },
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                    key={item.source}
                                >
                                    <Box
                                        sx={{
                                            width: {
                                                xs: '90%',
                                                md: '70%'
                                            },
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            alt='1'
                                            src={item.source}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'block',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </Box>
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
