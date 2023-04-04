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

export const BondsCard = ({ ...rest }) => {
    const [selectedAccount, setSelectedAccount] = useState('');
    const [amount, setAmount] = useState(0);

    const accounts = useAccountStore((state) => state.accounts);

    function computeInterest(productName, interestRate, taxRate, time, balanceInterest) {
        const total = balanceInterest * (interestRate / 100) * (1 - (taxRate / 100)) * time;
        return { productName, interestRate, taxRate, time, balanceInterest, total };
    }

    const columns = [
        { id: 'productName', label: 'Product Name', minWidth: 170 },
        { id: 'interestRate', label: 'Interest Rate', minWidth: 100 },
        { id: 'taxRate', label: 'Tax Rate', minWidth: 100 },
        { id: 'time', label: 'TIme', minWidth: 100 },
        { id: 'balanceInterest', label: 'Balance to Earn Interest (PHP)', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
        { id: 'total', label: 'Return in 5.5 Years (PHP)', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
    ];

    const rtb_rows = [
        computeInterest('Retail Treasury Bonds', 6.125, 20, 5.5, 5000),
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

    console.log(selectedAccount)
    console.log(amount);

    return(
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
            
            {amount > 5000 ?
            <Box sx={{ pt: 3 }}>
                <Box sx={{ pt: 3 }}>
                    <Typography sx={{ m: 1 }} variant='h5'>
                        Retail Treasury Bonds (Republic of the Philippines)
                    </Typography>
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
                            {rtb_rows
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
                        count={rtb_rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Box>
            :
            <Box sx={{ pt: 3 }}>
                <Typography sx={{ m: 1, textAlign: 'center' }} variant='h5'>
                    Your selected account have insufficient maintaining balance.
                </Typography>
            </Box>
            }
        </>
    )
}

BondsCard.propTypes = {
    product: PropTypes.object.isRequired
}
