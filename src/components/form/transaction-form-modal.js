import { useState, forwardRef, useEffect } from 'react';
import { Box, Switch, Snackbar, Alert as MuiAlert } from '@mui/material';
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
import toast from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';
import { useTransactionStore } from 'stores/useTransactionStore';
import CommentInput from 'components/shared/CommentInput';
import formatDate from 'utils/format-date';
import { useAuthStore } from 'stores/useAuthStore';
import { useAccountStore } from 'stores/useAccountStore';
import { useCategoryStore } from 'stores/useCategoryStore';
import useSortCategories from 'hooks/useSortCategories';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: '80vh',
    bgcolor: 'background.paper',
    overflowY: 'scroll',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'grid',
    gap: 4
};

const iconList = [
    { id: 1, name: 'Vacation', icon: ICON_NAMES.CATEGORY_ICONS.AIRLINE_FARE, type: 'expense' },
    { id: 2, name: 'Biking', icon: ICON_NAMES.CATEGORY_ICONS.BICYCLE, type: 'expense' },
    { id: 3, name: 'Transportation', icon: ICON_NAMES.CATEGORY_ICONS.BUSFARE, type: 'expense' },
    { id: 4, name: 'Business', icon: ICON_NAMES.CATEGORY_ICONS.BUSINESS, type: 'expense' },
    { id: 5, name: 'FullTime Job', icon: ICON_NAMES.CATEGORY_ICONS.FULLTIME_JOB, type: 'income' },
    { id: 6, name: 'Part Time Job', icon: ICON_NAMES.CATEGORY_ICONS.GIFT, type: 'income' },
    { id: 7, name: 'Freelance', icon: ICON_NAMES.CATEGORY_ICONS.FREELANCE_JOB, type: 'income' },
    { id: 8, name: 'Gigs', icon: ICON_NAMES.CATEGORY_ICONS.SUBSCRIPTIONS, type: 'income' }
];
const accountList = [
    {
        id: 1,
        account_name: 'Wallet',
        account_amount: 100,
        account_color: '#eeff00',
        account_icon: ICON_NAMES.ACCOUNT_ICONS.BANK
    },
    {
        id: 2,
        account_name: 'BPI',
        account_amount: 500,
        account_color: '#eeff00',
        account_icon: ICON_NAMES.ACCOUNT_ICONS.CREDIT_CARD
    },
    {
        id: 3,
        account_name: 'GCash',
        account_amount: 200,
        account_color: '#eeff00',
        account_icon: ICON_NAMES.ACCOUNT_ICONS.WALLET
    }
];

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
    const createTransaction = useTransactionStore((state) => state.createTransaction);
    const accounts = useAccountStore((state) => state.accounts);
    const user_id = useAuthStore((state) => state.authState?.user?.uid);
    const categories = useCategoryStore((state) => state.categories);
    const [isExpense, setIsExpense, handleExpense, categoryData] = useSortCategories(setSelectedCategory);

    const initialValues = {
        amount: '',
        comments: '',
        targetAccount: '',
        category: ''
    };

    const handleSubmit = async (values) => {
        console.log(values);
        const loader = toast.loading('Creating Transaction');
        const currentType = isExpense ? 'expense' : 'income';
        await createTransaction({ ...values, type: currentType, date, user_id }, selectedFile?.file);
        // RESET STATES
        formik.resetForm();
        setSelectedFile(null);
        setSelectedCategory('');
        setSelectedAccount('');
        setOpen(false);
        // HANDLE TOAST
        toast.dismiss(loader);
        toast.success('Transaction successfully created!');
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

        console.log(currentAccount);
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
                    You're overspending, you might want to rethink your expense.
                </Alert>
            </Snackbar>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style} component='form'>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Create a Transaction
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
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='body1'>Income</Typography>
                        <Switch
                            checked={isExpense}
                            onChange={handleExpense}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography variant='body1'>Expense</Typography>
                    </Box>

                    {/* ACCOUNT DROPDOWN */}
                    <Box sx={{ display: 'grid', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>Choose Account</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={selectedAccount}
                                label='Choose Account'
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
                            <InputLabel id='demo-simple-select-label'>Choose Category</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={selectedCategory.id}
                                label='Choose Category'
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
                                label='Date'
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
                        SUBMIT
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
