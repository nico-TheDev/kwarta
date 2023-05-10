import { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import Select from '@mui/material/Select';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import InfoIcon from '@mui/icons-material/Info';

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';
import { formatPrice } from 'utils/format-price';
import { getLanguage } from 'utils/getLanguage';

import DealsCard from './deals-card';

import { bdoSavings, metrobankSavings, bpiSavings, landbankSavings, securitybankSavings } from '../../data/savings';
import { useAccountStore } from 'stores/useAccountStore';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: 250
        }
    }
};

export const SavingsCard = ({ ...rest }) => {
    const [selectedAccount, setSelectedAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [savings, setSavings] = useState('');

    const accounts = useAccountStore((state) => state.accounts);

    const handleAccountChange = (e) => {
        const currentAccountId = e.target.value;
        const currentAccount = accounts.find((account) => account.id === currentAccountId);

        setAmount(currentAccount.account_amount);
        setSelectedAccount(e.target.value);
    };

    useEffect(() => {
        const sortedBdoSavings = bdoSavings.filter((item) => amount >= item.balanceInterest);
        const sortedMetrobankSavings = metrobankSavings.filter((item) => amount >= item.balanceInterest);
        const sortedBpiSavings = bpiSavings.filter((item) => amount >= item.balanceInterest);
        const sortedLandbankSavings = landbankSavings.filter((item) => amount >= item.balanceInterest);
        const sortedSecuritybankSavings = securitybankSavings.filter((item) => amount >= item.balanceInterest);

        function computeInterest(productName, interestRate, currentAmount) {
            const total = (currentAmount * (Math.pow((1 + (interestRate / 100)), 5))).toFixed(2);
            const percent = (((total - currentAmount) / currentAmount) * 100).toFixed(2);
            return { productName, total, percent };
        }

        const computedBdoSavings = sortedBdoSavings.map((item) =>
            computeInterest(item.productName, item.interestRate, amount)
        );
        const computedMetrobankSavings = sortedMetrobankSavings.map((item) =>
            computeInterest(item.productName, item.interestRate, amount)
        );
        const computedBpiSavings = sortedBpiSavings.map((item) =>
            computeInterest(item.productName, item.interestRate, amount)
        );
        const computedLandbankSavings = sortedLandbankSavings.map((item) =>
            computeInterest(item.productName, item.interestRate, amount)
        );
        const computedSecuritybankSavings = sortedSecuritybankSavings.map((item) =>
            computeInterest(item.productName, item.interestRate, amount)
        );

        console.log(computedBpiSavings);

        setSavings({
            computedBdoSavings,
            computedMetrobankSavings,
            computedBpiSavings,
            computedLandbankSavings,
            computedSecuritybankSavings
        });

        console.log(savings);
    }, [selectedAccount]);

    return (
        <>
            <Box
                sx={{
                    justifyContent: 'center',
                    mb: 2
                }}
            >
                <Box sx={{ py: 4, px: 4, mx: 'auto', width: '100%' }}>
                    <Box sx={{ fontSize: 80, textAlign: 'center' }}>
                        <InfoIcon fontSize='inherit' />
                    </Box>
                    <Typography align='center' sx={{ m: 1, textAlign: 'center' }} variant='body1'>
                        Saving helps individuals build wealth over time. By consistently setting aside a portion of
                        their income, individuals can accumulate savings that can be used for larger purchases, such as
                        a home or a car. <br></br>Over time, compound interest can help to increase the value of these
                        savings, allowing individuals to achieve their financial goals faster.
                    </Typography>
                </Box>

                <Box sx={{ py: 4, px: 4, mx: 'auto', width: '100%' }}>
                    <Typography align='center' sx={{ m: 1, textAlign: 'center', fontWeight: 'bold' }} variant='body1'>
                        Select an account below which will be used for investing in savings.
                    </Typography>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={selectedAccount}
                        label='Select Account'
                        onChange={handleAccountChange}
                        sx={{ display: 'flex', alignItems: 'center', maxWidth: 400, mx: 'auto' }}
                        MenuProps={MenuProps}
                        placeholder='Select Account'
                        className='savings_step_three'
                    >
                        {accounts.map((account) => {
                            return (
                                <MenuItem key={account.id} value={account.id}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ListItemIcon>
                                            <Icon name={account.account_icon} />
                                        </ListItemIcon>
                                        <ListItemText>{account.account_name}</ListItemText>
                                    </Box>
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>
            </Box>

            {amount > 1999 ? (
                <Box sx={{ pt: 3 }}>
                    <Typography align='center' sx={{ m: 1 }} variant='h6'>
                        You have {formatPrice(amount, true)} in your selected bank account. You may apply for savings
                        accounts in the given banks.
                    </Typography>
                    <Box sx={{ pt: 3, flexGrow: 1 }}>
                        <Typography sx={{ m: 1 }} variant='h5'>
                            BDO
                        </Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {savings.computedBdoSavings?.map((savings) => (
                                <Grid item key={savings.id} xs={12} sm={4} md={4}>
                                    <DealsCard iconName={ICON_NAMES.ACCOUNT_ICONS.BDO} savings={savings} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box sx={{ pt: 3, flexGrow: 1 }}>
                        <Typography sx={{ m: 1 }} variant='h5'>
                            Metrobank
                        </Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {savings.computedMetrobankSavings?.map((savings) => (
                                <Grid item key={savings.id} xs={12} sm={4} md={4}>
                                    <DealsCard iconName={ICON_NAMES.ACCOUNT_ICONS.METROBANK} savings={savings} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box sx={{ pt: 3, flexGrow: 1 }}>
                        <Typography sx={{ m: 1 }} variant='h5'>
                            BPI
                        </Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {savings.computedBpiSavings?.map((savings) => (
                                <Grid item key={savings.id} xs={12} sm={4} md={4}>
                                    <DealsCard iconName={ICON_NAMES.ACCOUNT_ICONS.BPI} savings={savings} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box sx={{ pt: 3, flexGrow: 1 }}>
                        <Typography sx={{ m: 1 }} variant='h5'>
                            Landbank
                        </Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {savings.computedLandbankSavings?.map((savings) => (
                                <Grid item key={savings.id} xs={12} sm={4} md={4}>
                                    <DealsCard iconName={ICON_NAMES.ACCOUNT_ICONS.BANK} savings={savings} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box sx={{ pt: 3, flexGrow: 1 }}>
                        <Typography sx={{ m: 1 }} variant='h5'>
                            Security Bank
                        </Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {savings.computedSecuritybankSavings?.map((savings) => (
                                <Grid item key={savings.id} xs={12} sm={4} md={4}>
                                    <DealsCard iconName={ICON_NAMES.ACCOUNT_ICONS.SECURITYBANK} savings={savings} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ pt: 3 }}>
                    <Typography sx={{ m: 1, textAlign: 'center' }} variant='body1'>
                        Your selected account have insufficient maintaining balance. The minimum amount to invest in
                        bonds is PHP 2,000.
                    </Typography>
                </Box>
            )}
        </>
    );
};

SavingsCard.propTypes = {
    product: PropTypes.object.isRequired
}
