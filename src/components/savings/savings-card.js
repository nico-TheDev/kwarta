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

    const accounts = useAccountStore((state) => state.accounts);

    const columns = [
        { id: 'productName', label: 'Product Name', minWidth: 170 },
        { id: 'interestRate', label: 'Interest Rate', minWidth: 100 },
        { id: 'initialDeposit', label: 'Initial Deposit (PHP)', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
        { id: 'maintainingBalance', label: 'Maintaining Balance (PHP)', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
        { id: 'balanceInterest', label: 'Balance to Earn Interest (PHP)', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
        { id: 'total', label: 'Total in 5 Years (PHP)', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
    ];

    function computeInterest(productName, interestRate, initialDeposit, maintainingBalance, balanceInterest) {
        const total = balanceInterest * (1 + ((interestRate / 100) * 5));
        return { productName, interestRate, initialDeposit, maintainingBalance, balanceInterest, total };
    }

    const rows = [
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
        computeInterest('BDO Direct Deposit Peso Savings Account', 0.25, 0, 0, 5000),
        
    ];

    const handleAccountChange = (e) => {
        const currentAccountId = e.target.value;
        const currentAccount = accounts.find((account) => account.id === currentAccountId);
        formik.setFieldValue('targetAccount', currentAccount);

        // console.log(currentAccount);
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

    return(
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2
                }}
            >
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={selectedAccount}
                    label='Choose Account'
                    onChange={handleAccountChange}
                    sx={{ display: 'flex', alignItems: 'center' }}
                    defaultValue=''
                    MenuProps={MenuProps}
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
            <Box sx={{ pt: 3 }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    )
}

SavingsCard.propTypes = {
    product: PropTypes.object.isRequired
}
