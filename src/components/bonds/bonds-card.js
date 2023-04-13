import { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import Select from '@mui/material/Select';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

import { formatPrice } from 'utils/format-price'
import { getLanguage } from 'utils/getLanguage'

import { useAccountStore } from 'stores/useAccountStore';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: 250
        }
    }
};

export const BondsCard = ({ ...rest }) => {
    const [selectedAccount, setSelectedAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [bonds, setBonds] = useState('');

    const accounts = useAccountStore((state) => state.accounts);

    const data = [
        {
            id: 1,
            text: 'Affordable',
            icon: ICON_NAMES.SYSTEM_ICONS.PRICE_CHECK,
        },
        {
            id: 2,
            text: 'Convenient',
            icon: ICON_NAMES.SYSTEM_ICONS.CHECK,
        },
        {
            id: 3,
            text: 'Low-risk Investment',
            icon: ICON_NAMES.SYSTEM_ICONS.TRENDING_DOWN,
        },
        {
            id: 4,
            text: 'Short-term Investment',
            icon: ICON_NAMES.SYSTEM_ICONS.TIME,
        },
        {
            id: 5,
            text: 'Higher yielding than Time Deposits',
            icon: ICON_NAMES.SYSTEM_ICONS.UP,
        },
        {
            id: 6,
            text: 'Negotiable and Transferrable',
            icon:ICON_NAMES.SYSTEM_ICONS.ADD_TRANSFER,
        },
        {
            id: 7,
            text: 'Quarterly Interest Payments',
            icon: ICON_NAMES.SYSTEM_ICONS.CALENDAR,
        },
    ]

    const handleAccountChange = (e) => {
        const currentAccountId = e.target.value;
        const currentAccount = accounts.find((account) => account.id === currentAccountId);

        // console.log(currentAccount);
        setAmount(currentAccount.account_amount);
        setSelectedAccount(e.target.value);
    };

    useEffect(() => {
        function computeInterest(productName, interestRate, taxRate, time, currentAmount) {
            const total = (currentAmount * (interestRate / 100) * (1 - (taxRate / 100)) * time).toFixed(2);
            const percent = (((total - currentAmount) / currentAmount) * 100).toFixed(2);
            return { productName, total, percent };
        }
    
        const computedRTBs = computeInterest('Retail Treasury Bonds', 6.125, 20, 5.5, amount);

        setBonds(computedRTBs);
        
    }, [selectedAccount]);

    console.log(selectedAccount)
    console.log(amount);

    return(
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2
                }}
            >
                <Typography sx={{ m: 1 }} variant='h5'>
                    Select Account
                </Typography>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={selectedAccount}
                    label='Choose Account'
                    onChange={handleAccountChange}
                    sx={{ display: 'flex', alignItems: 'center' }}
                    defaultValue=''
                    MenuProps={MenuProps}
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
            
            {amount > 5000 ?
            <Box sx={{ pt: 3 }}>
                <Box sx={{ pt: 3 }}>
                    <Typography align='center' sx={{ m: 1 }} variant='h5'>
                        You have {formatPrice(amount, true)} in your selected bank account. You may invest in bonds.
                    </Typography>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            position: 'relative'
                            }}
                            // {...rest}
                            elevation={10}
                        >
                        <CardContent>
                            <Typography align='center' color='textPrimary' gutterBottom variant='h5'>
                                {bonds.productName}
                            </Typography>
                            <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                Return after 5.5 years: {formatPrice(bonds.total, true)}
                            </Typography>
                        </CardContent>

                        <Typography align='center' sx={{ m: 1 }} variant='body2'>
                            DISCLAIMER: This calculation is for illustration purposes only and should not be able to taken as professional advice to invest in RTB 29. It should not be used as the sole basis to measure returns in said securities. Terms and conditions of the RTB 29 is governed by the applicable Program Mechanics and Notice of Offering issued for the purpose. Returns displayed assume an interest period of 5.5 years and are net of 20% final withholding tax. Investment amount in RTB 29 is for a minimum of PHP5,000 and in integral multiples thereof. 
                        </Typography>
                    </Card>
                </Box>

                <Box sx={{ pt: 3 }}>
                    <Typography sx={{ m: 1, textAlign: 'center' }} variant='h5'>
                        Why invest in Retail Treasury Bonds?
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {data.map((data) => (
                            <Grid item key={data.id} xs={2} sm={4} md={4}>
                                <Box sx={{ pt: 3 }}>
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            position: 'relative'
                                            }}
                                            // {...rest}
                                            elevation={10}
                                    >
                                        <CardContent>
                                            <Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                                    <Icon
                                                        name={data.icon}
                                                        color='primary'
                                                        sx={{ fontSize: '100px'}}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography align='center' color='textPrimary' gutterBottom variant='h5'>
                                                        {data.text}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            :
            <Box sx={{ pt: 3 }}>
                <Typography sx={{ m: 1, textAlign: 'center' }} variant='h5'>
                    Your selected account have insufficient maintaining balance.
                </Typography>
            </Box>
            }
        </>
    )
}

BondsCard.propTypes = {
    product: PropTypes.object.isRequired
}
