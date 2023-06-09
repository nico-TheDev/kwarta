import { useState } from 'react';
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
import { useTransactionStore } from 'stores/useTransactionStore';
import { useAccountStore } from 'stores/useAccountStore';
import { useAuthStore } from 'stores/useAuthStore';
import { useCategoryStore } from 'stores/useCategoryStore';
import useSortCategories from 'hooks/useSortCategories';
import { useEffect } from 'react';
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

const Page = () => {
    const router = useRouter();

    const { transactionId } = router.query;
    // FORM STATES
    const [date, setDate] = useState(formatDate(dayjs(new Date())));
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState('');

    // STORE
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const updateTransaction = useTransactionStore((state) => state.updateTransaction);
    const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
    const accounts = useAccountStore((state) => state.accounts);
    const user_id = useAuthStore((state) => state.authState?.user?.uid);
    const categories = useCategoryStore((state) => state.categories);
    const [transactionType, setTransactionType, handleTransactionType, categoryData] =
        useSortCategories(setSelectedCategory);
    const transactions = useTransactionStore((state) => state.transactions);

    const handleSubmit = async (values) => {
        updateTransaction(
            transactionId,
            {
                ...values,
                amount: Number(values.amount),
                type: transactionType,
                date,
                user_id
            },
            selectedFile
        ).then((success) => {
            if (success) {
                router.push('/dashboard');
            }
        });

        // RESET STATES
        formik.resetForm();
        setSelectedFile(null);
        setSelectedCategory('');
        setSelectedAccount('');
        setOpen(false);
    };

    const initialValues = {
        amount: '',
        comments: '',
        targetAccount: '',
        category: ''
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

    const handleCategoryChange = (e) => {
        const currentCategoryId = e.target.value;
        const currentCategory = categoryData.find((category) => category.id === currentCategoryId);

        formik.setFieldValue('category', currentCategory);

        setSelectedCategory(currentCategory);
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

    const handleDelete = () => {
        deleteTransaction(transactionId, currentTransaction?.photoRef || '').then((success) => {
            if (success) {
                router.push('/dashboard');
            }
        });
    };

    useEffect(() => {
        // GET THEN VALUES OF THE TRANSACTION

        const current = transactions.find((item) => item.id === transactionId);

        // SET THE VALUE OF THE FIELDS
        setTransactionType(current.type);
        setSelectedAccount(current?.targetAccount.id);
        setDate(current?.date);
        setSelectedFile({
            source: current?.photoUrl
        });

        setCurrentTransaction(current);

        formik.setFieldValue('amount', current?.amount);
        formik.setFieldValue('category', current?.category);
        formik.setFieldValue('targetAccount', current?.targetAccount);
        formik.setFieldValue('comments', current?.comments);

        // console.log(current.category);
        setSelectedCategory(current?.category);
    }, [transactionId]);

    if (!currentTransaction && !selectedCategory?.id)
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
                <title>Transactions Detail | CASH</title>
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
                            width: {
                                md: 500,
                                xs: '100%'
                            },
                            display: 'grid',
                            gap: 2
                        }}
                        component='form'
                    >
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            {getLanguage(currentLanguage).transactionDetails}
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
                                type='number'
                                disabled={!isEditing}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <DropdownType
                                handleChange={handleTransactionType}
                                transactionType={transactionType}
                                disabled={!isEditing}
                            />
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
                            {/* CATEGORY DROPDOWN */}
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>
                                    {getLanguage(currentLanguage).chooseCategory}
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={selectedCategory ? selectedCategory.id : formik.values.category.id}
                                    label={getLanguage(currentLanguage).chooseCategory}
                                    onChange={handleCategoryChange}
                                    MenuProps={MenuProps}
                                    disabled={!isEditing}
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
                                        {getLanguage(currentLanguage).edit}
                                    </Button>
                                    <Button variant='outlined' sx={{ flex: 1 }} onClick={handleDelete}>
                                        {getLanguage(currentLanguage).delete}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant='contained' sx={{ flex: 1 }} onClick={formik.handleSubmit}>
                                        {getLanguage(currentLanguage).save}
                                    </Button>
                                    <Button variant='outlined' sx={{ flex: 1 }} onClick={() => setIsEditing(false)}>
                                        {getLanguage(currentLanguage).cancel}
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
