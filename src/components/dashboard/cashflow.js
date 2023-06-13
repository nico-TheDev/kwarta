import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, Typography, useTheme, Tooltip } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getLanguage } from 'utils/getLanguage';
import { deepPurple, green, red, teal } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useTransactionStore } from 'stores/useTransactionStore';
import { useLanguageStore } from 'stores/useLanguageStore';
import Link from 'next/link';
import { useAuthStore } from 'stores/useAuthStore';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dateSorter = (a, b) => {
    const currentDateA = new Date(a.date);
    const currentDateB = new Date(b.date);
    const resultInSecondsA = currentDateA.getTime() / 1000;
    const resultInSecondsB = currentDateB.getTime() / 1000;
    return resultInSecondsA > resultInSecondsB;
};

const monthSorter = (transaction, finalMonthData) => {
    const currentDate = transaction.date;
    const currentMonth = monthNames[currentDate.split('/')[0] - 1];
    const targetIndex = finalMonthData.findIndex((item) => item.title === currentMonth);

    finalMonthData[targetIndex].data.push(transaction);
};

const monthDataSorter = (currentMonth) => {
    if (currentMonth.data.length !== 0) {
        const sum = currentMonth.data.reduce((acc, currentTransaction) => {
            const currentDate = currentTransaction.date;
            const currentTransactionMonth = monthNames[currentDate.split('/')[0] - 1];

            if (currentTransactionMonth === currentMonth.title) {
                acc += currentTransaction.amount;
            }

            return acc;
        }, 0);

        return sum;
    } else {
        return 0;
    }
};

export const Cashflow = (props) => {
    const theme = useTheme();
    const getExpenseList = useTransactionStore((state) => state.getExpenseList);
    const transactions = useTransactionStore((state) => state.transactions);
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const user = useAuthStore((state) => state.authState?.user);

    const [expenseData, setExpenseData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [savingsData, setSavingsData] = useState([]);
    const [investmentData, setInvestmentData] = useState([]);

    const data = {
        datasets: [
            {
                backgroundColor: red[500],
                barPercentage: 0.5,
                barThickness: 8,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: expenseData,
                label: 'Expense',
                maxBarThickness: 10
            },
            {
                backgroundColor: green[500],
                barPercentage: 0.5,
                barThickness: 8,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: incomeData,
                label: 'Income',
                maxBarThickness: 10
            },
            {
                backgroundColor: deepPurple[500],
                barPercentage: 0.5,
                barThickness: 8,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: savingsData,
                label: 'Savings',
                maxBarThickness: 10
            },
            {
                backgroundColor: teal[500],
                barPercentage: 0.5,
                barThickness: 8,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: investmentData,
                label: 'Investments',
                maxBarThickness: 10
            }
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        xAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        ],
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
            const allExpenses = transactions.filter((transaction) => transaction.type === 'expense');
            const allIncome = transactions.filter((transaction) => transaction.type === 'income');
            const allSavings = transactions.filter((transaction) => transaction.type === 'savings');
            const allInvestments = transactions.filter((transaction) => transaction.type === 'investments');

            // console.log('ALL', allExpenses);
            if (
                allExpenses.length !== 0 ||
                allIncome.length !== 0 ||
                allSavings.length !== 0 ||
                allInvestments.length !== 0
            ) {
                const sortedExpenses = allExpenses.sort(dateSorter);
                const sortedIncome = allIncome.sort(dateSorter);
                const sortedSavings = allSavings.sort(dateSorter);
                const sortedInvestments = allInvestments.sort(dateSorter);

                const finalMonthDataExpense = [],
                    finalMonthDataIncome = [],
                    finalMonthDataSavings = [],
                    finalMonthDataInvestments = [];

                // ADD THE MONTHS TO THE FINAL DATA
                monthNames.forEach((month) => {
                    finalMonthDataExpense.push({ title: month, data: [] });
                    finalMonthDataIncome.push({ title: month, data: [] });
                    finalMonthDataSavings.push({ title: month, data: [] });
                    finalMonthDataInvestments.push({ title: month, data: [] });
                });

                sortedExpenses.forEach((transaction) => monthSorter(transaction, finalMonthDataExpense));
                sortedIncome.forEach((transaction) => monthSorter(transaction, finalMonthDataIncome));
                sortedSavings.forEach((transaction) => monthSorter(transaction, finalMonthDataSavings));
                sortedInvestments.forEach((transaction) => monthSorter(transaction, finalMonthDataInvestments));

                const monthDataListExpense = finalMonthDataExpense.map(monthDataSorter);
                const monthDataListIncome = finalMonthDataIncome.map(monthDataSorter);
                const monthDataListSavings = finalMonthDataSavings.map(monthDataSorter);
                const monthDataListInvestments = finalMonthDataInvestments.map(monthDataSorter);

                setExpenseData(monthDataListExpense);
                setIncomeData(monthDataListIncome);
                setSavingsData(monthDataListSavings);
                setInvestmentData(monthDataListInvestments);
            }
        }
    }, [transactions]);

    return (
        <Card {...props}>
            <CardHeader title={getLanguage(currentLanguage).cashflow} />
            <Divider />
            <CardContent>
                <Tooltip title={getLanguage(currentLanguage).tooltipCashflowGraph}>
                    <Box
                        sx={{
                            height: 400,
                            position: 'relative'
                        }}
                    >
                        <Bar data={data} options={options} />
                    </Box>
                </Tooltip>
            </CardContent>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button color='primary' endIcon={<ArrowRightIcon fontSize='small' />} size='small'>
                    <Link href='/cashflow'>{getLanguage(currentLanguage).overview}</Link>
                </Button>
            </Box>
        </Card>
    );
};
