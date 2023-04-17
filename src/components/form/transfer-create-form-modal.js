import { useState, forwardRef, useEffect } from 'react';
import { Box, Switch, Snackbar, Alert as MuiAlert, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES, modalStyle } from 'constants/constant';
import { useTransactionStore } from 'stores/useTransactionStore';
import CommentInput from 'components/shared/CommentInput';
import formatDate from 'utils/format-date';
import { useAuthStore } from 'stores/useAuthStore';
import { useAccountStore } from 'stores/useAccountStore';
import { useTransferStore } from 'stores/useTransferStore';

import { getLanguage } from 'utils/getLanguage'

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: 250
        }
    }
};

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function TransferFormModal({ open, setOpen }) {
    // COMPONENT STATE
    const [openAlert, setOpenAlert] = React.useState(false);

    // FORM STATES
    const [date, setDate] = useState(formatDate(dayjs(new Date())));
    const [selectedSenderAccount, setSelectedSenderAccount] = useState('');
    const [selectedReceiverAccount, setSelectedReceiverAccount] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    // STORE
    const createTransfer = useTransferStore((state) => state.createTransfer);
    const accounts = useAccountStore((state) => state.accounts);
    const user_id = useAuthStore((state) => state.authState?.user?.uid);

    const initialValues = {
        amount: '',
        comments: '',
        targetSenderAccount: '',
        targetReceiverAccount: ''
    };

    const handleSubmit = async (values) => {
        console.log(values);
        setOpen(false);
        await createTransfer({ ...values, amount: Number(values.amount), date, user_id }, selectedFile?.file);
        // RESET STATES
        formik.resetForm();
        setSelectedFile(null);
        setSelectedSenderAccount('');
        setSelectedReceiverAccount('');
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

    const handleClose = () => setOpen(false);

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

    return (
        <>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity='warning' sx={{ width: '100%' }}>
                    You're overspending, you might want to rethink your expense.
                </Alert>
            </Snackbar>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={modalStyle} component='form'>
                    <IconButton
                        color='primary'
                        sx={{ position: 'absolute', top: 5, right: 5 }}
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>

                        {getLanguage().createTransfer}

                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            id='filled-basic'
                            label={getLanguage().transferAmount}
                            variant='filled'
                            fullWidth
                            name='amount'
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            type='number'
                        />
                    </Box>

                    {/* SENDER ACCOUNT DROPDOWN */}
                    <Box sx={{ display: 'grid', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>{getLanguage().chooseSenderAccount}</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={selectedSenderAccount}
                                label={getLanguage().chooseSenderAccount}
                                onChange={handleSenderAccountChange}
                                sx={{ display: 'flex', alignItems: 'center' }}
                                defaultValue=''
                                MenuProps={MenuProps}
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
                            <InputLabel id='demo-simple-select-label'>{getLanguage().chooseReceiverAccount}</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={selectedReceiverAccount}
                                label={getLanguage().chooseReceiverAccount}
                                onChange={handleReceiverAccountChange}
                                sx={{ display: 'flex', alignItems: 'center' }}
                                defaultValue=''
                                MenuProps={MenuProps}
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
                                label={getLanguage().date}
                                inputFormat='MM/DD/YYYY'
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    {/* COMMENT BOX */}
                    <CommentInput formik={formik} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                    <Button variant='contained' fullWidth onClick={formik.handleSubmit}>
                    {getLanguage().submit}
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
