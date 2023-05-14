import { useState, useEffect } from 'react'
import { 
    Card, 
    CardContent, 
    CardHeader, 
    Divider, 
    Box,
    Button,
    Chip,
    Container,
    FormControl,
    Grid,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Typography } from '@mui/material'
import { getLanguage } from 'utils/getLanguage'
import { useFormik } from 'formik';

import { useAuthStore } from 'stores/useAuthStore'
import { useLanguageStore } from 'stores/useLanguageStore';

import premadeCategories from '../../data/categories';

const categories = premadeCategories
    .filter((item) => item.category_type === 'expense')
    .map((item) => ({
        id: item.id,
        choice: item.category_name,
        value: item.id,
        text: item.category_name
    }));

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 150,
                width: 250
            }
        }
    };

export const AccountSurveyDetails = (props) => {
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const user = useAuthStore((state) => state.authState.user);
    const userSurvey = useAuthStore((state) => state.authState.userSurvey);
    const updateSurvey = useAuthStore((state) => state.updateSurvey);
    const getUser = useAuthStore((state) => state.getUser);

    const [questionOne, setQuestionOne] = useState('');
    const [questionTwo, setQuestionTwo] = useState([]);
    const [questionThree, setQuestionThree] = useState('');

    const surveyList = [
        {
            id: 1,
            source: '/static/images/svg/survey-1.svg',
            question: 'What is your socioeconomic standing?',
            choices: [
                {
                    id: 1,
                    choice: 'A',
                    value: '1',
                    text: 'Less than ₱9,100',
                    min: 0,
                    max: 9100
                },
                {
                    id: 2,
                    choice: 'B',
                    value: '2',
                    text: 'Between ₱9,100 to ₱18,200',
                    min: 9100,
                    max: 18200
                },
                {
                    id: 3,
                    choice: 'C',
                    value: '3',
                    text: 'Between ₱18,200 to ₱36,400',
                    min: 18200,
                    max: 36400
                },
                {
                    id: 4,
                    choice: 'D',
                    value: '4',
                    text: 'Between ₱36,400 to ₱63,700',
                    min: 36400,
                    max: 63700
                },
                {
                    id: 5,
                    choice: 'E',
                    value: '5',
                    text: 'Between ₱63,700 to ₱109,200',
                    min: 63700,
                    max: 109200
                },
                {
                    id: 6,
                    choice: 'F',
                    value: '6',
                    text: 'Between ₱109,200 to ₱182,000',
                    min: 109200,
                    max: 182000
                },
                {
                    id: 7,
                    choice: 'G',
                    value: '7',
                    text: 'At least ₱182,000 and up',
                    min: 182000,
                    max: 0
                }
            ],
            count: 1
        },

        {
            id: 2,
            source: '/static/images/svg/survey-2.svg',
            question: 'Choose categories you prioritize when spending money \n (Select 3)',
            choices: categories,
            count: 1
        },

        {
            id: 3,
            source: '/static/images/svg/survey-3.svg',
            question: 'Are you the breadwinner in your family ?',
            choices: [
                {
                    id: 1,
                    choice: 'A',
                    value: '1',
                    text: 'Yes'
                },
                {
                    id: 1,
                    choice: 'B',
                    value: '2',
                    text: 'No'
                }
            ],
            count: 3
        },

        {
            id: 4,
            source: '/static/images/svg/survey-4.svg',
            question: 'HELLO.',
            choices: ['A', 'B', 'C', 'D'],
            count: 4,
            isMultiple: false,
            value: ''
        }
    ];
    // console.log(questionThree);
    const handleSubmit = () => {
        const firstAnswer = surveyList[0].choices.find((item) => questionOne === item.value);
        const thirdAnswer = surveyList[2].choices.find((item) => questionThree === item.value);
        const secondAnswer = [];

        questionTwo.forEach((item) => {
            const found = premadeCategories.find((current) => current.category_name === item);
            if (found) secondAnswer.push(found);
        });

        updateSurvey({
            questionOne: firstAnswer,
            questionTwo: secondAnswer,
            questionThree: thirdAnswer
        });
    };

    useEffect(() => {
        console.log('SURVEY');
        console.log(userSurvey);
        setQuestionOne(userSurvey.salary.id);
        setQuestionTwo(userSurvey.priorities.map((item) => item.category_name));
        setQuestionThree(userSurvey.isBreadwinner.value);
    }, []);

    return (
        <form autoComplete='off' noValidate {...props}>
            <Card>
                <CardHeader subheader={getLanguage(currentLanguage).surveyDetailsHelper} title={getLanguage(currentLanguage).surveyDetails} />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <FormControl sx={{ width: '80%' }}>
                                <InputLabel id='demo-simple-select-label'>Socioeconomic Standing</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={questionOne}
                                    label='Answer'
                                    defaultValue=''
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setQuestionOne(value);
                                    }}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    MenuProps={MenuProps}
                                >
                                    {surveyList[0].choices.map((choice, i) => {
                                        return (
                                            <MenuItem key={choice.id + i} value={choice.value}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ListItemText>{choice.text}</ListItemText>
                                                </Box>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <FormControl sx={{ width: '80%' }}>
                                <InputLabel id='demo-simple-select-label'>Priority Categories</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={questionTwo}
                                    label='Priority Categories'
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setQuestionTwo(typeof value === 'string' ? value.split(',') : value);
                                    }}
                                    renderValue={(selected) => {
                                        return (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        );
                                    }}
                                    multiple
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    MenuProps={MenuProps}
                                >
                                    {surveyList[1].choices.map((choice, i) => {
                                        return (
                                            <MenuItem key={choice.id + i} value={choice.text}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ListItemText>{choice.text}</ListItemText>
                                                </Box>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <FormControl sx={{ width: '80%' }}>
                                <InputLabel id='demo-simple-select-label'>Breadwinner Status</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={questionThree}
                                    label='Answer'
                                    defaultValue=''
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setQuestionThree(value);
                                    }}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    MenuProps={MenuProps}
                                >
                                    {surveyList[2].choices.map((choice, i) => {
                                        return (
                                            <MenuItem key={choice.id + i} value={choice.value}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ListItemText>{choice.text}</ListItemText>
                                                </Box>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={handleSubmit}
                        disabled={!questionOne || questionTwo.length !== 3 || !questionThree}
                    >
                        {getLanguage(currentLanguage).saveDetails}
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
