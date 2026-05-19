import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';

export default function InvestmentTable({ dataset }) {
    return (
        <TableContainer component={Paper} sx={{ overflowX: 'scroll' }}>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align='left'>Beginning Bank Balance</TableCell>
                        <TableCell align='left'>Annual Contribution</TableCell>
                        <TableCell align='left'>Total Annual Contributions</TableCell>
                        <TableCell align='left'>Interest Earned</TableCell>
                        <TableCell align='left'>Total Interest Earned</TableCell>
                        <TableCell align='left'>End Bank Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataset.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': { background: grey[400] },
                                cursor: 'pointer'
                            }}
                        >
                            <TableCell component='th' scope='row'>
                                {row.year}
                            </TableCell>
                            <TableCell align='left'>₱{row.begin_balance}</TableCell>
                            <TableCell align='left'>₱{row.yearly_contribution}</TableCell>
                            <TableCell align='left'>₱{row.total_contributions}</TableCell>
                            <TableCell align='left'>₱{row.interest_earned}</TableCell>
                            <TableCell align='left'>₱{row.total_interest_earned}</TableCell>
                            <TableCell align='left'>₱{row.end_balance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
