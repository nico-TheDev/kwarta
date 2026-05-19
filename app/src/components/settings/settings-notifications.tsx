import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Typography,
    Switch
} from '@mui/material'
import { useState } from 'react'
import { useLanguageStore } from 'stores/useLanguageStore'
import { getLanguage } from 'utils/getLanguage'

export const SettingsNotifications = (props) => {
    const setCurrentLanguage = useLanguageStore((state) => state.setLanguage)
    const currentLanguage = useLanguageStore((state) => state.currentLanguage)
    const [isEnglish, setIsEnglish] = useState(currentLanguage === 'en')

    const handleChange = (event) => {
        setIsEnglish(event.target.checked)
        if (isEnglish) {
            setCurrentLanguage('ph')
        } else {
            setCurrentLanguage('en')
        }
        // console.log(isEnglish)
    }

    return (
        <form {...props}>
            <Card>
                <CardHeader
                    subheader={getLanguage(currentLanguage).changeLanguage}
                    title={getLanguage(currentLanguage).language}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    <Typography variant='body2'>Filipino</Typography>
                    <Switch checked={isEnglish} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
                    <Typography variant='body2'>English</Typography>
                </Box>
                <Divider />
                <CardContent>
                    <Grid container spacing={6} wrap='wrap'>
                        <Grid
                            item
                            md={4}
                            sm={6}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            xs={12}
                        ></Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button color='primary' variant='contained'>
                        Save
                    </Button>
                </Box>
            </Card>
        </form>
    );
}
