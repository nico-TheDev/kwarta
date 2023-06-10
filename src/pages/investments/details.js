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
    Tooltip
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
    return (
        <>
            <Head>
                <title>Investments Fund | CASH</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                DEtails
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
