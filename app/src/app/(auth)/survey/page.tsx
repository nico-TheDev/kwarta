'use client';

import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useLanguageStore } from '../../../stores/useLanguageStore';
import SurveyBlock from '../../../components/SurveyBlock';

export default function SurveyPage() {
    const setLanguage = useLanguageStore((state) => state.setLanguage);
    const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
    const [dataPrivacyAnswer, setDataPrivacyAnswer] = useState(false);

    if (!hasSelectedLanguage) {
        return (
            <Box sx={{ py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        What language do you want to view the website? (Anong lenggwahe mo nais basahin ang website?)
                    </Typography>
                    <Box sx={{ display: 'grid', gap: 2 }}>
                        <Button variant="outlined" onClick={() => { setLanguage('en'); setHasSelectedLanguage(true); }}>English</Button>
                        <Button variant="outlined" onClick={() => { setLanguage('ph'); setHasSelectedLanguage(true); }}>Filipino</Button>
                    </Box>
                </Container>
            </Box>
        );
    }

    if (!dataPrivacyAnswer) {
        return (
            <Box sx={{ py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h3" sx={{ mb: 2 }}>Welcome to CASH.</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>Data Privacy Agreement</Typography>
                    <Box sx={{ display: 'grid', gap: 2, mb: 6 }}>
                        <Typography variant="body1">
                            We highly value your privacy and are committed to protecting the confidentiality of your personal information.
                            The data collected in this survey form will be used solely for the application and analytical purposes,
                            and will be handled with the utmost care and diligence.
                        </Typography>
                        <Typography variant="body1">
                            By accessing and participating in this survey, you acknowledge and consent that the information you provide
                            may be utilized and analyzed in accordance with legal and regulatory standards, as well as in compliance
                            with the Data Privacy Act of 2012.
                        </Typography>
                        <Typography variant="body1">
                            We assure you that your data will be treated with the highest level of security and privacy. It will only
                            be used for research purposes and will not be shared or disclosed to any third parties without your explicit consent.
                        </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => setDataPrivacyAnswer(true)}>
                        Agree, proceed to the survey
                    </Button>
                </Container>
            </Box>
        );
    }

    return <SurveyBlock />;
}
