import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    FormHelperText,
    Button
} from '@mui/material';
import Chip from '@mui/material/Chip';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import articles from '../data/articles';
import { getLanguage } from 'utils/getLanguage';
import { DashboardLayout } from '../components/dashboard-layout';
import { toast } from 'react-hot-toast';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: 250
        }
    }
};

function generateYearsArray(startYear, endYear) {
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
        years.push(i);
    }
    return years;
}

const currentYear = new Date().getFullYear();
const yearArray = generateYearsArray(currentYear, 2080);

const Page = () => {
    const [initialDeposit, setInitialDeposit] = useState('');
    const [period, setPeriod] = useState('');
    const [subsequentDeposit, setSubsequentDeposit] = useState('');
    const [targetYear, setTargetYear] = useState('');
    const [projectedData, setProjectedData] = useState('');

    const handleSubmit = async () => {
        setProjectedData('');
        const loader = toast.loading('Loading...');
        const res = await fetch(
            `/api/investment/?initialDeposit=${initialDeposit}&period=${period}&subsequentDeposit=${subsequentDeposit}&targetYear=${targetYear}`
        );

        const data = await res.json();
        toast.dismiss(loader);
        toast.success('Successfully Analyzed');
        console.log(data);
        setProjectedData(data.data);
    };

    return (
        <>
            <Head>
                <title>Investments | CASH</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1
                        }}
                    >
                        <Typography sx={{ m: 1, mb: 4 }} variant='h4'>
                            {getLanguage().investment}
                        </Typography>
                    </Box>

                    <Typography variant='h6' mb={4}>
                        See how your money can grow over time.
                    </Typography>
                    <Grid container spacing={2} justifyContent='center' mb={6}>
                        <Grid item xs={12} lg={3}>
                            <FormControl fullWidth>
                                <TextField
                                    id='standard-basic'
                                    label='Initial Investment'
                                    variant='outlined'
                                    type='number'
                                    value={initialDeposit}
                                    onChange={(e) => setInitialDeposit(e.target.value)}
                                />
                                <FormHelperText>How much would you like to invest at first?</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>Period</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={period}
                                    label='Period'
                                    onChange={(e) => setPeriod(e.target.value)}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value='12'>Monthly</MenuItem>
                                    <MenuItem value='4'>Quarterly</MenuItem>
                                    <MenuItem value='2'>Semi-Annually</MenuItem>
                                    <MenuItem value='1'>Annually</MenuItem>
                                </Select>
                                <FormHelperText>How often would you like to invest after ?</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <FormControl fullWidth>
                                <TextField
                                    id='standard-basic'
                                    label='Subsequent Deposit'
                                    variant='outlined'
                                    type='number'
                                    value={subsequentDeposit}
                                    onChange={(e) => setSubsequentDeposit(e.target.value)}
                                />
                                <FormHelperText>How much would your following investment be?</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={3}>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>Year</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={targetYear}
                                    label='Period'
                                    onChange={(e) => setTargetYear(e.target.value)}
                                    MenuProps={MenuProps}
                                >
                                    {yearArray.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Until when would you like to invest?</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item lg={6}>
                            <Button fullWidth onClick={handleSubmit} variant='contained'>
                                Calculate Money Growth
                            </Button>
                        </Grid>
                    </Grid>

                    {/* RESULT */}

                    {projectedData && (
                        <Paper sx={{ py: 8, px: 4 }}>
                            <Grid container spacing={4} textAlign='center'>
                                <Grid item xs={12}>
                                    <Typography variant='body2'>Your Total Investment</Typography>
                                    <Typography variant='h4'>{projectedData.totalInvestment}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Typography variant='body2'>Savings Account</Typography>
                                    <Typography variant='h6'>{projectedData.savingsAccount}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Typography variant='body2'>Time Deposit</Typography>
                                    <Typography variant='h6'>{projectedData.timeDeposit}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Typography variant='body2'>Low Risk Fund</Typography>
                                    <Typography variant='h6'>{projectedData.lowRiskFund}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Typography variant='body2'>Moderate Risk Fund</Typography>
                                    <Typography variant='h6'>{projectedData.moderateRiskFund}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Typography variant='body2'>Aggressive Risk Fund</Typography>
                                    <Typography variant='h6'>{projectedData.aggressiveRiskFund}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
