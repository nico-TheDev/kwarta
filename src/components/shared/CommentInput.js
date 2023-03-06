import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';

export default function CommentInput({ formik, selectedFile, setSelectedFile }) {
    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (e.target.files?.length) {
            const fileSrc = URL.createObjectURL(file);
            setSelectedFile({ source: fileSrc, file });
            // console.log(e.target.files);
        } else {
            setSelectedFile(null);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                fullWidth
                id='outlined-multiline-flexible'
                label='Comment'
                name='comments'
                multiline
                rows={4}
                variant='outlined'
                value={formik.values.comments}
                onChange={formik.handleChange}
            />
            <Button
                component='label'
                variant='contained'
                sx={{
                    height: '100%',
                    width: 150,
                    fontSize: 100,
                    ml: 2,
                    p: 0,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                {selectedFile?.source ? (
                    <Box sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                        <img
                            src={selectedFile.source}
                            alt=''
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                objectFit: 'fill'
                            }}
                        />
                    </Box>
                ) : (
                    <AddPhotoIcon fontSize='inherit' />
                )}
                <input type='file' hidden onChange={handleFileSelect} accept='image/*' />
            </Button>
        </Box>
    );
}
