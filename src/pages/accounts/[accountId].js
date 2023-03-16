import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Head from 'next/head';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { DashboardLayout } from '../../components/dashboard-layout';
import { colorCollection } from '__mocks__/accounts';
import ColorPicker from 'components/shared/ColorPicker';
import ColorPickerPanel from 'components/shared/ColorPickerPanel';
import IconOnlySelector from 'components/shared/IconOnlySelector';
import { ICON_NAMES } from 'constants/constant';

import { useAccountStore } from 'stores/useAccountStore';
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
    const { accountId } = router.query;
    // FORM STATES
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');
    const [showColorWheel, setShowColorWheel] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [currentAccount, setCurrentAccount] = useState('');

    // STORE
    const updateAccount = useAccountStore((state) => state.updateAccount);
    const deleteAccount = useAccountStore((state) => state.deleteAccount);
    const accounts = useAccountStore((state) => state.accounts);
    const user_id = useAuthStore((state) => state.authState?.user?.uid);

    console.log(isEditing);
    const handleSubmit = async (values) => {

        updateAccount(
            accountId,
            {
                account_name: values.accountName,
                account_amount: values.accountAmount,
                account_color: selectedColor,
                user_id
            },
        ).then((success) => {
            if (success) {
                router.push('/');
            }
        });

        // RESET STATES
        formik.resetForm();
        setSelectedIcon('');
        setSelectedColor('');
        setOpen(false);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
        setShowColorWheel(false);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color.hex);
    };

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue('accountIcon', icon);
    };

    const initialValues = {
        accountName: '',
        accountAmount: '',
        accountIcon: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    });

    const handleDelete = () => {
        deleteAccount(accountId).then((success) => {
            if (success) {
                router.push('/');
            }
        });
    };

    useEffect(() => {
        const current = accounts.find((item) => item.id === accountId);

        setSelectedIcon(current.account_icon);
        setSelectedColor(current.account_color);

        setCurrentAccount(current);

        formik.setFieldValue('accountAmount', current.account_amount);
        formik.setFieldValue('accountName', current.account_name);
    }, [accountId]);

    if (!currentAccount)
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
                <title>Accounts Detail | CASH</title>
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
                            Account Detail
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TextField
                                id='account-name'
                                label='Account Name'
                                variant='filled'
                                fullWidth
                                name='accountName'
                                value={formik.values.accountName}
                                onChange={formik.handleChange}
                                type='text'
                                disabled={!isEditing}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TextField
                                id='account-amount'
                                label='Account Amount'
                                variant='filled'
                                fullWidth
                                name='accountAmount'
                                value={formik.values.accountAmount}
                                onChange={formik.handleChange}
                                type='number'
                                disabled={!isEditing}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                            <ColorPickerPanel
                                colorList={colorCollection}
                                onColorPress={handleColorClick}
                                selectedColor={selectedColor}
                                setShowColorWheel={setShowColorWheel}
                            />
                            {showColorWheel && (
                                <ColorPicker
                                    handleColorSelect={handleColorSelect}
                                    setShowColorWheel={setShowColorWheel}
                                    selectedColor={selectedColor}
                                />
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                            <IconOnlySelector
                                iconData={Object.values(ICON_NAMES.ACCOUNT_ICONS)}
                                onIconClick={handleIconClick}
                                selectedIcon={selectedIcon}
                                setSelectedIcon={setSelectedIcon}
                            />
                        </Box>

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
