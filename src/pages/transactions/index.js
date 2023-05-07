import Head from 'next/head';
import {
    Box,
    Container,
    FormControl,
    Grid,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Switch,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

import { DashboardLayout } from '../../components/dashboard-layout';
import { formatPrice } from 'utils/format-price';
import { useAccountStore } from 'stores/useAccountStore';
import { Icon } from 'components/shared/Icon';
import useSortCategories from 'hooks/useSortCategories';
import { useTransactionStore } from 'stores/useTransactionStore';
import useGetUserTransactions from 'hooks/useGetUserTransactions';
import { useAuthStore } from 'stores/useAuthStore';
import TransactionCardList from 'components/shared/TransactionCardList';
import { getLanguage } from 'utils/getLanguage'
import { useLanguageStore } from 'stores/useLanguageStore';
import DashboardTour from 'components/tours/DashboardTour';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: 250
        }
    }
};
const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const Page = () => {
    const accounts = useAccountStore((state) => state.accounts);
    const user = useAuthStore((state) => state.authState.user);
    const allTransactions = useTransactionStore((state) => state.transactions);
    const [filterAccount, setFilterAccount] = useState('all');
    const [filterType, setFilterType] = useState('year');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [total, setTotal] = useState(0);
    const [historyData, setHistoryData] = useState([]);
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const [isExpense, setIsExpense, handleExpense, categoryData] = useSortCategories();
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        setShowTour(true);
    }, []);

    const tourSteps = [
        {
            target: '.transactions_step_one',
            title: 'Transaction Overview',
            content: 'Displays all the transactions you made while using the application',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.transactions_step_two',
            title: 'Total',
            content: 'Sum of all the transactions currently displayed on the list',
            placement: 'bottom'
        },
        {
            target: '.transactions_step_three',
            title: 'Type',
            content: 'used for sorting the transactions into expense or category',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.transactions_step_four',
            title: 'Sort by Category',
            content: 'used to sort the transactions by categories.',
            placement: 'bottom'
        },
        {
            target: '.transactions_step_five',
            title: 'Sort by Account',
            content: 'used to sort the transactions by accounts used for that transaction.',
            placement: 'bottom'
        },
        {
            target: '.transactions_step_six',
            title: 'Sort by Time',
            content: 'used to sort the transactions by year, month or day.',
            placement: 'bottom'
        },
        {
            target: '.transactions_step_seven',
            title: 'List of Transactions',
            content: 'Displays all the financial transactions and their amount',
            placement: 'bottom'
        }
    ];

    useGetUserTransactions(user.uid);

    const handleAccountChange = (e) => {
        const currentAccountId = e.target.value;
        const currentAccount = accounts.find((account) => account.id === currentAccountId);
        // formik.setFieldValue('targetAccount', currentAccount);

        // console.log(currentAccount);
        setFilterAccount(e.target.value);
    };

    const handleTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const currentCategoryId = e.target.value;
        const currentCategory = categoryData.find((category) => category.id === currentCategoryId);
        console.log(currentCategoryId);
        setSelectedCategory(e.target.value);
    };

    useEffect(() => {
        const sortedTransactions = allTransactions.filter((transaction) => {
            const currentType = isExpense ? 'expense' : 'income';
            if (selectedCategory === 'all' && filterAccount === 'all' && currentType === transaction.type) {
                return transaction;
            } else if (transaction.category.id === selectedCategory && filterAccount === 'all') {
                return transaction;
            } else if (transaction.category.id === selectedCategory && filterAccount === transaction.targetAccount.id) {
                return transaction;
            } else if (selectedCategory === 'all' && filterAccount === transaction.targetAccount.id) {
                return transaction;
            }
        });

        const totalList = [];

        const sortedByDate = sortedTransactions.sort((a, b) => {
            const currentDateA = new Date(a.date);
            const currentDateB = new Date(b.date);
            const resultInSecondsA = currentDateA.getTime() / 1000;
            const resultInSecondsB = currentDateB.getTime() / 1000;
            return resultInSecondsA > resultInSecondsB;
        });

        //SORT BY TIME
        // console.log('SORTED', sortedByDate);
        if (filterType === 'year') {
            const uniqueYear = [];
            const finalYearData = [];

            // GET THE AVAILABLE DATES
            sortedByDate.forEach((item) => {
                const currentYear = item.date.split('/')[2];
                if (!uniqueYear.includes(currentYear)) {
                    uniqueYear.push(currentYear);
                }
            });

            // ADD THE DATA TO THE FINAL YEAR DATAA
            uniqueYear.forEach((year) => {
                finalYearData.push({ title: year, data: [] });
            });

            sortedByDate.forEach((transaction) => {
                totalList.push(transaction);
                const currentYear = transaction.date.split('/')[2];
                const targetIndex = finalYearData.findIndex((item) => item.title === currentYear);

                finalYearData[targetIndex].data.push(transaction);
            });

            // console.log('YEARS', finalYearData);

            setHistoryData(finalYearData);
        } else if (filterType === 'month') {
            const finalMonthData = [];

            const uniqueMonths = [];

            // GET THE AVAILABLE MONTHS
            sortedByDate.forEach((item) => {
                const currentDate = item.date;

                const currentMonth = Number(currentDate.split('/')[0]) - 1;
                if (!uniqueMonths.includes(monthNames[currentMonth])) {
                    uniqueMonths.push(monthNames[currentMonth]);
                }
            });

            // ADD THE MONTHS TO THE FINAL DATA
            uniqueMonths.forEach((month) => {
                finalMonthData.push({ title: month, data: [] });
            });

            sortedTransactions.forEach((transaction) => {
                totalList.push(transaction);
                const currentDate = transaction.date;
                const currentMonth = monthNames[currentDate.split('/')[0] - 1];
                const targetIndex = finalMonthData.findIndex((item) => item.title === currentMonth);

                finalMonthData[targetIndex].data.push(transaction);
            });

            // console.log(finalMonthData);

            setHistoryData(finalMonthData);
        } else if (filterType === 'day') {
            const uniqueDays = [];
            const finalDayData = [];

            // GET THE AVAILABLE DATES
            sortedByDate.forEach((item) => {
                const currentDate = item.date;
                if (!uniqueDays.includes(currentDate)) {
                    uniqueDays.push(currentDate);
                }
            });

            // ADD THE DATES TO THE FINAL DATA
            uniqueDays.forEach((date) => {
                const [month, day, year] = date.split('/');
                finalDayData.push({ title: `${monthNames[month - 1]} ${day}, ${year}`, data: [], date });
            });

            sortedTransactions.forEach((transaction) => {
                totalList.push(transaction);
                const currentDate = transaction.date;
                const targetIndex = finalDayData.findIndex((item) => item.date === currentDate);
                finalDayData[targetIndex].data.push(transaction);
            });
            // console.log(finalDayData);
            setHistoryData(finalDayData);
        }

        const sum = totalList.reduce((acc, current) => {
            acc += current.amount;
            return acc;
        }, 0);

        // console.log(sum);
        setTotal(sum);
    }, [filterAccount, selectedCategory, allTransactions, isExpense, filterType]);

    return (
        <>
            <Head>
                <title>Transactions | CASH</title>
            </Head>
            {showTour && <DashboardTour setShowTour={setShowTour} tourSteps={tourSteps} />}
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth='md'>
                    <Typography
                        className='transactions_step_one'
                        variant='h3'
                        mb={4}
                        sx={{
                            fontSize: { xs: 20, lg: 'auto' },
                            textAlign: {
                                xs: 'center',
                                lg: 'initial'
                            }
                        }}
                    >
                        {getLanguage(currentLanguage).transactionOverview}
                    </Typography>
                    <Typography variant='h4' align='center' mb={4} className='transactions_step_two'>
                        {formatPrice(total, true)}
                    </Typography>

                    <Box
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}
                        className='transactions_step_three'
                    >
                        <Typography variant='body1'>{getLanguage(currentLanguage).income}</Typography>
                        <Switch
                            checked={isExpense}
                            onChange={handleExpense}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography variant='body1'>{getLanguage(currentLanguage).expense}</Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'grid', lg: 'flex' }, gap: 2, mb: 6 }}>
                        <FormControl fullWidth className='transactions_step_four'>
                            <InputLabel id='demo-simple-select-label'>
                                {getLanguage(currentLanguage).chooseCategory}
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={selectedCategory.id}
                                label={getLanguage(currentLanguage).chooseCategory}
                                defaultValue='all'
                                onChange={handleCategoryChange}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value='all'>{getLanguage(currentLanguage).all}</MenuItem>
                                {categoryData?.map((tag) => {
                                    return (
                                        <MenuItem key={tag.id} value={tag.id}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <ListItemIcon>
                                                    <Icon name={tag.category_icon} />
                                                </ListItemIcon>
                                                <ListItemText>{tag.category_name}</ListItemText>
                                            </Box>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth className='transactions_step_five'>
                            <InputLabel id='demo-simple-select-label'>
                                {getLanguage(currentLanguage).chooseAccount}
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={filterAccount}
                                label='filterAccount'
                                onChange={handleAccountChange}
                            >
                                <MenuItem value='all'>{getLanguage(currentLanguage).all}</MenuItem>
                                {accounts.map((account) => {
                                    return (
                                        <MenuItem key={account.id} value={account.id}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <ListItemIcon>
                                                    <Icon name={account.account_icon} />
                                                </ListItemIcon>
                                                <ListItemText>{account.account_name}</ListItemText>
                                            </Box>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='transactions_step_six'>
                            <InputLabel id='demo-simple-select-label'>{getLanguage(currentLanguage).filter}</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={filterType}
                                label='filterType'
                                onChange={handleTypeChange}
                            >
                                <MenuItem value={'year'}>{getLanguage(currentLanguage).year}</MenuItem>
                                <MenuItem value={'month'}>{getLanguage(currentLanguage).month}</MenuItem>
                                <MenuItem value={'day'}>{getLanguage(currentLanguage).day}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'grid', gap: 2 }} className='transactions_step_seven'>
                        {historyData.map((item) => (
                            <>
                                <Typography variant='h4'>{item.title}</Typography>
                                <TransactionCardList transactionList={item.data} />
                            </>
                        ))}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

// if (filterType === 'day') {
//
//     // CREATE UNIQUE DAYS ARRAY
//     const uniqueDays = [];
//     const finalDayData = [];

//     // GET THE AVAILABLE DATES
//     sortedByDate.forEach((item) => {
//         const currentDate = formatDate(convertTimestamp(item.created_at));
//         if (!uniqueDays.includes(currentDate)) {
//             uniqueDays.push(currentDate);
//         }
//     });

//     // ADD THE DATES TO THE FINAL DATA
//     uniqueDays.forEach((date) => {
//         const textDate = formatDate(new Date(date), true);
//         finalDayData.push({ title: textDate, data: [], date });
//     });

//     sortedTransactions.forEach((transaction) => {
//         const currentDate = formatDate(convertTimestamp(transaction.created_at));
//         const targetIndex = finalDayData.findIndex((item) => item.date === currentDate);

//         finalDayData[targetIndex].data.push(transaction);
//     });

//     const sum = sortedTransactions.reduce((acc, current) => {
//         if (current.category_name === currentCategory) {
//             acc += current.amount;
//         }

//         return acc;
//     }, 0);
//     setTotal(sum);
//     setHistoryData(finalDayData);

//     // console.log(finalDayData);
// } else if (filterType === 'month') {
//     const sortedByDate = sortedTransactions.sort((a, b) => a.created_at.seconds > b.created_at.seconds);
//     const finalMonthData = [];
//     const monthNames = [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June',
//         'July',
//         'August',
//         'September',
//         'October',
//         'November',
//         'December'
//     ];
//     const uniqueMonths = [];

//     // GET THE AVAILABLE MONTHS
//     sortedByDate.forEach((item) => {
//         const currentDate = formatDate(convertTimestamp(item.created_at));

//         const currentMonth = Number(currentDate.split('/')[0]) - 1;
//         if (!uniqueMonths.includes(monthNames[currentMonth])) {
//             uniqueMonths.push(monthNames[currentMonth]);
//         }
//     });

//     // ADD THE MONTHS TO THE FINAL DATA
//     uniqueMonths.forEach((month) => {
//         finalMonthData.push({ title: month, data: [] });
//     });

//     sortedTransactions.forEach((transaction) => {
//         const currentDate = formatDate(convertTimestamp(transaction.created_at));
//         const currentMonth = monthNames[currentDate.split('/')[0] - 1];
//         const targetIndex = finalMonthData.findIndex((item) => item.title === currentMonth);

//         finalMonthData[targetIndex].data.push(transaction);
//     });

//     const sum = sortedTransactions.reduce((acc, current) => {
//         if (current.category_name === currentCategory) {
//             acc += current.amount;
//         }

//         return acc;
//     }, 0);
//     setTotal(sum);
//     setHistoryData(finalMonthData);
// } else if (filterType === 'year') {
//     console.log('SORTED', sortedTransactions);

//     const sum = sortedTransactions.reduce((acc, current) => {
//         if (current.category_name === currentCategory) {
//             acc += current.amount;
//         }

//         return acc;
//     }, 0);
//     setTotal(sum);

//     console.log([
//         {
//             title: '2022',
//             data: sortedTransactions
//         }
//     ]);
//     setHistoryData([
//         {
//             title: '2022',
//             data: sortedTransactions
//         }
//     ]);
// }
