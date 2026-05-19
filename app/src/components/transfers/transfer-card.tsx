import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@mui/material';
import TransferIcon from '@mui/icons-material/ImportExport';
import SendIcon from '@mui/icons-material/Reply';
import ReceiveIcon from '@mui/icons-material/SaveAlt';
import Link from 'next/link';
import { grey } from '@mui/material/colors';

import { formatPrice } from 'utils/format-price';

const styles = {
    panel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    card: {
        p: 2,
        position: 'relative',
        cursor: 'pointer',
        transition: '300ms',
        '&:hover': {
            background: grey[200]
        }
    },
    iconHolder: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '15%',
        alignItems: 'center'
    },
    price: {
        ml: 'auto'
    },
    edit: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    holder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        ml: 4
    }
};

export const TransferCard = ({ transfer }) => {
    return (
        <Link
            href={{
                pathname: '/transfers/[transferId]',
                query: { transferId: transfer.id }
            }}
            key={transfer.id}
        >
            <Paper sx={styles.card}>
                <Box sx={styles.panel}>
                    <TransferIcon sx={{ fontSize: 50 }} color='success' />
                    <Box sx={styles.holder}>
                        <Box sx={styles.iconHolder} mb={2}>
                            <SendIcon color='error' fontSize='medium' />
                            <Typography align='center' variant='h6' ml={1}>
                                {transfer.targetSenderAccount.account_name}
                            </Typography>
                        </Box>
                        <Box sx={styles.iconHolder}>
                            <ReceiveIcon color='success' fontSize='medium' />
                            <Typography align='center' variant='h6' ml={1}>
                                {transfer.targetReceiverAccount.account_name}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography sx={styles.price} align='center' color='textPrimary' gutterBottom variant='h6'>
                        {formatPrice(transfer.amount)}
                    </Typography>
                </Box>
            </Paper>
        </Link>
    );
};

TransferCard.propTypes = {
    transfer: PropTypes.object.isRequired
};
