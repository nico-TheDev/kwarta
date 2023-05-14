import { useRef, useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
    IconButton,
    Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material';
import { getLanguage } from 'utils/getLanguage';
import CategoryCreateModal from 'components/form/category-create-form-modal';
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';
import { useLanguageStore } from 'stores/useLanguageStore';

export const CategoriesHead = (props) => {
    const theme = useTheme();
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const [openCategoryCreateModal, setOpenCategoryCreateModal] = useState(false);

    const handleOpenCategoryCreateModal = () => setOpenCategoryCreateModal(true);
    return (
        <>
            <CategoryCreateModal open={openCategoryCreateModal} setOpen={setOpenCategoryCreateModal} />
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
                    <Tooltip title={getLanguage(currentLanguage).tooltipCategories}>
                        <Typography
                            sx={{ m: 1, fontSize: { md: 20, xs: 'initial' }, mb: { xs: 4, lg: 1 } }}
                            variant='h4'
                            className='categories_step_one'
                        >
                            {getLanguage(currentLanguage).categories}
                        </Typography>
                    </Tooltip>
                    <Box sx={{ m: 1 }} className='categories_step_two'>
                        <Button
                            onClick={handleOpenCategoryCreateModal}
                            variant='contained'
                            color='primary'
                            startIcon={<Icon name={ICON_NAMES.SYSTEM_ICONS.ADD} color='#FFFFFF' fontSize='small' />}
                            sx={{ mr: 1, display: { xs: 'none', lg: 'flex' } }}
                        >
                            {getLanguage(currentLanguage).addCategory}
                        </Button>

                        <IconButton
                            onClick={handleOpenCategoryCreateModal}
                            color='primary'
                            size='large'
                            sx={{
                                display: {
                                    xs: 'initial',
                                    lg: 'none'
                                }
                            }}
                        >
                            <Icon name={ICON_NAMES.SYSTEM_ICONS.ADD} color='#FFFFFF' fontSize='small' />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
