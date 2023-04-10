import { useRef, useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material';
import { getLanguage } from 'utils/getLanguage';
import { formatPrice } from 'utils/format-price';

import TransferFormModal from 'components/form/transfer-create-form-modal';
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

import { useAccountStore } from 'stores/useAccountStore';

export const TransferHead = (props) => {
    const { filterValue, setFilterValue } = props;
    const theme = useTheme();

    const accounts = useAccountStore((state) => state.accounts);
    const [total, setTotal] = useState(0);

    const [openTransferModal, setOpenTransferModal] = useState(false);
    const handleOpenTransferModal = () => setOpenTransferModal(true);

    const handleTypeChange = (e) => {
        setFilterValue(e.target.value);
    };

    return (
        <>
            <TransferFormModal open={openTransferModal} setOpen={setOpenTransferModal} />
            <Box {...props}>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: {
                            lg: 'initial',
                            xs: 'column'
                        }
                    }}
                >
                    <Typography
                        sx={{
                            m: 1,
                            fontSize: {
                                lg: 'initial',
                                xs: 20
                            }
                        }}
                        variant='h4'
                    >
                        {getLanguage().transferOverview}
                    </Typography>
                    <Box
                        sx={{
                            m: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            width: {
                                lg: '40%',
                                xs: '100%'
                            }
                        }}
                    >
                        <FormControl
                            sx={{
                                flex: 1,
                                width: {
                                    lg: 'initial',
                                    xs: '100%'
                                }
                            }}
                        >
                            <InputLabel id='demo-simple-select-label'>{getLanguage().filter}</InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={filterValue}
                                label='filterValue'
                                onChange={handleTypeChange}
                            >
                                <MenuItem value={'year'}>{getLanguage().year}</MenuItem>
                                <MenuItem value={'month'}>{getLanguage().month}</MenuItem>
                                <MenuItem value={'day'}>{getLanguage().day}</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant='outlined'
                            startIcon={
                                <Icon name={ICON_NAMES.SYSTEM_ICONS.ADD_TRANSFER} color='#FFFFFF' fontSize='small' />
                            }
                            sx={{ flex: 1, height: '100%' }}
                            onClick={handleOpenTransferModal}
                        >
                            {getLanguage().addTransfer}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
