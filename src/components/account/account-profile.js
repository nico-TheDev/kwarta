import { useState, useEffect, useRef } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { useAuthStore } from 'stores/useAuthStore';
import { getLanguage } from 'utils/getLanguage';

export const AccountProfile = (props) => {
    const [selectedFile, setSelectedFile] = useState('');

    const user = useAuthStore((state) => state.authState.user);
    const updateUserPhoto = useAuthStore((state) => state.updateUserPhoto);

    const inputRef = useRef(null);
    const hasSelectedFile = useRef(null);

    // FILES
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

    const handleSubmit = () => {
        updateUserPhoto(selectedFile?.file, user.name);
    };

    return (
        <Card {...props}>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={selectedFile ? selectedFile.source : user?.photo}
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    />
                    <Typography color='textPrimary' gutterBottom variant='h5'>
                        {user?.name}
                    </Typography>
                    <Typography color='textSecondary' variant='body2'>
                        {user?.email}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: 'flex', gap: 2 }}>
                <Button color='primary' fullWidth variant='outlined' component='label'>
                    {getLanguage().uploadPicture}
                    <input
                        id='choosePic'
                        type='file'
                        onChange={handleFileSelect}
                        onClick={handleFileClick}
                        accept='image/*'
                        ref={inputRef}
                        hidden
                    />
                </Button>
                <Button
                    color='primary'
                    fullWidth
                    variant='contained    '
                    onClick={handleSubmit}
                    disabled={!selectedFile}
                >
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
};
