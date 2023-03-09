import * as React from 'react'
import { useState, forwardRef } from 'react'
import { Box, Switch, Snackbar, Alert as MuiAlert } from '@mui/material'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import toast from 'react-hot-toast';

import { useFormik } from 'formik';
import { colorCollection } from '__mocks__/accounts';
import { ICON_NAMES } from 'constants/constant'
import ColorPicker from 'components/shared/ColorPicker';
import ColorPickerPanel from 'components/shared/ColorPickerPanel';
import IconOnlySelector from 'components/shared/IconOnlySelector';

import { useCategoryStore } from 'stores/useCategoryStore';
import { useAuthStore } from 'stores/useAuthStore';

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
}


export default function CategoryCreateModal({ open, setOpen }) {
    const [isExpense, setIsExpense] = useState(true)
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    const user = useAuthStore((state) => state.authState.user);

    const createCategory = useCategoryStore((state) => state.createCategory);

    const initialValues = {
        categoryName: '',
        categoryIcon: '',
        categoryColor: '',
        userId: user.uid
    }

    const handleExpense = () => {
        setIsExpense(!isExpense)
    }

    const handleColorClick = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("categoryColor", color);
        setShowColorWheel(false);
    };

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("categoryIcon", icon);
    };

    const handleSubmit = (values) => {
        console.log(values);
        const loader = toast.loading('Creating Category');
        const currentType = isExpense ? 'expense' : 'income';
        createCategory({ 
            category_name: values.categoryName,
            category_color: values.categoryColor,
            category_icon: values.categoryIcon,
            user_id: values.userId, 
            category_type: currentType,});
        formik.resetForm();
        setSelectedIcon('');
        setSelectedColor('');

        toast.dismiss(loader);
        toast.success('Category successfully created!');
    };

    const handleClose = () => setOpen(false)

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    });

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Create a Category
                    </Typography>
                    <FormControl fullWidth onSubmit={formik.handleSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                            <TextField 
                                id='filled-basic'
                                label="Category Name"
                                variant='filled'
                                name="categoryName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.categoryName}
                                fullWidth />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2}}>
                            <Typography variant='body1'>Income</Typography>
                            <Switch
                                checked={isExpense}
                                onChange={handleExpense}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography variant='body1'>Expense</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                            <ColorPickerPanel
                                colorList={colorCollection}
                                onColorPress={handleColorClick}
                                selectedColor={selectedColor}
                                setSelectedColor={setSelectedColor}
                                onAddPress={() => setShowColorWheel(true)}
                            />
                            {showColorWheel && <ColorPicker handleColorClick={handleColorClick} setShowColorWheel={setShowColorWheel} />}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                            <IconOnlySelector
                                iconData={Object.values(ICON_NAMES.CATEGORY_ICONS)}
                                onIconClick={handleIconClick}
                                selectedIcon={selectedIcon}
                                setSelectedIcon={setSelectedIcon}
                            />
                        </Box>
                        <Box sx={{ py: 2 }}>
                            <Button variant='contained' fullWidth onClick={formik.handleSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}
