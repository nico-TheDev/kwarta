import { useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material'
import { useAuthStore } from 'stores/useAuthStore'
import { getLanguage } from 'utils/getLanguage'

const states = [
    {
        value: 'alabama',
        label: 'Alabama'
    },
    {
        value: 'new-york',
        label: 'New York'
    },
    {
        value: 'san-francisco',
        label: 'San Francisco'
    }
]

export const AccountProfileDetails = (props) => {
    const user = useAuthStore((state) => state.authState.user)

    const [values, setValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: '',
        state: 'Alabama',
        country: 'USA'
    })

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form autoComplete='off' noValidate {...props}>
            <Card>
                <CardHeader subheader={getLanguage().editInformation} title={getLanguage().profile} />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                helperText={getLanguage().specifyFirstName}
                                label={getLanguage().firstName}
                                name='firstName'
                                onChange={handleChange}
                                required
                                value={values.firstName}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label={getLanguage().lastName}
                                name='lastName'
                                onChange={handleChange}
                                required
                                value={values.lastName}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label='Email Address'
                                name='email'
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant='outlined'
                            />
                        </Grid>
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
                        {getLanguage().saveDetails}
                    </Button>
                </Box>
            </Card>
        </form>
    )
}
