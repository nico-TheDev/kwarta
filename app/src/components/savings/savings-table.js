import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const columns = [
    { id: 'productName', label: 'Product Name', minWidth: 170 },
    { id: 'interestRate', label: 'Interest Rate', minWidth: 100 },
    {
        id: 'initialDeposit',
        label: 'Initial Deposit (PHP)',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'maintainingBalance',
        label: 'Maintaining Balance (PHP)',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'balanceInterest',
        label: 'Balance to Earn Interest (PHP)',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'total',
        label: 'Total in 5 Years (PHP)',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US')
    }
];

export default function SavingsTable({ title, tableRows, page = 0, rowsPerPage = 10 }) {
    return (
        <Box sx={{ pt: 3 }}>
            <Typography sx={{ m: 1 }} variant='h5'>
                {title}
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
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
            {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={bdo_rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </Box>
    );
}
