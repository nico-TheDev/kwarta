import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getLanguage } from 'utils/getLanguage';
import { green, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useTransactionStore } from 'stores/useTransactionStore';

export const Cashflow = (props) => {
    const theme = useTheme();
    const getExpenseList = useTransactionStore((state) => state.getExpenseList);
    const transactions = useTransactionStore((state) => state.transactions);

    const [expenseData, setExpenseData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);

    const data = {
        datasets: [
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
                backgroundColor: red[500],
                barPercentage: 0.5,
                barThickness: 8,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: expenseData,
                label: 'Expense',
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
        const allExpenses = transactions.filter((transaction) => transaction.type === 'expense');
        const allIncome = transactions.filter((transaction) => transaction.type === 'income');
        // console.log('ALL', allExpenses);
        if (allExpenses.length !== 0) {
            const sortedExpenses = allExpenses.sort((a, b) => {
                const currentDateA = new Date(a.date);
                const currentDateB = new Date(b.date);
                const resultInSecondsA = currentDateA.getTime() / 1000;
                const resultInSecondsB = currentDateB.getTime() / 1000;
                return resultInSecondsA > resultInSecondsB;
            });
            const sortedIncome = allIncome.sort((a, b) => {
                const currentDateA = new Date(a.date);
                const currentDateB = new Date(b.date);
                const resultInSecondsA = currentDateA.getTime() / 1000;
                const resultInSecondsB = currentDateB.getTime() / 1000;
                return resultInSecondsA > resultInSecondsB;
            });

            const finalMonthDataExpense = [];
            const finalMonthDataIncome = [];
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            // ADD THE MONTHS TO THE FINAL DATA
            monthNames.forEach((month) => {
                finalMonthDataExpense.push({ title: month, data: [] });
                finalMonthDataIncome.push({ title: month, data: [] });
            });

            sortedExpenses.forEach((transaction) => {
                const currentDate = transaction.date;
                const currentMonth = monthNames[currentDate.split('/')[0] - 1];
                const targetIndex = finalMonthDataExpense.findIndex((item) => item.title === currentMonth);

                finalMonthDataExpense[targetIndex].data.push(transaction);
            });
            sortedIncome.forEach((transaction) => {
                const currentDate = transaction.date;
                const currentMonth = monthNames[currentDate.split('/')[0] - 1];
                const targetIndex = finalMonthDataIncome.findIndex((item) => item.title === currentMonth);

                finalMonthDataIncome[targetIndex].data.push(transaction);
            });

            const monthDataListExpense = finalMonthDataExpense.map((currentMonth) => {
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
            });
            const monthDataListIncome = finalMonthDataIncome.map((currentMonth) => {
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
            });

            setExpenseData(monthDataListExpense);
            setIncomeData(monthDataListIncome);
        }
    }, [transactions]);

    return (
        <Card {...props}>
            <CardHeader
                action={
                    <Button endIcon={<ArrowDropDownIcon fontSize='small' />} size='small'>
                        {getLanguage().last7Days}
                    </Button>
                }
                title={getLanguage().cashflow}
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                    <Bar data={data} options={options} />
                </Box>
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
                    {getLanguage().overview}
                </Button>
            </Box>
        </Card>
    );
};
