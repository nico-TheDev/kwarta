import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';

export default function CommentInput({ formik, selectedFile, setSelectedFile, isEditing = true, comments }) {
    const inputRef = useRef(null);
    const hasSelectedFile = useRef(null);

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

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: {
                    lg: 'row',
                    xs: 'column'
                }
            }}
        >
            <TextField
                fullWidth
                id='outlined-multiline-flexible'
                label='Comment'
                name='comments'
                multiline
                rows={4}
                variant='outlined'
                value={formik?.values?.comments}
                onChange={formik.handleChange}
                disabled={!isEditing}
                defaultValue={comments}
            />
            <Button
                component='label'
                variant='contained'
                sx={{
                    height: {
                        lg: '100%',
                        xs: 200
                    },
                    width: {
                        lg: 150,
                        xs: '100%'
                    },
                    fontSize: 100,
                    ml: {
                        lg: 2,
                        xs: 0
                    },
                    mt: {
                        lg: 0,
                        xs: 2
                    },
                    p: 0,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative'
                }}
                disabled={!isEditing}
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
    );
}
