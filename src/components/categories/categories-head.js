import { useRef, useState } from 'react'
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { Download as DownloadIcon } from '../../icons/download'
import AddCardIcon from '@mui/icons-material/AddCard'
import TransferIcon from '@mui/icons-material/Autorenew'
import { getLanguage } from 'utils/getLanguage'
import CategoryFormModal from '../form/category-form-modal'

export const CategoriesHead = (props) => {
    const theme = useTheme()
    const [openCategoryModal, setOpenCategoryModal] = useState(false)

    const handleOpenModal = () => setOpenCategoryModal(true)
    return (
        <>
            <CategoryFormModal open={openCategoryModal} setOpen={setOpenCategoryModal} />
            <Box {...props}>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        m: -1
                    }}
                >
                    <Typography sx={{ m: 1 }} variant='h4'>
                        {getLanguage().categories}
                    </Typography>
                    <Box sx={{ m: 1 }}>
                        <Button
                            onClick={handleOpenModal}
                            variant='contained'
                            color='primary'
                            startIcon={<AddCardIcon fontSize='small' />}
                            sx={{ mr: 1 }}
                        >
                            {getLanguage().addCategory}
                        </Button>
                        <Button variant='outlined' startIcon={<TransferIcon fontSize='small' />} sx={{ mr: 1 }}>
                            {getLanguage().createTransfer}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
