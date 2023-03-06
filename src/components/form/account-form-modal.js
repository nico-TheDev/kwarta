import * as React from 'react'
import { useState, forwardRef } from 'react'
import Router from 'next/router';
import { Box, Switch, Snackbar, Alert as MuiAlert } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'

import { useFormik } from 'formik';
import { colorCollection } from '__mocks__/accounts';
import { ICON_NAMES } from 'constants/constant'
import ColorPicker from 'components/shared/ColorPicker';
import ColorPickerPanel from 'components/shared/ColorPickerPanel';
import IconOnlySelector from 'components/shared/IconOnlySelector';

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
    gap: 4,
}

export default function AccountFormModal({ open, setOpen }) {
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [showColorWheel, setShowColorWheel] = useState(false);

    const handleColorClick = (color) => {
        setSelectedColor(color);
        formik.setFieldValue("accountColor", color);
        setShowColorWheel(false);
    };

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
        formik.setFieldValue("accountIcon", icon);
    };

    const handleClose = () => setOpen(false)

    const formik = useFormik({
        initialValues: {
            accountName: '',
            accountAmount: '',
            accountIcon: '',
            accountColor: ''
        },
        onSubmit: () => {
            Router
            .push('/accounts')
            .catch(console.error);
        }
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
                        Create an Account
                    </Typography>
                    <FormControl fullWidth onSubmit={formik.handleSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                            <TextField 
                                id='filled-basic'
                                label="Account Name"
                                variant='filled'
                                name="accountName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.accountName}
                                fullWidth />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                            <TextField 
                                id='filled-basic'
                                label="Account Amount"
                                variant='filled'
                                name="accountAmount"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.accountAmount}
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
                                iconData={Object.values(ICON_NAMES.ACCOUNT_ICONS)}
                                onPress={handleIconClick}
                                selectedIcon={selectedIcon}
                                setSelectedIcon={setSelectedIcon}
                            />
                        </Box>
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Box>
                    </FormControl>
                </Box>
            </Modal>
        </>
    )
}
