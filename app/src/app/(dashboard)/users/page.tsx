'use client';

import { Box, Container } from '@mui/material';
import { CustomerListResults } from 'components/customer/customer-list-results';
import { CustomerListToolbar } from 'components/customer/customer-list-toolbar';
import { customers } from '__mocks__/customers';

export default function Page() {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth={false}>
                    <CustomerListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <CustomerListResults customers={customers} />
                    </Box>
                </Container>
            </Box>
        </>
    );
}
