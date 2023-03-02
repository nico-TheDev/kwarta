import { useRef, useState } from 'react'
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { getLanguage } from 'utils/getLanguage'
import CategoryFormModal from '../form/category-form-modal'
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'

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
                            startIcon={<Icon name={ICON_NAMES.SYSTEM_ICONS.ADD} color='#FFFFFF' fontSize='small' />}
                            sx={{ mr: 1 }}
                        >
                            {getLanguage().addCategory}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
