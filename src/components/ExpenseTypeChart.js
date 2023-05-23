import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme, Tooltip } from '@mui/material';
import { getLanguage } from 'utils/getLanguage';
import { useTransactionStore } from 'stores/useTransactionStore';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'stores/useAuthStore';
import { Icon } from '../components/shared/Icon';
import { formatPrice } from 'utils/format-price';
import { useLanguageStore } from 'stores/useLanguageStore';
import { blue, green, red, yellow } from '@mui/material/colors';

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { validateYupSchema } from 'formik';

export const ExpenseTypeChart = (props) => {
    const theme = useTheme();
    const user = useAuthStore((state) => state.authState?.user);
    const userSurvey = useAuthStore((state) => state.authState.userSurvey);
    const transactions = useTransactionStore((state) => state.transactions);
    const [graphData, setGraphData] = useState('');
    const [categoryList, setCategoryList] = useState('');
    const [prompt, setPrompt] = useState('');
    const [isPositive, setIsPositive] = useState('');
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

    const getExpenseTypeList = useTransactionStore((state) => state.getExpenseTypeList);

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    useEffect(() => {
        if (!user) return;
        else {
            const expenseData = getExpenseTypeList(user?.uid);

            const data = {
                datasets: [
                    {
                        data: expenseData.map((item) => item.amount),
                        backgroundColor: expenseData.map((item) => item.color),
                        borderWidth: 8,
                        borderColor: '#FFFFFF',
                        hoverBorderColor: '#FFFFFF'
                    }
                ],
                labels: ['Needs', 'Wants', 'Savings']
            };

            const total = expenseData.map((item) => item.amount).reduce((acc, cur) => (acc += cur), 0);

            const list = expenseData.map((item) => {
                return {
                    title: item.name,
                    value: (item.amount / total).toLocaleString(undefined, {
                        style: 'percent',
                        minimumFractionDigits: 2
                    }),
                    icon: item.icon,
                    color: item.color
                };
            });

            const savings = (expenseData[2].amount / total) * 100;

            if (userSurvey.financeRule.value === '1') {
                if (savings <= 20) {
                    setPrompt("You're spending a lot for your account. You must save at least 20% for savings");
                    setIsPositive(false);
                } else {
                    setPrompt("You've made a good decision. Continue placing 20% of your income in savings");
                    setIsPositive(true);
                }
            } else if (userSurvey.financeRule.value === '2') {
                if (savings <= 30) {
                    setPrompt("You're spending a lot for your account. You must save at least 30% for savings");
                    setIsPositive(false);
                } else {
                    setPrompt("You've made a good decision. Continue placing 30% of your income in savings");
                    setIsPositive(true);
                }
            } else if (userSurvey.financeRule.value === '3') {
                if (savings <= 10) {
                    setPrompt("You're spending a lot for your account. You must save at least 10% for savings");
                    setIsPositive(false);
                } else {
                    setPrompt("You've made a good decision. Continue placing 10% of your income in savings");
                    setIsPositive(true);
                }
            }

            setGraphData(data);
            setCategoryList(list);
        }
    }, [transactions]);

    return (
        <Card {...props}>
            <CardHeader title='Expenses Type' sx={{ width: 'max-content' }} />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    {graphData && <Doughnut data={graphData} options={options} />}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        flexWrap: 'wrap',
                        p: 2,
                        gap: 1
                    }}
                >
                    {categoryList.length !== 0 &&
                        categoryList.map(({ color, title, value, icon }) => (
                            <Box
                                key={title}
                                sx={{
                                    color,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: '30%',
                                    p: 1
                                }}
                            >
                                <Icon name={icon} color='inherit' fontSize='large' />
                                <Typography color='textPrimary' variant='caption'>
                                    {title}
                                </Typography>
                                <Typography style={{ color }} variant='body1'>
                                    {value}
                                </Typography>
                            </Box>
                        ))}
                </Box>
                <Divider />
                <Box
                    sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                    {isPositive ? (
                        <SentimentVerySatisfiedIcon color='success' fontSize='large' />
                    ) : (
                        <SentimentVeryDissatisfiedIcon color='danger' fontSize='large' />
                    )}
                    <Typography color='textPrimary' variant='caption'>
                        {prompt}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
