import React from 'react';
import { IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Icon } from 'components/shared/Icon';
import Link from 'next/link';
import { deepPurple, green, grey, teal } from '@mui/material/colors';
import SavingsIcon from '@mui/icons-material/Savings';
import InvestmentIcon from '@mui/icons-material/StackedLineChart';

export default function TransactionCard({ transaction }) {
    const IconType = () => {
        if (transaction.type === 'expense') {
            return <ArrowDownwardIcon color='error' />;
        } else if (transaction.type === 'income') {
            return (
                <Typography color={green[500]}>
                    <ArrowUpwardIcon color='inherit' />;
                </Typography>
            );
        } else if (transaction.type === 'savings') {
            return (
                <Typography color={deepPurple[500]}>
                    <SavingsIcon color='inherit' />
                </Typography>
            );
        } else if (transaction.type === 'investments') {
            return (
                <Typography color={teal[500]}>
                    <InvestmentIcon color='inherit' />;
                </Typography>
            );
        }
    };

    return (
        <Link
            href={{
                pathname: '/transactions/[transactionId]',
                query: { transactionId: transaction.id }
            }}
        >
            <ListItem
                sx={{
                    '&:hover': {
                        background: grey[300]
                    },
                    cursor: 'pointer',
                    transition: '200ms'
                }}
            >
                <ListItemAvatar>
                    <Icon name={transaction.category?.category_icon} />
                </ListItemAvatar>
                <ListItemText primary={transaction.category.category_name} secondary={`₱ ${transaction.amount}`} />
                {/* <ListItemText primary={transaction.targetAccount.account_name} /> */}
                <IconButton edge='end' size='small'>
                    <IconType />
                </IconButton>
            </ListItem>
        </Link>
    );
}
