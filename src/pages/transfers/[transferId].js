import { useState } from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Pagination,
    Select,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useRouter } from 'next/router';
import { Icon } from 'components/shared/Icon';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Stack } from '@mui/system';
import CommentInput from 'components/shared/CommentInput';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import formatDate from 'utils/format-date';
import { useAccountStore } from 'stores/useAccountStore';
import { useTransferStore } from 'stores/useTransferStore';
import { useAuthStore } from 'stores/useAuthStore';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: 250
        }
    }
};

const Page = () => {
    const router = useRouter();
    const { transferId } = router.query;
    // FORM STATES
    const [date, setDate] = useState(formatDate(dayjs(new Date())));
    const [selectedSenderAccount, setSelectedSenderAccount] = useState('');
    const [selectedReceiverAccount, setSelectedReceiverAccount] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [currentTransfer, setCurrentTransfer] = useState('');

    // STORE
    const updateTransfer = useTransferStore((state) => state.updateTransfer);
    const deleteTransfer = useTransferStore((state) => state.deleteTransfer);
    const transfers = useTransferStore((state) => state.transfers);
    const accounts = useAccountStore((state) => state.accounts);
    const user_id = useAuthStore((state) => state.authState?.user?.uid);

    const handleSubmit = async (values) => {

        updateTransfer(
            transferId,
            {
                ...values, amount: Number(values.amount), date, user_id
            },
            selectedFile?.file
        ).then((success) => {
            if (success) {
                router.push('/');
            }
        });

        // RESET STATES
        formik.resetForm();
        setSelectedFile(null);
        setSelectedSenderAccount('');
        setSelectedReceiverAccount('');
        setOpen(false);
    };

    const initialValues = {
        amount: '',
        comments: '',
        targetSenderAccount: '',
        targetReceiverAccount: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    });

    const handleDateChange = (date) => {
        const dateFormat = formatDate(date);
        setDate(dateFormat);
        // console.log(dateFormat);
    };

    const handleSenderAccountChange = (e) => {
        const currentSenderAccountId = e.target.value;
        const currentSenderAccount = accounts.find((account) => account.id === currentSenderAccountId);
        formik.setFieldValue('targetSenderAccount', currentSenderAccount);

        console.log(currentSenderAccount);
        setSelectedSenderAccount(e.target.value);
    };
    const handleReceiverAccountChange = (e) => {
        const currentReceiverAccountId = e.target.value;
        const currentReceiverAccount = accounts.find((account) => account.id === currentReceiverAccountId);
        formik.setFieldValue('targetReceiverAccount', currentReceiverAccount);

        console.log(currentReceiverAccount);
        setSelectedReceiverAccount(e.target.value);
    };

    const handleOpenAlert = () => {
        setOpenAlert(true);
        handleClose();
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const handleDelete = () => {
        deleteTransfer(transferId, currentTransfer?.photoRef || '').then((success) => {
            if (success) {
                router.push('/');
            }
        });
    };

    useEffect(() => {
        // GET THEN VALUES OF THE TRANSFER
        const current = transfers.find((item) => item.id === transferId);

        // SET THE VALUE OF THE FIELDS
        setSelectedSenderAccount(current.targetReceiverAccount.id)
        setSelectedReceiverAccount(current.targetSenderAccount.id)
        setDate(current.date);
        setSelectedFile({
            source: current.photoUrl
        });

        setCurrentTransfer(current);

        formik.setFieldValue('amount', current.amount);
        formik.setFieldValue('comments', current.comments);

    }, [transferId]);

    if (!currentTransfer)
        return (
            <Box
                sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <CircularProgress size={100} />
            </Box>
        );

    return (
        <>
            <Head>
                <title>Transfers Detail | CASH</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={'sm'}>
                    <Box
                        sx={{
                            width: 500,
                            display: 'grid',
                            gap: 2
                        }}
                        component='form'
                    >
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            Transfer Detail
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TextField
                                id='filled-basic'
                                label='Amount'
                                variant='filled'
                                fullWidth
                                name='amount'
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                type='number'
                                disabled={!isEditing}
                            />
                        </Box>

                       {/* SENDER ACCOUNT DROPDOWN */}
                        <Box sx={{ display: 'grid', gap: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>Choose Sender Account</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={selectedSenderAccount}
                                    label='Choose Sender Account'
                                    onChange={handleSenderAccountChange}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    defaultValue=''
                                    MenuProps={MenuProps}
                                    disabled={!isEditing}
                                >
                                    {accounts.map((account) => {
                                        return (
                                            <MenuItem key={account.id} value={account.id}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ListItemIcon>
                                                        <Icon name={account.account_icon} />
                                                    </ListItemIcon>
                                                    <ListItemText>{account.account_name}</ListItemText>
                                                </Box>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        {/* RECEIVER ACCOUNT DROPDOWN */}
                        <Box sx={{ display: 'grid', gap: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>Choose Receiver Account</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={selectedReceiverAccount}
                                    label='Choose Receiver Account'
                                    onChange={handleReceiverAccountChange}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    defaultValue=''
                                    MenuProps={MenuProps}
                                    disabled={!isEditing}
                                >
                                    {accounts.map((account) => {
                                        return (
                                            <MenuItem key={account.id} value={account.id}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ListItemIcon>
                                                        <Icon name={account.account_icon} />
                                                    </ListItemIcon>
                                                    <ListItemText>{account.account_name}</ListItemText>
                                                </Box>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        {/* DATE PICKER */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    name='date'
                                    label='Date'
                                    inputFormat='MM/DD/YYYY'
                                    value={date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    disabled={!isEditing}
                                />
                            </Stack>
                        </LocalizationProvider>
                        {/* COMMENT BOX */}
                        <CommentInput
                            formik={formik}
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            isEditing={isEditing}
                        />
                        {/* DEFAULT MODE */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {!isEditing ? (
                                <>
                                    <Button
                                        variant='contained'
                                        sx={{ flex: 1 }}
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        EDIT
                                    </Button>
                                    <Button variant='outlined' sx={{ flex: 1 }} onClick={handleDelete}>
                                        DELETE
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant='contained' sx={{ flex: 1 }} onClick={formik.handleSubmit}>
                                        SAVE
                                    </Button>
                                    <Button variant='outlined' sx={{ flex: 1 }} onClick={() => setIsEditing(false)}>
                                        CANCEL
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
