import { formatDistanceToNow, subHours } from 'date-fns'
import { v4 as uuid } from 'uuid'
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
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BoltIcon from '@mui/icons-material/Bolt'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const products = [
    {
        id: uuid(),
        name: 'Meralco Bill',
        imageUrl: '/static/images/products/product_1.png',
        updatedAt: 1010,
        type: 'expense'
    },
    {
        id: uuid(),
        name: 'Lazada',
        imageUrl: '/static/images/products/product_2.png',
        updatedAt: 1200,
        type: 'expense'
    },
    {
        id: uuid(),
        name: 'Tissue Papers',
        imageUrl: '/static/images/products/product_3.png',
        updatedAt: 200,
        type: 'income'
    },
    {
        id: uuid(),
        name: 'Dinner',
        imageUrl: '/static/images/products/product_4.png',
        updatedAt: 200,
        type: 'income'
    },
    {
        id: uuid(),
        name: 'Development Tools',
        imageUrl: '/static/images/products/product_5.png',
        updatedAt: 1000,
        type: 'expense'
    }
]

export const TransactionHistory = (props) => (
    <Card {...props}>
        <CardHeader subtitle={`${products.length} in total`} title='Transaction History' />
        <Divider />
        <List>
            {products.map((product, i) => (
                <ListItem divider={i < products.length - 1} key={product.id}>
                    <ListItemAvatar>
                        <BoltIcon fontSize='large' color='secondary' />
                    </ListItemAvatar>
                    <ListItemText primary={product.name} secondary={`₱ ${product.updatedAt}`} />
                    <IconButton edge='end' size='small'>
                        {product.type === 'expense' ? (
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
                View all
            </Button>
        </Box>
    </Card>
)
