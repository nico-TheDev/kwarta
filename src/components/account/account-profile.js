import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import { useAuthStore } from 'stores/useAuthStore'
import { getLanguage } from 'utils/getLanguage'

export const AccountProfile = (props) => {
    const user = useAuthStore((state) => state.authState.user)

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
                        src={user.photo}
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    />
                    <Typography color='textPrimary' gutterBottom variant='h5'>
                        {user.name}
                    </Typography>
                    <Typography color='textSecondary' variant='body2'>
                        {user.email}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button color='primary' fullWidth variant='text'>
                    {getLanguage().uploadPicture}
                </Button>
            </CardActions>
        </Card>
    )
}
