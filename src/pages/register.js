import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';

import toast from 'react-hot-toast';
import { useAuthStore } from 'stores/useAuthStore';

const Register = () => {
    const addUser = useAuthStore((state) => state.addUser);
    const [selectedFile, setSelectedFile] = useState('');
    const inputRef = useRef(null);
    const hasSelectedFile = useRef(null);
    const router = useRouter();

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (e.target.files?.length) {
            hasSelectedFile.current = true;
            const fileSrc = URL.createObjectURL(file);
            setSelectedFile({ source: fileSrc, file });
            // console.log(e.target.files);
        }

        focusBack();
    };

    const handleFileClick = () => {
        hasSelectedFile.current = false;
        window.addEventListener('focus', focusBack);
    };

    const focusBack = () => {
        if (!hasSelectedFile.current) {
            setSelectedFile(null);
            if (inputRef.current) {
                inputRef.current.value = null;
            }
        }

        window.removeEventListener('focus', focusBack);
    };

    const handleSubmit = (values) => {
        addUser(
            {
                firstName: values.firstName,
                lastName: values.lastName,
                displayName: values.firstName + ' ' + values.lastName,
                email: values.email,
                password: values.password
            },
            selectedFile?.file
        ).then((data) => {
            formik.resetForm();
            router.push('/survey');
            setSelectedFile(null);
        });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    });

    return (
        <>
            <Head>
                <title>Register | Material Kit</title>
            </Head>
            <Box
                component='main'
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth='sm'>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Button
                                component='label'
                                variant='contained'
                                sx={{
                                    height: 150,
                                    width: 150,
                                    fontSize: 80,
                                    ml: 2,
                                    p: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'relative',
                                    borderRadius: '100%',
                                    overflow: 'hidden',
                                    marginX: 'auto'
                                }}
                            >
                                {selectedFile?.source ? (
                                    <Box sx={{ width: '100%', height: '100%', top: 0, left: 0 }}>
                                        <img
                                            src={selectedFile?.source}
                                            alt=''
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <AddPhotoIcon fontSize='inherit' />
                                )}
                                <input
                                    type='file'
                                    hidden
                                    onChange={handleFileSelect}
                                    onClick={handleFileClick}
                                    accept='image/*'
                                    ref={inputRef}
                                />
                            </Button>
                        </Box>
                        <Box sx={{ my: 3, textAlign: 'center' }}>
                            <Typography color='textPrimary' variant='h4'>
                                Create a new account
                            </Typography>
                            <Typography color='textSecondary' gutterBottom variant='body2'>
                                Use your email to create a new account
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'grid', gap: 2 }}>
                            <TextField
                                label='First Name'
                                name='firstName'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                variant='outlined'
                            />
                            <TextField
                                label='Last Name'
                                name='lastName'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                variant='outlined'
                            />
                            <TextField
                                label='Email Address'
                                name='email'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type='email'
                                value={formik.values.email}
                                variant='outlined'
                            />
                            <TextField
                                label='Password'
                                name='password'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type='password'
                                value={formik.values.password}
                                variant='outlined'
                            />
                        </Box>
                        <Box sx={{ py: 2 }}>
                            <Button
                                color='primary'
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                                onClick={formik.handleSubmit}
                                disabled={
                                    !formik.values.email ||
                                    !formik.values.firstName ||
                                    !formik.values.lastName ||
                                    !formik.values.password
                                }
                            >
                                Sign Up Now
                            </Button>
                        </Box>
                        <Typography color='textSecondary' variant='body2'>
                            Have an account?{' '}
                            <NextLink href='/login' passHref>
                                <Link variant='subtitle2' underline='hover'>
                                    Sign In
                                </Link>
                            </NextLink>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;
