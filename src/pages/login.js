import Head from 'next/head'
import NextLink from 'next/link'
import Router, { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Container, Grid, Link, TextField, Typography, useTheme } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth'
import { auth } from '../../firebase.config'

import { Facebook as FacebookIcon } from '../icons/facebook'
import { Google as GoogleIcon } from '../icons/google'
import Image from 'next/image'
import LoginBG from 'public/static/images/login-bg.jpg'
import { useAuthStore } from 'stores/useAuthStore'

const Login = () => {
    const theme = useTheme()
    const router = useRouter()
    const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle)
    const formik = useFormik({
        initialValues: {
            email: 'test@gmail.com',
            password: '1234'
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required')
        }),
        onSubmit: (values) => {
            console.log(values)
            Router.push('/').catch(console.error)
        }
    })

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Login | CASH: Financial Monitoring Application</title>
            </Head>
            <Box
                component='main'
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth='sm'>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color='textPrimary' variant='h4'>
                                Log in
                            </Typography>
                            <Typography color='textSecondary' gutterBottom variant='body2'>
                                Start monitoring your finances.
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={12}>
                                <Button
                                    color='error'
                                    fullWidth
                                    onClick={handleLoginWithGoogle}
                                    size='large'
                                    startIcon={<GoogleIcon />}
                                    variant='contained'
                                >
                                    Login with Google
                                </Button>
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                pb: 1,
                                pt: 3
                            }}
                        >
                            <Typography align='center' color='textSecondary' variant='body1'>
                                or login with email address
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label='Email Address'
                            margin='normal'
                            name='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type='email'
                            value={formik.values.email}
                            variant='outlined'
                        />
                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label='Password'
                            margin='normal'
                            name='password'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type='password'
                            value={formik.values.password}
                            variant='outlined'
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color='primary'
                                disabled={formik.isSubmitting}
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                            >
                                Log In Now
                            </Button>
                        </Box>
                        <Typography color='textSecondary' variant='body2'>
                            Don&apos;t have an account?{' '}
                            <NextLink href='/register'>
                                <Link
                                    to='/register'
                                    variant='subtitle2'
                                    underline='hover'
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </NextLink>
                        </Typography>
                    </form>
                </Container>

                <Box
                    sx={{
                        width: '50%',
                        height: '100vh',
                        overflow: 'hidden',
                        display: {
                            sm: 'none',
                            md: 'flex'
                        },
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant='h2'
                        position='absolute'
                        sx={{ zIndex: 10, color: 'white', textAlign: 'center' }}
                    >
                        <span style={{ color: theme.palette.primary.main }}>Learn</span> about Financial Literacy
                    </Typography>
                    <Image
                        src={LoginBG}
                        fill
                        style={{
                            filter: 'brightness(0.4) blur(2px)',
                            objectFit: 'cover'
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default Login
