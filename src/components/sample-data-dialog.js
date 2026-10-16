import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { useAuthStore } from 'stores/useAuthStore';
import { useLanguageStore } from 'stores/useLanguageStore';
import { useSampleDataStore } from 'stores/useSampleDataStore';
import { getLanguage } from 'utils/getLanguage';

// ONE DIALOG FOR THE FIRST SIGN IN OFFER AND THE ACCOUNT MENU'S LOAD AND CLEAR CONFIRMATIONS
export default function SampleDataDialog() {
    const [isWorking, setIsWorking] = useState(false);

    const uid = useAuthStore((state) => state.authState?.user?.uid);
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const dialogMode = useSampleDataStore((state) => state.dialogMode);
    const closeDialog = useSampleDataStore((state) => state.closeDialog);
    const loadSampleData = useSampleDataStore((state) => state.loadSampleData);
    const clearUserData = useSampleDataStore((state) => state.clearUserData);
    const skipSampleData = useSampleDataStore((state) => state.skipSampleData);

    const text = getLanguage(currentLanguage || 'en');

    const content = {
        welcome: { title: text.sampleWelcomeTitle, body: text.sampleWelcomeBody },
        load: { title: text.sampleLoadTitle, body: text.sampleLoadBody },
        clear: { title: text.sampleClearTitle, body: text.sampleClearBody }
    }[dialogMode];

    const run = async (action) => {
        setIsWorking(true);
        await action(uid);
        setIsWorking(false);
        closeDialog();
    };

    // THE WELCOME OFFER COUNTS AS ANSWERED HOWEVER IT IS CLOSED
    const handleDismiss = () => {
        if (isWorking) return;
        if (dialogMode === 'welcome') {
            run(skipSampleData);
        } else {
            closeDialog();
        }
    };

    return (
        <Dialog open={Boolean(content)} onClose={handleDismiss} maxWidth='xs' fullWidth>
            <DialogTitle>{content?.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content?.body}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleDismiss} disabled={isWorking}>
                    {dialogMode === 'welcome' ? text.startEmpty : text.cancel}
                </Button>
                {dialogMode === 'clear' ? (
                    <Button variant='contained' color='error' onClick={() => run(clearUserData)} disabled={isWorking}>
                        {text.clearAllData}
                    </Button>
                ) : (
                    <Button variant='contained' onClick={() => run(loadSampleData)} disabled={isWorking}>
                        {text.loadSampleData}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
