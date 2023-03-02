import { useRef, useState } from 'react'
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
<<<<<<< HEAD
import { getLanguage } from 'utils/getLanguage'
import CategoryFormModal from '../form/category-form-modal'
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'
=======
import { Download as DownloadIcon } from '../../icons/download'
import AddCardIcon from '@mui/icons-material/AddCard'
import TransferIcon from '@mui/icons-material/Autorenew'
import { getLanguage } from 'utils/getLanguage'
import CategoryFormModal from '../form/category-form-modal'
>>>>>>> 05a55481dfece81d4d6b6c9208c304b53abf4d53

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
<<<<<<< HEAD
                            startIcon={<Icon name={ICON_NAMES.SYSTEM_ICONS.ADD} color='#FFFFFF' fontSize='small' />}
=======
                            startIcon={<AddCardIcon fontSize='small' />}
>>>>>>> 05a55481dfece81d4d6b6c9208c304b53abf4d53
                            sx={{ mr: 1 }}
                        >
                            {getLanguage().addCategory}
                        </Button>
<<<<<<< HEAD
=======
                        <Button variant='outlined' startIcon={<TransferIcon fontSize='small' />} sx={{ mr: 1 }}>
                            {getLanguage().createTransfer}
                        </Button>
>>>>>>> 05a55481dfece81d4d6b6c9208c304b53abf4d53
                    </Box>
                </Box>
            </Box>
        </>
    )
}
