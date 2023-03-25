import Head from 'next/head';
import {
    Box,
    Container,
    FormControl,
    Grid,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Typography
} from '@mui/material';
import PollIcon from '@mui/icons-material/PollOutlined';
import Carousel from 'react-material-ui-carousel';

import surveyOne from '../../public/static/images/svg/survey-1.svg';
import surveyTwo from '../../public/static/images/svg/survey-2.svg';
import surveyThree from '../../public/static/images/svg/survey-3.svg';
import surveyFour from '../../public/static/images/svg/survey-4.svg';

import { DashboardLayout } from '../components/dashboard-layout';
import Image from 'next/image';
import { Icon } from 'components/shared/Icon';

const surveyList = [
    {
        id: 1,
        source: surveyOne,
        question: 'What is your socioeconomic standing?',
        choices: [
            {
                id: 1,
                choice: 'A',
                value: '1',
                text: 'Less than ₱9,100'
            },
            {
                id: 2,
                choice: 'B',
                value: '2',
                text: 'Between ₱9,100 to ₱18,200'
            },
            {
                id: 3,
                choice: 'C',
                value: '3',
                text: 'Between ₱18,200 to ₱36,400'
            },
            {
                id: 4,
                choice: 'D',
                value: '4',
                text: 'Between ₱36,400 to ₱63,700'
            },
            {
                id: 5,
                choice: 'E',
                value: '5',
                text: 'Between ₱63,700 to ₱109,200'
            },
            {
                id: 6,
                choice: 'F',
                value: '6',
                text: 'Between ₱109,200 to ₱182,000'
            },
            {
                id: 7,
                choice: 'G',
                value: '7',
                text: 'At least ₱182,000 and up'
            }
        ],
        count: 1
    },

    {
        id: 2,
        source: surveyTwo,
        question: 'Choose three categories you prioritize when spending money',
        choices: ['A', 'B', 'C', 'D'],
        count: 1
    },

    {
        id: 3,
        source: surveyThree,
        question: 'What is your role in your family ?',
        choices: ['A', 'B', 'C', 'D'],
        count: 3
    },

    {
        id: 4,
        source: surveyFour,
        question: 'HELLO.',
        choices: ['A', 'B', 'C', 'D'],
        count: 4
    }
];

const Page = () => {
    const Item = ({ item }) => (
        <Paper p={4} sx={{ height: '50vh', p: 4 }}>
            <Typography variant='h6' mb={4}>
                {item.question}
            </Typography>
            <FormControl sx={{ width: '80%' }}>
                <InputLabel id='demo-simple-select-label'>Choose Answer</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value=''
                    label='Choose Answer'
                    onChange=''
                    sx={{ display: 'flex', alignItems: 'center' }}
                    defaultValue=''
                >
                    {item.choices.map((choice, i) => {
                        return (
                            <MenuItem key={choice.id} value={choice.value}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ListItemText>{choice.text}</ListItemText>
                                </Box>
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Paper>
    );

    return (
        <>
            <Head>
                <title>Initial Survey | CASH</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth='md'>
                    <Typography variant='h3' sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
                        Initial Survey
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ position: 'relative', width: '100%', height: { xs: 200, md: '100%' } }}>
                                <Image src={surveyTwo} alt='Image' layout='fill' />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Carousel
                                autoPlay={false}
                                animation='slide'
                                navButtonsAlwaysVisible
                                cycleNavigation={false}
                            >
                                {surveyList.map((item) => (
                                    <Item item={item} />
                                ))}
                            </Carousel>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Page;
