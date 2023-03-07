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

import { useFormik } from 'formik';
import { colorCollection } from '__mocks__/accounts';
import { ICON_NAMES } from 'constants/constant'
import ColorPicker from 'components/shared/ColorPicker';
import ColorPickerPanel from 'components/shared/ColorPickerPanel';
import IconOnlySelector from 'components/shared/IconOnlySelector';

import { useCategoryStore } from 'stores/useCategoryStore';

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
    const [openAlert, setOpenAlert] = React.useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    const createCategory = useCategoryStore((state) => state.createCategory);

    const initialValues = {
        categoryName: '',
        categoryIcon: '',
        categoryColor: ''
        // user_id: user.user_id
    }

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
        createCategory({ ...values});
        formik.resetForm();
        setSelectedIcon('');
        setSelectedColor('');
        handleOpenAlert();
    };

    const handleClose = () => setOpen(false)

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    });

    return (
        <>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity='success' sx={{ width: '100%' }}>
                    Category created.
                </Alert>
            </Snackbar>

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
