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

export default function DashboardTour({ setShowTour }) {
    const TOUR_STEPS = [
        {
            target: '.dashboard_step_one',
            title: 'Balance',
            content: 'The amount of money present in all your accounts at any given moment',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.dashboard_step_two',
            title: 'Expenses',
            content:
                'are costs for items or resources that are used up or consumed in the course of daily living. Expenses recur (i.e., they happen over and over again) because food, housing, clothing, energy, and so on are used up on a daily basis',
            placement: 'bottom'
        },
        {
            target: '.dashboard_step_three',
            title: 'Income',
            content: 'is earned or received in a given period',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.dashboard_step_four',
            title: 'Inflation Rate',
            content: 'is the rate of increase in prices over a given period of time',
            placement: 'bottom'
        },
        {
            target: '.dashboard_step_five',
            title: 'Cashflow',
            content: 'the rate at which money goes into, or into and out of,a person',
            placement: 'bottom'
        },
        {
            target: '.dashboard_step_six',
            title: 'Expenses Chart',
            content: 'Shows the distribution of your expenses by categories in a donut chart.',
            placement: 'bottom'
        },
        {
            target: '.dashboard_step_seven',
            title: 'Transaction History',
            content: 'Shows the history of all your transactions (expenses or income)',
            placement: 'bottom'
        },
        {
            target: '.dashboard_step_eight',
            title: 'News',
            content: 'Shows the latest news about the financial world',
            placement: 'bottom'
        }
    ];
    const [{ run, steps }, setState] = useSetState({
        run: false,
        steps: TOUR_STEPS
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
