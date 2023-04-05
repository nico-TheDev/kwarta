import { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import Select from '@mui/material/Select';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import { Icon } from 'components/shared/Icon';

import { formatPrice } from 'utils/format-price'
import { getLanguage } from 'utils/getLanguage'

import { useAccountStore } from 'stores/useAccountStore';
import SavingsTable from './savings-table';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: 250
        }
    }
};

export const SavingsCard = ({ ...rest }) => {
    const [selectedAccount, setSelectedAccount] = useState('');
    const [amount, setAmount] = useState(0);

    const accounts = useAccountStore((state) => state.accounts);

    function computeInterest(productName, interestRate, initialDeposit, maintainingBalance, balanceInterest) {
        const total = balanceInterest * (1 + (interestRate / 100) * 5);
        return { productName, interestRate, initialDeposit, maintainingBalance, balanceInterest, total };
    }

    const bdoRows = [
        computeInterest('BDO Optimum Savings Account Personal', 1.25, 30000, 30000, 30000),
        computeInterest('BDO Optimum Savings Account Corporate', 1.25, 50000, 50000, 50000),
        computeInterest('BDO Prime Savers', 0.25, 2000, 2000, 5000),
        computeInterest('BDO Smart Checking Account Statement- Business', 0.25, 25000, 25000, 25000),
        computeInterest('BDO Smart Checking Account Statement – Personal', 0.25, 15000, 15000, 15000),
        computeInterest('BDO Smart Checking Passbook Personal', 0.25, 25000, 25000, 25000),
        computeInterest('BDO Smart Checking Passbook Business', 0.25, 50000, 50000, 50000),
        computeInterest('BDO Power Teens Club', 0.25, 2000, 2000, 2000),
        computeInterest('BDO Peso Passbook Savings Account', 0.25, 5000, 10000, 10000),
        computeInterest('BDO Peso ATM', 0.25, 2000, 2000, 5000),
        computeInterest('BDO Junior Savers Club', 0.25, 100, 100, 2000),
        computeInterest('BDO Direct Deposit Peso Savings Account', 0.25, 0, 0, 5000)
    ];

    const metrobankRows = [
        computeInterest('Metrobank AccountOne Regular Checking Account', 0.125, 25000, 25000, 25000),
        computeInterest('Metrobank US Pensioner Savings Account', 0.125, 500, 500, 10000),
        computeInterest('Metrobank SSS Pensioner Passbook Savings Account', 0.125, 100, 100, 10000),
        computeInterest('Metrobank Passbook Savings Account', 0.125, 10000, 10000, 10000),
        computeInterest('Metrobank OFW Passbook Savings Account', 0.125, 0, 0, 10000),
        computeInterest('Metrobank SSS Pensioner Debit/ATM Card Savings Account', 0.125, 100, 100, 10000),
        computeInterest('Metrobank Debit/ATM Card Savings Account', 0.125, 2000, 2000, 10000),
        computeInterest('Metrobank OFW Debit/ATM Card Savings Account', 0.125, 0, 0, 10000),
        computeInterest('Metrobank Fun Savers Club', 0.125, 100, 500, 4000)
    ];

    const bpiRows = [
        computeInterest('BPI Regular Savings', 0.0625, 3000, 3000, 5000),
        computeInterest('BPI Pamana Savings', 0.0625, 25000, 25000, 25000),
        computeInterest('BPI Maxi Saver', 0.125, 2000000, 2000000, 2000000),
        computeInterest('BPI Saver Plus', 0.0925, 50000, 50000, 50000),
        computeInterest('BPI Jumpstart', 0.0625, 100, 1000, 2000),
        computeInterest('BPI #SaveUp', 0.0925, 1, 3000, 5000),
        computeInterest('BPI US Dollar Savings', 0.05, 25000, 25000, 25000),
        computeInterest('BPI Pamana Padala', 0.0625, 500, 0, 5000),
        computeInterest('BPI Padala Moneyger', 0.0625, 0, 0, 5000)
    ];

    const landbankRows = [
        computeInterest('ATM Savings Account', 0.1, 500, 500, 2000),
        computeInterest('Easy Savings Plus (ESP)', 0.1, 20000, 20000, 20000),
        computeInterest('PESO EASY (Earning Access and Sure Yield) Check Individual', 0.1, 10000, 10000, 10000),
        computeInterest('PESO EASY (Earning Access and Sure Yield) Check Institutional', 0.1, 20000, 20000, 20000),
        computeInterest('Regular Savings Passbook Account Individual', 0.1, 10000, 10000, 10000),
        computeInterest('Regular Savings Passbook Account Institutional', 0.1, 10000, 10000, 10000),
        computeInterest('US Dollar Savings Account Individual', 0.15, 5000, 25000, 25000),
        computeInterest('US Dollar Savings Account Institutional', 0.15, 50000, 50000, 50000)
    ];

    const securitybankRows = [
        computeInterest('Security Bank eSecure Savings Account', 1.2, 500, 500, 5000),
        computeInterest('Security Bank Premium Build Up Savings Account', 1, 50000, 50000, 50000),
        computeInterest('Security Bank Regular Build Up Savings Account', 0.5, 5000, 5000, 10000),
        computeInterest('Security Bank All Access Account', 0.2, 5000, 25000, 100000),
        computeInterest('Security Bank Money Builder', 0.1, 10000, 10000, 10000),
        computeInterest('Security Bank Easy Savings Account', 0.1, 5000, 15000, 100000)
    ];

    const handleAccountChange = (e) => {
        const currentAccountId = e.target.value;
        const currentAccount = accounts.find((account) => account.id === currentAccountId);

        // console.log(currentAccount);
        setAmount(currentAccount.account_amount);
        setSelectedAccount(e.target.value);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // useEffect(() => {
    //     const current = accounts.find((item) => item.id === selectedAccount);
    //     setAmount(current.account_amount);

    // }, [selectedAccount]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2
                }}
            >
                <Typography sx={{ m: 1 }} variant='h5'>
                    Select Account
                </Typography>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={selectedAccount}
                    label='Select Account'
                    onChange={handleAccountChange}
                    sx={{ display: 'flex', alignItems: 'center', width: 200 }}
                    MenuProps={MenuProps}
                    placeholder='Select Account'
                >
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
            </Box>

            {amount > 2000 ? (
                <Box sx={{ pt: 3 }}>
                    <SavingsTable title='BDO' tableRows={bdoRows} />
                    <SavingsTable title='Metrobank' tableRows={metrobankRows} />
                    <SavingsTable title='BPI' tableRows={bpiRows} />
                    <SavingsTable title='Landbank' tableRows={landbankRows} />
                    <SavingsTable title='Security Bank' tableRows={securitybankRows} />
                </Box>
            ) : (
                <Box sx={{ pt: 3 }}>
                    <Typography sx={{ m: 1, textAlign: 'center' }} variant='h5'>
                        Your selected account have insufficient maintaining balance.
                    </Typography>
                </Box>
            )}
        </>
    );
};

SavingsCard.propTypes = {
    product: PropTypes.object.isRequired
}
