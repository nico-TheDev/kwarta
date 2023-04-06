import { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import Select from '@mui/material/Select';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

import { Icon } from 'components/shared/Icon';

import { formatPrice } from 'utils/format-price'
import { getLanguage } from 'utils/getLanguage'

import { bdoSavings, metrobankSavings, bpiSavings, landbankSavings, securitybankSavings } from '../../data/savings'
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
    const [currentBdoSavings, setCurrentBdoSavings] = useState({});
    const [currentMetrobankSavings, setCurrentMetrobankSavings] = useState([]);
    const [currentBpiSavings, setCurrentBpiSavings] = useState([]);
    const [currentLandbankSavings, setCurrentLandbankSavings] = useState([]);
    const [currentSecuritybankSavings, setCurrentSecuritybankSavings] = useState([]);

    const accounts = useAccountStore((state) => state.accounts);

    const handleAccountChange = (e) => {
        const currentAccountId = e.target.value;
        const currentAccount = accounts.find((account) => account.id === currentAccountId);

        // console.log(currentAccount);
        setAmount(currentAccount.account_amount);
        setSelectedAccount(e.target.value);
    };

    useEffect(() => {
        const sortedBdoSavings = bdoSavings.filter(item => amount >= item.balanceInterest);
        const sortedMetrobankSavings = metrobankSavings.filter(item => amount >= item.balanceInterest);
        const sortedBpiSavings = bpiSavings.filter(item => amount >= item.balanceInterest);
        const sortedLandbankSavings = landbankSavings.filter(item => amount >= item.balanceInterest);
        const sortedSecuritybankSavings = securitybankSavings.filter(item => amount >= item.balanceInterest);
        
        function computeInterest(productName, interestRate, currentAmount) {
            const total = (currentAmount * (1 + (interestRate / 100) * 5)).toFixed(2);
            const percent = (((total - currentAmount) / currentAmount) * 100).toFixed(2);
            return { productName, total, percent };
        }

        const computedBdoSavings = sortedBdoSavings.map((item) => computeInterest(item.productName, item.interestRate, amount))
        const computedMetrobankSavings = sortedMetrobankSavings.map((item) => computeInterest(item.productName, item.interestRate, amount))
        const computedBpiSavings = sortedBpiSavings.map((item) => computeInterest(item.productName, item.interestRate, amount))
        const computedLandbankSavings = sortedLandbankSavings.map((item) => computeInterest(item.productName, item.interestRate, amount))
        const computedSecuritybankSavings = sortedSecuritybankSavings.map((item) => computeInterest(item.productName, item.interestRate, amount))

        console.log(computedBdoSavings);

        setCurrentBdoSavings(computedBdoSavings);
        setCurrentMetrobankSavings(computedMetrobankSavings);
        setCurrentBpiSavings(computedBpiSavings);
        setCurrentLandbankSavings(computedLandbankSavings);
        setCurrentSecuritybankSavings(computedSecuritybankSavings);

        console.log(currentBdoSavings);

    }, [selectedAccount]);

    return (
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
                    label='Select Account'
                    onChange={handleAccountChange}
                    sx={{ display: 'flex', alignItems: 'center', width: 200 }}
                    MenuProps={MenuProps}
                    placeholder='Select Account'
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

            {amount > 2000 ? (
                <Box sx={{ pt: 3 }}>
                    <Box sx={{ pt: 3 }}>
                        <Typography sx={{ m: 1 }} variant='h5'>
                            BDO
                        </Typography>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2
                                }}
                            >
                                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                    {currentBdoSavings.productName}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '100%', mb: 1 }}>
                                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                    PHP {currentBdoSavings.total}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '100%', mb: 1 }}>
                                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                    {currentBdoSavings.percent}%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Box>
                    
                    <Box sx={{ pt: 3 }}>
                        <Typography sx={{ m: 1 }} variant='h5'>
                            Metrobank
                        </Typography>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2
                                }}
                            >
                                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                    {currentMetrobankSavings.productName}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '100%', mb: 1 }}>
                                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                    PHP {currentMetrobankSavings.total}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '100%', mb: 1 }}>
                                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                    {currentMetrobankSavings.percent}%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ pt: 3 }}>
                    <Typography sx={{ m: 1, textAlign: 'center' }} variant='h5'>
                        Your selected account have insufficient maintaining balance.
                    </Typography>
                </Box>
            )}
        </>
    );
};

SavingsCard.propTypes = {
    product: PropTypes.object.isRequired
}
