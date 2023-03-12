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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { getLanguage } from 'utils/getLanguage';
import { useTransactionStore } from 'stores/useTransactionStore';
import { Icon } from 'components/shared/Icon';
import Link from 'next/link';
import { grey } from '@mui/material/colors';

export const TransactionHistory = (props) => {
    const transactions = useTransactionStore((state) => state.transactions);

    return (
        <Card {...props}>
            <CardHeader subtitle={`${transactions.length} in total`} title={getLanguage().historyTransactions} />
            <Divider />
            <List>
                {transactions.slice(0, 5).map((transaction, i) => (
                    <Link
                        href={{
                            pathname: '/transactions/[transactionId]',
                            query: { transactionId: transaction.id }
                        }}
                        key={transaction.id}
                    >
                        <ListItem
                            sx={{
                                '&:hover': {
                                    background: grey[300]
                                },
                                cursor: 'pointer',
                                transition: '200ms'
                            }}
                            divider={i < transactions.length - 1}
                        >
                            <ListItemAvatar>
                                <Icon name={transaction.category?.category_icon} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={transaction.category.category_name}
                                secondary={`₱ ${transaction.amount}`}
                            />
                            <IconButton edge='end' size='small'>
                                {transaction.type === 'expense' ? (
                                    <ArrowDownwardIcon color='error' />
                                ) : (
                                    <ArrowUpwardIcon color='success' />
                                )}
                            </IconButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button color='primary' endIcon={<ArrowRightIcon />} size='small' variant='text'>
                    {getLanguage().overview}
                </Button>
            </Box>
        </Card>
    );
};
