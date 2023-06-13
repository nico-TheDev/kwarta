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
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import toast from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import InfoIcon from '@mui/icons-material/Info';
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES, modalStyle } from 'constants/constant';
import { useTransactionStore } from 'stores/useTransactionStore';
import CommentInput from 'components/shared/CommentInput';
import formatDate from 'utils/format-date';
import { useAuthStore } from 'stores/useAuthStore';
import { useAccountStore } from 'stores/useAccountStore';
import { useCategoryStore } from 'stores/useCategoryStore';
import useSortCategories from 'hooks/useSortCategories';
import { getLanguage } from 'utils/getLanguage';
import { useLanguageStore } from 'stores/useLanguageStore';
import DropdownType from 'components/shared/DropdownType';

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

export default function TransactionFormModal({ open, setOpen }) {
    // COMPONENT STATE
    const [openAlert, setOpenAlert] = React.useState(false);

    // FORM STATES
    const [date, setDate] = useState(formatDate(dayjs(new Date())));
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    // STORE
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const createTransaction = useTransactionStore((state) => state.createTransaction);
    const accounts = useAccountStore((state) => state.accounts);
    const user_id = useAuthStore((state) => state.authState?.user?.uid);
    const userSurvey = useAuthStore((state) => state.authState.userSurvey);
    const categories = useCategoryStore((state) => state.categories);
    const [transactionType, setTransactionType, handleTransactionType, categoryData] =
        useSortCategories(setSelectedCategory);

    const initialValues = {
        amount: '',
        comments: '',
        targetAccount: '',
        category: ''
    };

    const handleSubmit = async (values) => {
        // console.log(values);
        setOpen(false);

        if (transactionType === 'expense') {
            // WARNING FOR OVERSPENDING
            if (userSurvey.financeRule.value === '1') {
                if (Number(values.amount) >= values.targetAccount.account_amount * 0.2) {
                    toast(`You're spending a lot for your account. You must save at least 20% for savings`, {
                        style: {
                            width: 'max-content'
                        },
                        icon: (
                            <Box sx={{ color: '#ffa726' }}>
                                <InfoIcon color='inherit' />
                            </Box>
                        ),
                        duration: 5000
                    });
                }
            } else if (userSurvey.financeRule.value === '2') {
                if (Number(values.amount) >= values.targetAccount.account_amount * 0.3) {
                    toast(`You're spending a lot for your account. You must save at least 30% for savings.`, {
                        style: {
                            width: 'max-content'
                        },
                        icon: (
                            <Box sx={{ color: '#ffa726' }}>
                                <InfoIcon color='inherit' />
                            </Box>
                        ),
                        duration: 5000
                    });
                }
            } else if (userSurvey.financeRule.value === '3') {
                if (Number(values.amount) >= values.targetAccount.account_amount * 0.1) {
                    toast(`You're spending a lot for your account. You must save at least 10% for savings`, {
                        style: {
                            width: 'max-content'
                        },
                        icon: (
                            <Box sx={{ color: '#ffa726' }}>
                                <InfoIcon color='inherit' />
                            </Box>
                        ),
                        duration: 5000
                    });
                }
            }
        }

        await createTransaction(
            { ...values, amount: Number(values.amount), type: transactionType, date, user_id },
            selectedFile?.file
        );
        // RESET STATES
        formik.resetForm();
        setSelectedFile(null);
        setSelectedCategory('');
        setSelectedAccount('');
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

    const handleCategoryChange = (e) => {
        const currentCategoryId = e.target.value;
        const currentCategory = categoryData.find((category) => category.id === currentCategoryId);

        formik.setFieldValue('category', currentCategory);

        // console.log(currentCategory);
        setSelectedCategory(e.target.value);
    };
    const handleAccountChange = (e) => {
        const currentAccountId = e.target.value;
        const currentAccount = accounts.find((account) => account.id === currentAccountId);
        formik.setFieldValue('targetAccount', currentAccount);

        // console.log(currentAccount);
        setSelectedAccount(e.target.value);
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
                    {getLanguage(currentLanguage).overspendingAlert}
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
                        sx={{ position: 'absolute', top: 20, right: 20 }}
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        {getLanguage(currentLanguage).createTransaction}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            id='filled-basic'
                            label={getLanguage(currentLanguage).transactionAmount}
                            variant='filled'
                            fullWidth
                            name='amount'
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <DropdownType handleChange={handleTransactionType} transactionType={transactionType} />
                    </Box>

                    {/* ACCOUNT DROPDOWN */}
                    <Box sx={{ display: 'grid', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>
                                {getLanguage(currentLanguage).chooseAccount}
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={selectedAccount}
                                label={getLanguage(currentLanguage).chooseAccount}
                                onChange={handleAccountChange}
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
                        {/* CATEGORY DROPDOWN */}
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>
                                {getLanguage(currentLanguage).chooseCategory}
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={selectedCategory.id}
                                label={getLanguage(currentLanguage).chooseCategory}
                                defaultValue=''
                                onChange={handleCategoryChange}
                                MenuProps={MenuProps}
                            >
                                {categoryData?.map((tag) => {
                                    return (
                                        <MenuItem key={tag.id} value={tag.id}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <ListItemIcon>
                                                    <Icon name={tag.category_icon} />
                                                </ListItemIcon>
                                                <ListItemText>{tag.category_name}</ListItemText>
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
                                label={getLanguage(currentLanguage).date}
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
                        {getLanguage(currentLanguage).submit}
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
