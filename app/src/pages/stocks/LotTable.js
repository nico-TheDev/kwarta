import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const minimumLotTable = [
    {
        marketPrice: '0.0001 to 0.0099',
        lotSize: 1000000,
        marketPriceMin: 0.0001,
        marketPriceMax: 0.0099
    },
    {
        marketPrice: '0.0500 to 0.2490',
        lotSize: 10000,
        marketPriceMin: 0.05,
        marketPriceMax: 0.249
    },
    {
        marketPrice: '0.2500 to 0.4950',
        lotSize: 10000,
        marketPriceMin: 0.25,
        marketPriceMax: 0.495
    },
    {
        marketPrice: '0.5000 to 4.9900',
        lotSize: 1000,
        marketPriceMin: 0.5,
        marketPriceMax: 4.99
    },
    {
        marketPrice: '5.000 to 9.9900',
        lotSize: 100,
        marketPriceMin: 5,
        marketPriceMax: 9.99
    },
    {
        marketPrice: '10.0000 to 19.9800',
        lotSize: 100,
        marketPriceMin: 10,
        marketPriceMax: 19.98
    },
    {
        marketPrice: '20.0000 to 49.9500',
        lotSize: 100,
        marketPriceMin: 20,
        marketPriceMax: 49.95
    },
    {
        marketPrice: '50.0000 to 99.9500',
        lotSize: 10,
        marketPriceMin: 50.0,
        marketPriceMax: 99.95
    },
    {
        marketPrice: '100.0000 to 199.9000',
        lotSize: 10,
        marketPriceMin: 100,
        marketPriceMax: 199.9
    },
    {
        marketPrice: '200.0000 to 499.8000',
        lotSize: 10,
        marketPriceMin: 200,
        marketPriceMax: 499.8
    },
    {
        marketPrice: '500.0000 to 999.5000',
        lotSize: 10,
        marketPriceMin: 500,
        marketPriceMax: 999.5
    },
    {
        marketPrice: '1000.000 to 1999.000',
        lotSize: 5,
        marketPriceMin: 1000,
        marketPriceMax: 1999
    },
    {
        marketPrice: '2000.000 to 4998.000',
        lotSize: 5,
        marketPriceMin: 2000,
        marketPriceMax: 4998
    },
    {
        marketPrice: '5000.00 and UP',
        lotSize: 5,
        marketPriceMin: 5000,
        marketPriceMax: 9999999999999
    }
];
export default function LotTable() {
    return (
        <Table sx={{ width: 400, mx: 'auto' }} size='small'>
            <TableHead sx={{ width: 300 }}>
                <TableRow>
                    <TableCell>Market Price</TableCell>
                    <TableCell>Lot Size</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {minimumLotTable.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row.marketPrice}</TableCell>
                        <TableCell>{row.lotSize}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
