import React from 'react';
import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Icon } from 'components/shared/Icon';
import Link from 'next/link';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
export default function TransactionCard({ transaction }) {
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
                    {transaction.type === 'expense' ? (
                        <ArrowDownwardIcon color='error' />
                    ) : (
                        <ArrowUpwardIcon color='success' />
                    )}
                </IconButton>
            </ListItem>
        </Link>
    );
}
