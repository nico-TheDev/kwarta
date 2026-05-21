'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotFound() {
    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100vh',
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography align="center" color="textPrimary" variant="h1">
                        404: The page you are looking for isn&apos;t here
                    </Typography>
                    <Typography align="center" color="textPrimary" variant="subtitle2">
                        You either tried some shady route or you came here by mistake. Whichever it is, try using the
                        navigation
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <Image
                            alt="Under development"
                            src="/static/images/undraw_page_not_found_su7k.svg"
                            width={560}
                            height={400}
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560,
                            }}
                        />
                    </Box>
                    <Link href="/dashboard">
                        <Button
                            startIcon={<ArrowBackIcon fontSize="small" />}
                            sx={{ mt: 3 }}
                            variant="contained"
                        >
                            Go back to dashboard
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}
