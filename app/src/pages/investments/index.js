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
    CircularProgress,
    Tooltip,
    Modal
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getLanguage } from 'utils/getLanguage';
import { DashboardLayout } from '../../components/dashboard-layout';
import { toast } from 'react-hot-toast';
import { useAccountStore } from 'stores/useAccountStore';
import { formatPrice } from 'utils/format-price';
import { grey } from '@mui/material/colors';
import { useLanguageStore } from 'stores/useLanguageStore';
import { useAuthStore } from 'stores/useAuthStore';
import DashboardTour from 'components/tours/DashboardTour';
import calculateTable from 'utils/create-table';
import InvestmentTable from 'components/investment-table';
import Link from 'next/link';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: 250
        }
    }
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        md: '80%',
        xs: '100%'
    },
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
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

function futureValue(rate = 0, nper = 0, pmt = 0, pv = 0, type = 0) {
    var result;
    if (rate != 0.0) {
        result = -pv * Math.pow(1 + rate, nper) - (pmt * (1 + rate * type) * (Math.pow(1 + rate, nper) - 1)) / rate;
    } else {
        result = -pv - pmt * nper;
    }
    return result;
}

const Page = () => {
    const [initialDeposit, setInitialDeposit] = useState('');
    const [period, setPeriod] = useState('');
    const [subsequentDeposit, setSubsequentDeposit] = useState('');
    const [targetYear, setTargetYear] = useState('');
    const [projectedData, setProjectedData] = useState('');
    const [suggestionData, setSuggestionData] = useState('');
    const [tableData, setTableData] = useState('');
    const [currentTableData, setCurrentTableData] = useState('');
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const accounts = useAccountStore((state) => state.accounts);

    const [openModal, setOpenModal] = useState(false);

    const [accountAmounts, setAccountAmounts] = useState(accounts.map((item) => item.account_amount));

    const getTourProgress = useAuthStore((state) => state.getTourProgress);
    const manageTourProgress = useAuthStore((state) => state.manageTourProgress);
    const [showTour, setShowTour] = useState(false);

    const tourSteps = [
        {
            target: '.investment_step_one',
            title: 'Investments',
            content:
                'An investment is an asset or item acquired with the goal of generating income or appreciation. Appreciation refers to an increase in the value of an asset over time. When an individual purchases a good as an investment, the intent is not to consume the good but rather to use it in the future to create wealth. ',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.investment_step_two',
            title: 'Recommendations',
            content: 'Displays the recommendations for investments depending on your financial accounts.',
            placement: 'bottom'
        },
        {
            target: '.investment_step_three',
            title: 'Investment Calculator',
            content: `Displays the possible investment result based on the variables you're going to input`,
            placement: 'bottom'
        }
    ];

    useEffect(() => {
        const currentTour = getTourProgress('investment');
        setShowTour(currentTour.isDone);
    }, []);

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
            setTableData({
                savingsAccount: calculateTable(initialDeposit, subsequentDeposit, year, 0.3, '₱', '', Number(period)),
                timeDeposit: calculateTable(initialDeposit, subsequentDeposit, year, 0.7, '₱', '', Number(period)),
                lowRiskFund: calculateTable(initialDeposit, subsequentDeposit, year, 4, '₱', '', Number(period)),
                medRiskFund: calculateTable(initialDeposit, subsequentDeposit, year, 8, '₱', '', Number(period)),
                highRiskFund: calculateTable(initialDeposit, subsequentDeposit, year, 10, '₱', '', Number(period))
            });
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

    // console.log(Math.max(...accountAmounts));

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
                    <Tooltip title={getLanguage(currentLanguage).tooltipLowRisk}>
                        <Typography variant='body1'>Low Risk Fund</Typography>
                    </Tooltip>
                    <Typography variant='h6'>{suggestionData.lowRiskFund}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ fontSize: 50 }}>
                        <AttachMoneyIcon fontSize='inherit' color='warning' />
                    </Box>
                    <Tooltip title={getLanguage(currentLanguage).tooltipMedRisk}>
                        <Typography variant='body1'>Moderate Risk Fund</Typography>
                    </Tooltip>
                    <Typography variant='h6'>{suggestionData.moderateRiskFund}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ fontSize: 50 }}>
                        <AttachMoneyIcon fontSize='inherit' color='error' />
                    </Box>
                    <Tooltip title={getLanguage(currentLanguage).tooltipHighRisk}>
                        <Typography variant='body1'>Aggressive Risk Fund</Typography>
                    </Tooltip>
                    <Typography variant='h6'>{suggestionData.aggressiveRiskFund}</Typography>
                </Paper>
            </Grid>
            <Box sx={{ pt: 3 }}>
                <Typography sx={{ m: 1, textAlign: 'center' }} color='primary.main' variant='body1'>
                    DISCLAIMER: These are just indicative numbers. Performance of the fund is not assured and this is
                    subject to fluctuating market conditions.
                </Typography>
            </Box>
        </>
    );

    const TableModal = () => (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Paper sx={modalStyle}>
                <Typography variant='h4' mb={6}>
                    {currentTableData.name}
                </Typography>
                <InvestmentTable dataset={currentTableData.data} />
            </Paper>
        </Modal>
    );

    return (
        <>
            {!showTour && (
                <DashboardTour
                    setShowTour={setShowTour}
                    tourSteps={tourSteps}
                    finishTour={() => manageTourProgress('investment')}
                />
            )}
            <Head>
                <title>Investments | CASH</title>
            </Head>
            <TableModal />
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
                        <Tooltip title={getLanguage(currentLanguage).tooltipInvestment}>
                            <Typography sx={{ m: 1, mb: 4 }} variant='h4' className='investment_step_one'>
                                {getLanguage(currentLanguage).investment}
                            </Typography>
                        </Tooltip>
                    </Box>

                    <Typography variant='h6' mb={4}>
                        See how your money can grow over time.
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        mb={8}
                        textAlign='center'
                        justifyContent='center'
                        className='investment_step_two'
                    >
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
                    <Grid container spacing={2} justifyContent='center' mb={6} className='investment_step_three'>
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
                                    <Typography variant='h5' mb={2}>
                                        {projectedData.savingsAccount}
                                    </Typography>
                                    <Button
                                        variant='outlined'
                                        onClick={() => {
                                            setCurrentTableData({
                                                name: 'Savings Account',
                                                data: tableData.savingsAccount
                                            });
                                            setOpenModal(true);
                                        }}
                                    >
                                        See Details
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <TimelapseIcon fontSize='inherit' color='action' />
                                    </Box>
                                    <Typography variant='body2'>Time Deposit</Typography>
                                    <Typography variant='h5' mb={2}>
                                        {projectedData.timeDeposit}
                                    </Typography>
                                    <Button
                                        variant='outlined'
                                        onClick={() => {
                                            setCurrentTableData({
                                                name: 'Time Deposit',
                                                data: tableData.timeDeposit
                                            });
                                            setOpenModal(true);
                                        }}
                                    >
                                        See Details
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <AttachMoneyIcon fontSize='inherit' color='info' />
                                    </Box>
                                    <Typography variant='body2'>Low Risk Fund</Typography>
                                    <Typography variant='h5' mb={2}>
                                        {projectedData.lowRiskFund}
                                    </Typography>
                                    <Button
                                        variant='outlined'
                                        onClick={() => {
                                            setCurrentTableData({
                                                name: 'Low Risk Fund',
                                                data: tableData.lowRiskFund
                                            });
                                            setOpenModal(true);
                                        }}
                                    >
                                        See Details
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <AttachMoneyIcon fontSize='inherit' color='warning' />
                                    </Box>
                                    <Typography variant='body2'>Moderate Risk Fund</Typography>
                                    <Typography variant='h5' mb={2}>
                                        {projectedData.moderateRiskFund}
                                    </Typography>
                                    <Button
                                        variant='outlined'
                                        onClick={() => {
                                            setCurrentTableData({
                                                name: 'Moderate Risk Fund',
                                                data: tableData.medRiskFund
                                            });
                                            setOpenModal(true);
                                        }}
                                    >
                                        See Details
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ fontSize: 50 }}>
                                        <AttachMoneyIcon fontSize='inherit' color='error' />
                                    </Box>
                                    <Typography variant='body2'>Aggressive Risk Fund</Typography>
                                    <Typography variant='h5' mb={2}>
                                        {projectedData.aggressiveRiskFund}
                                    </Typography>
                                    <Button
                                        variant='outlined'
                                        onClick={() => {
                                            setCurrentTableData({
                                                name: 'Aggressive Risk Fund',
                                                data: tableData.highRiskFund
                                            });
                                            setOpenModal(true);
                                        }}
                                    >
                                        See Details
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}

                    <Typography variant='body1' m={4} color='black'>
                        Based on SunLife Calculations.
                        <br />
                        The computations assume the following:
                        <br />
                        Average return of Sun Life Prosperity Bond Fund (low risk) - 4%
                        <br />
                        Average return of Sun Life Prosperity Balanced Fund (moderate risk) - 8% <br />
                        Average return of Sun Life Prosperity Index Fund (aggressive risk) - 10%
                        <br />
                        Source:{' '}
                        <Typography
                            component='a'
                            target='_blank'
                            href='https://online.sunlife.com.ph/cdt/eCalcAge/investmentCalculator'
                        >
                            Sunlife Investment Calculator
                        </Typography>{' '}
                        and{' '}
                        <Typography
                            component='a'
                            target='_blank'
                            href='https://ph.thesimplesum.com/investment-calculator/'
                        >
                            Simple Sum Investment Calculator
                        </Typography>
                    </Typography>

                    <Typography variant='h6' mb={2} color='primary'>
                        DISCLAIMERS
                    </Typography>

                    <Typography variant='body1' mb={4} color='primary'>
                        This calculator is designed to be an informational and educational tool only, and when used
                        alone, does not constitute financial advice. The CASH Team is not responsible for the
                        consequences of any decisions or actions taken in reliance upon or as a result of the
                        information provided by these tools. The CASH Team is not responsible for any human or
                        mechanical errors or omissions that may occur too. Do consult a financial services professional
                        before making any investments.
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
