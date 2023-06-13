import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { TransferHead } from '../../components/transfers/transfer-head';
import { TransferCard } from '../../components/transfers/transfer-card';
import { DashboardLayout } from '../../components/dashboard-layout';

import { useTransferStore } from 'stores/useTransferStore';
import useGetUserTransfers from 'hooks/useGetUserTransfers';
import { useAuthStore } from 'stores/useAuthStore';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import TransferCardList from 'components/shared/TransferCardList';

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
    const userId = useAuthStore((state) => state.authState?.user?.uid);
    useGetUserTransfers(userId);
    const transfers = useTransferStore((state) => state.transfers);
    const [filterValue, setFilterValue] = useState('year');
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const sortedByDate = transfers.sort((a, b) => {
            const currentDateA = new Date(a.date);
            const currentDateB = new Date(b.date);
            const resultInSecondsA = currentDateA.getTime() / 1000;
            const resultInSecondsB = currentDateB.getTime() / 1000;
            return resultInSecondsA > resultInSecondsB;
        });

        let transferLog = transfers;

        if (filterValue === 'day') {
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

            sortedByDate.forEach((transfer) => {
                const currentDate = transfer.date;
                const targetIndex = finalDayData.findIndex((item) => item.date === currentDate);
                finalDayData[targetIndex].data.push(transfer);
            });
            // console.log(finalDayData);
            setHistoryData(finalDayData);
        } else if (filterValue === 'month') {
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

            sortedByDate.forEach((transfer) => {
                const currentDate = transfer.date;
                const currentMonth = monthNames[currentDate.split('/')[0] - 1];
                const targetIndex = finalMonthData.findIndex((item) => item.title === currentMonth);

                finalMonthData[targetIndex].data.push(transfer);
            });

            // console.log(finalMonthData);

            setHistoryData(finalMonthData);
        } else if (filterValue === 'year') {
            const uniqueYear = [];
            const finalYearData = [];

            // GET THE AVAILABLE DATES
            sortedByDate.forEach((item) => {
                const currentYear = item.date.split('/')[2];
                if (!uniqueYear.includes(currentYear)) {
                    uniqueYear.push(currentYear);
                }
            });

            // ADD THE DATA TO THE FINAL YEAR DATA
            uniqueYear.forEach((year) => {
                finalYearData.push({ title: year, data: [] });
            });

            sortedByDate.forEach((transfer) => {
                const currentYear = transfer.date.split('/')[2];
                const targetIndex = finalYearData.findIndex((item) => item.title === currentYear);

                finalYearData[targetIndex].data.push(transfer);
            });

            console.log(finalYearData);

            setHistoryData(finalYearData);
        }
    }, [filterValue, transfers]);

    return (
        <>
            <Head>
                <title>Transfers | CASH</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <TransferHead filterValue={filterValue} setFilterValue={setFilterValue} />
                    <Box sx={{ pt: 3 }}>
                        {historyData.length !== 0 ? (
                            historyData.map((transfer) => (
                                <>
                                    <Typography variant='h5' mb={2}>
                                        {transfer.title}
                                    </Typography>
                                    <TransferCardList transferList={transfer.data} />
                                </>
                            ))
                        ) : (
                            <>
                                <Typography variant='h5' textAlign='center'>
                                    No transfers at the moment
                                </Typography>
                            </>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
