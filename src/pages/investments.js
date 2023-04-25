import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    FormHelperText,
    Button,
    CircularProgress
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getLanguage } from 'utils/getLanguage';
import { DashboardLayout } from '../components/dashboard-layout';
import { toast } from 'react-hot-toast';
import { useAccountStore } from 'stores/useAccountStore';
import { formatPrice } from 'utils/format-price';
import { grey } from '@mui/material/colors';
import { useLanguageStore } from 'stores/useLanguageStore';

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

//Calculates Future Value of a cash flow with constant payments and interest rate (annuities)
//@param    float   rate    Interest rate per period
//@param    int     nper    Number of periods
//@param    float   pmt     Periodic payment (annuity)
//@param    float   pv      Present Value
//@param    int     type    Payment Type: 0 - end of period, 1 start of period
function futureValue(rate = 0, nper = 0, pmt = 0, pv = 0, type = 0) {
    var result;
    if (rate != 0.0) {
        result = -pv * Math.pow(1 + rate, nper) - (pmt * (1 + rate * type) * (Math.pow(1 + rate, nper) - 1)) / rate;
    } else {
        result = -pv - pmt * nper;
    }
    return result;
}
// futureValue((rate_of_return / 100 / 12), (years_to_grow * 12), -(monthly_contribution), -(initial_investment), 0)

const Page = () => {
    const [initialDeposit, setInitialDeposit] = useState('');
    const [period, setPeriod] = useState('');
    const [subsequentDeposit, setSubsequentDeposit] = useState('');
    const [targetYear, setTargetYear] = useState('');
    const [projectedData, setProjectedData] = useState('');
    const [suggestionData, setSuggestionData] = useState('');
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const accounts = useAccountStore((state) => state.accounts);

    const [accountAmounts, setAccountAmounts] = useState(accounts.map((item) => item.account_amount));

    const handleSubmit = async () => {
        setProjectedData('');
        const loader = toast.loading('Loading...');
        const year = targetYear - new Date().getFullYear();
        try {
            const rate = (percentage) => percentage / 100 / 12;
            const yearsToGrow = year * Number(period);

            const totalInvestment = formatPrice(Number(initialDeposit) + Number(subsequentDeposit) * yearsToGrow, true);
            const savingsAccount = formatPrice(
                futureValue(rate(0.3), yearsToGrow, -subsequentDeposit, -initialDeposit, 0),
                true
            );
            const timeDeposit = formatPrice(
                futureValue(rate(0.7), yearsToGrow, -subsequentDeposit, -initialDeposit, 0),
                true
            );
            const lowRiskFund = formatPrice(
                futureValue(rate(4), yearsToGrow, -subsequentDeposit, -initialDeposit, 0),
                true
            );
            const moderateRiskFund = formatPrice(
                futureValue(rate(8), yearsToGrow, -subsequentDeposit, -initialDeposit, 0),
                true
            );
            const aggressiveRiskFund = formatPrice(
                futureValue(rate(10), yearsToGrow, -subsequentDeposit, -initialDeposit, 0),
                true
            );
            toast.success('Successfully Analyzed');
            console.log({});
            setProjectedData({
                totalInvestment,
                savingsAccount,
                timeDeposit,
                lowRiskFund,
                moderateRiskFund,
                aggressiveRiskFund
            });
        } catch (err) {
            console.log(err);
            toast.error('Something Went Wrong: ', err.message);
        } finally {
            toast.dismiss(loader);
        }
    };

    console.log(Math.max(...accountAmounts));

    useEffect(() => {
        const getSuggestions = async () => {
            const accountAmounts = accounts.map((item) => item.account_amount);
            const highestAccount = Math.max(...accountAmounts);
            const passedAccounts = accounts.filter((account) => account.account_amount >= 10000);
            // console.log(passedAccounts)
            const amount = Math.round(highestAccount / 10000) * 10000;
            const year = new Date().getFullYear() + 20;
            try {
                const rate = (percentage) => percentage / 100 / 12;
                const yearsToGrow = 20 * 12;

                const lowRiskFund = formatPrice(futureValue(rate(4), yearsToGrow, -1000, -amount, 0), true);
                const moderateRiskFund = formatPrice(futureValue(rate(8), yearsToGrow, -1000, -amount, 0), true);
                const aggressiveRiskFund = formatPrice(futureValue(rate(10), yearsToGrow, -1000, -amount, 0), true);

                console.log({ lowRiskFund, moderateRiskFund, aggressiveRiskFund });
                setSuggestionData({
                    lowRiskFund,
                    moderateRiskFund,
                    aggressiveRiskFund,
                    initial: amount,
                    period: 'monthly',
                    addOn: 1000,
                    year: Number(year) - Number(new Date().getFullYear())
                });
            } catch (err) {
                console.error(err);
            }
        };

        getSuggestions();
    }, []);

    const FixedSuggestions = () => (
        <>
            <Grid item xs={12} justifySelf='center'>
                <Typography variant='h6' sx={{ width: '80%', mx: 'auto' }}>
                    You should find more sources of income, but in the mean time start your investment journey with the
                    following:
                </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ fontSize: 50 }}>
                        <AttachMoneyIcon fontSize='inherit' color='info' />
                    </Box>
                    <Typography variant='body1' mb={2}>
                        GInvest
                    </Typography>
                    <Button
                        variant='outlined'
                        href='https://thebeat.asia/manila/venture/money/how-to-earn-passively-from-gcashs-ginvest-through-dividends'
                        target='blank'
                    >
                        Read More
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ fontSize: 50 }}>
                        <AttachMoneyIcon fontSize='inherit' color='warning' />
                    </Box>
                    <Typography variant='body1' mb={2}>
                        Pag-ibig MP2
                    </Typography>
                    <Button
                        variant='outlined'
                        href='https://www.pagibigfund.gov.ph/Membership_ModifiedPagIBIG2.html'
                        target='blank'
                    >
                        Read More
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ fontSize: 50 }}>
                        <AttachMoneyIcon fontSize='inherit' color='error' />
                    </Box>
                    <Typography variant='body1' mb={2}>
                        Tonik Time Deposit
                    </Typography>
                    <Button variant='outlined' href='https://tonikbank.com/savings-cards/time-deposit' target='blank'>
                        Read More
                    </Button>
                </Paper>
            </Grid>{' '}
        </>
    );
    const VariableSuggestions = () => (
        <>
            <Grid item xs={10}>
                <Typography variant='h6' mb={2}>
                    Here are our recommendations for possible investments.
                </Typography>
                <Typography variant='body1'>
                    Investing an initial amount of {formatPrice(suggestionData.initial, true)} with{' '}
                    {formatPrice(suggestionData.addOn, true)} subsequent deposits monthly for {suggestionData.year}{' '}
                    years could yield the following result on different funds.
                </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ fontSize: 50 }}>
                        <AttachMoneyIcon fontSize='inherit' color='success' />
                    </Box>
                    <Typography variant='body1'>Low Risk Fund</Typography>
                    <Typography variant='h6'>{suggestionData.lowRiskFund}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ fontSize: 50 }}>
                        <AttachMoneyIcon fontSize='inherit' color='warning' />
                    </Box>
                    <Typography variant='body1'>Moderate Risk Fund</Typography>
                    <Typography variant='h6'>{suggestionData.moderateRiskFund}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ fontSize: 50 }}>
                        <AttachMoneyIcon fontSize='inherit' color='error' />
                    </Box>
                    <Typography variant='body1'>Aggressive Risk Fund</Typography>
                    <Typography variant='h6'>{suggestionData.aggressiveRiskFund}</Typography>
                </Paper>
            </Grid>
        </>
    );
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
                            {getLanguage(currentLanguage).investment}
                        </Typography>
                    </Box>

                    <Typography variant='h6' mb={4}>
                        See how your money can grow over time.
                    </Typography>

                    <Grid container spacing={2} mb={8} textAlign='center' justifyContent='center'>
                        {!suggestionData ? (
                            <Grid>
                                <CircularProgress />
                                <Typography variant='h6' mt={2}>
                                    Loading recommendations...
                                </Typography>
                            </Grid>
                        ) : Math.max(...accountAmounts) > 5000 ? (
                            <VariableSuggestions />
                        ) : (
                            <FixedSuggestions />
                        )}
                    </Grid>
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
                                    <Box sx={{ fontSize: 70 }}>
                                        <AccountBalanceIcon fontSize='inherit' color='primary' />
                                    </Box>
                                    <Typography variant='body1'>Your Total Investment</Typography>
                                    <Typography variant='h4'>{projectedData.totalInvestment}</Typography>
                                    <Typography variant='body1'>
                                        By {targetYear}, these could be the projected value of your investment:{' '}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <SavingsIcon fontSize='inherit' color='secondary' />
                                    </Box>
                                    <Typography variant='body2'>Savings Account</Typography>
                                    <Typography variant='h5'>{projectedData.savingsAccount}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <TimelapseIcon fontSize='inherit' color='action' />
                                    </Box>
                                    <Typography variant='body2'>Time Deposit</Typography>
                                    <Typography variant='h5'>{projectedData.timeDeposit}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <AttachMoneyIcon fontSize='inherit' color='info' />
                                    </Box>
                                    <Typography variant='body2'>Low Risk Fund</Typography>
                                    <Typography variant='h5'>{projectedData.lowRiskFund}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <AttachMoneyIcon fontSize='inherit' color='warning' />
                                    </Box>
                                    <Typography variant='body2'>Moderate Risk Fund</Typography>
                                    <Typography variant='h5'>{projectedData.moderateRiskFund}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <AttachMoneyIcon fontSize='inherit' color='error' />
                                    </Box>
                                    <Typography variant='body2'>Aggressive Risk Fund</Typography>
                                    <Typography variant='h5'>{projectedData.aggressiveRiskFund}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}

                    <Typography variant='caption' sx={{ color: grey[400] }}>
                        Based on SunLife Calculations.
                        <br />
                        The computations assume the following:
                        <br />
                        Average return of Sun Life Prosperity Bond Fund (low risk) - 4%
                        <br />
                        Average return of Sun Life Prosperity Balanced Fund (moderate risk) - 8% <br />
                        Average return of Sun Life Prosperity Index Fund (aggressive risk) - 10%{' '}
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
