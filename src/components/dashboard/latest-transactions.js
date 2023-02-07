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

const products = [
  {
    id: uuid(),
    name: 'Shoppee',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: 1010
  },
  {
    id: uuid(),
    name: 'Lazada',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: 1200
  },
  {
    id: uuid(),
    name: 'Tissue Papers',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: 200
  },
  {
    id: uuid(),
    name: 'Candy Chocolate',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: 200
  },
  {
    id: uuid(),
    name: 'Development Tools',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: 1000
  }
];

export const LatestTransactions = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="Latest Transactions"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem
          divider={i < products.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`₱ ${product.updatedAt}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
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
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
