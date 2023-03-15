import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { getLanguage } from 'utils/getLanguage';
import { useTransactionStore } from 'stores/useTransactionStore';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'stores/useAuthStore';
import { Icon } from '../../components/shared/Icon';
import { formatPrice } from 'utils/format-price';

export const IncomeChart = (props) => {
    const theme = useTheme();
    const user = useAuthStore((state) => state.authState?.user);
    const transactions = useTransactionStore((state) => state.transactions);
    const [graphData, setGraphData] = useState('');
    const [categoryList, setCategoryList] = useState('');

    const getIncomeList = useTransactionStore((state) => state.getIncomeList);

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
            const incomeData = getIncomeList(user?.uid);

            const data = {
                datasets: [
                    {
                        data: incomeData.map((item) => item.amount),
                        backgroundColor: incomeData.map((item) => item.color),
                        borderWidth: 8,
                        borderColor: '#FFFFFF',
                        hoverBorderColor: '#FFFFFF'
                    }
                ],
                labels: incomeData.map((item) => item.category_name)
            };

            const total = incomeData.map((item) => item.amount).reduce((acc, cur) => (acc += cur), 0);

            const list = incomeData.map((item) => {
                return {
                    title: item.category_name,
                    value: (item.amount / total).toLocaleString(undefined, {
                        style: 'percent',
                        minimumFractionDigits: 2
                    }),
                    icon: item.transaction_icon,
                    color: item.color
                };
            });
            setGraphData(data);
            setCategoryList(list);
        }
    }, [transactions]);

    return (
        <Card {...props}>
            <CardHeader title={getLanguage().income} />
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
            </CardContent>
        </Card>
    );
};
