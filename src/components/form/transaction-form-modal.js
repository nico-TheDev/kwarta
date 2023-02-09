import { useState, forwardRef } from 'react'
import { Box, Switch, Snackbar, Alert as MuiAlert } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import * as React from 'react'
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: '80vh',
    bgcolor: 'background.paper',
    overflowY: 'scroll',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'grid',
    gap: 4
}

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function TransactionFormModal({ open, setOpen }) {
    const [isExpense, setIsExpense] = useState(true)
    const [date, setDate] = useState(dayjs(new Date()))

    const handleClose = () => setOpen(false)

    const handleExpense = () => {
        setIsExpense(!isExpense)
    }

    const [openAlert, setOpenAlert] = React.useState(false)

    const handleOpenAlert = () => {
        setOpenAlert(true)
        handleClose()
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenAlert(false)
    }

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
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Create a Transaction
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField id='filled-basic' label='Amount' variant='filled' fullWidth />
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

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>Choose Account</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                // value={age}
                                label='Choose Account'
                                onChange={() => {}}
                            >
                                <MenuItem value={10}>Wallet</MenuItem>
                                <MenuItem value={20}>GCASH</MenuItem>
                                <MenuItem value={30}>BPI</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>Choose Category</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                // value={age}
                                label='Choose Account'
                                onChange={() => {}}
                            >
                                <MenuItem value={10}>Electricity Bills</MenuItem>
                                <MenuItem value={20}>Food</MenuItem>
                                <MenuItem value={30}>Groceries</MenuItem>
                                <MenuItem value={30}>Gym</MenuItem>
                                <MenuItem value={30}>Personal</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label='Date'
                                inputFormat='MM/DD/YYYY'
                                value={date}
                                onChange={setDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            id='outlined-multiline-flexible'
                            label='Comment'
                            multiline
                            rows={4}
                            variant='outlined'
                        />
                        <Button component='label' variant='contained' sx={{ height: '100%' }}>
                            <AddPhotoIcon fontSize='large' />
                            <input type='file' hidden />
                        </Button>
                    </Box>
                    <Button variant='contained' fullWidth onClick={handleOpenAlert}>
                        SUBMIT
                    </Button>
                </Box>
            </Modal>
        </>
    )
}
