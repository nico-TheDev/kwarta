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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { getLanguage } from 'utils/getLanguage';
import { useTransactionStore } from 'stores/useTransactionStore';
import { Icon } from 'components/shared/Icon';

export const TransactionHistory = (props) => {
    const transactions = useTransactionStore((state) => state.transactions);

    return (
        <Card {...props}>
            <CardHeader subtitle={`${transactions.length} in total`} title={getLanguage().historyTransactions} />
            <Divider />
            <List>
                {transactions.slice(0, 5).map((transaction, i) => (
                    <ListItem divider={i < transactions.length - 1} key={transaction.id}>
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
