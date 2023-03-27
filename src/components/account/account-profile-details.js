import { useState, useEffect } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material'
import { getLanguage } from 'utils/getLanguage'
import { useFormik } from 'formik';

import { useAuthStore } from 'stores/useAuthStore'

export const AccountProfileDetails = (props) => {
    const user = useAuthStore((state) => state.authState.user)
    const updateUser = useAuthStore((state) => state.updateUser)

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
    }

    const handleSubmit = (values) => {
        console.log(values);
        updateUser({ 
            firstName: values.firstName,
            lastName: values.lastName,
            new_displayName: values.firstName + " " + values.lastName,
            new_email: values.email,
        });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    });

    console.log(user);

    useEffect(() => {
        formik.setFieldValue('firstName', user?.firstName);
        formik.setFieldValue('lastName', user?.lastName);
        formik.setFieldValue('email', user?.email);
    }, [user]);

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
                                onChange={formik.handleChange}
                                required
                                value={formik.values.firstName}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label={getLanguage().lastName}
                                name='lastName'
                                onChange={formik.handleChange}
                                required
                                value={formik.values.lastName}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label='Email Address'
                                name='email'
                                onChange={formik.handleChange}
                                required
                                value={formik.values.email}
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
                    <Button color='primary' variant='contained'
                    onClick={formik.handleSubmit}>
                        {getLanguage().saveDetails}
                    </Button>
                </Box>
            </Card>
        </form>
    )
}
