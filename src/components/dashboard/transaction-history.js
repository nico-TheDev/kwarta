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
import { useRouter } from 'next/router';
import TransactionCard from 'components/shared/TransactionCard';
import { useLanguageStore } from 'stores/useLanguageStore';

export const TransactionHistory = (props) => {
    const transactions = useTransactionStore((state) => state.transactions);
    const router = useRouter();
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

    const handleClick = () => {
        router.push('/transactions');
    };

    return (
        <Card {...props}>
            <CardHeader
                subtitle={`${transactions.length} in total`}
                title={getLanguage(currentLanguage).historyTransactions}
            />
            <Divider />
            <List>
                {transactions.slice(0, 5).map((transaction) => (
                    <TransactionCard transaction={transaction} key={transaction.id} />
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
                <Button color='primary' endIcon={<ArrowRightIcon />} size='small' variant='text' onClick={handleClick}>
                    {getLanguage(currentLanguage).overview}
                </Button>
            </Box>
        </Card>
    );
};
