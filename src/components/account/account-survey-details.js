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
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { getLanguage } from 'utils/getLanguage';

import { useAuthStore } from 'stores/useAuthStore';
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

const multiplesOfTen = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const AccountSurveyDetails = (props) => {
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const user = useAuthStore((state) => state.authState.user);
    const userSurvey = useAuthStore((state) => state.authState.userSurvey);
    const updateSurvey = useAuthStore((state) => state.updateSurvey);
    const getUser = useAuthStore((state) => state.getUser);

    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const [questionOne, setQuestionOne] = useState('');
    const [questionTwo, setQuestionTwo] = useState([]);
    const [questionThree, setQuestionThree] = useState({
        needs: 0,
        wants: 0,
        savings: 0,
        total: 0
    });

    const surveyList = [
        {
            id: 1,
            source: '/static/images/svg/survey-1.svg',
            question: 'What is your socioeconomic standing?',
            choices: [
                {
                    id: 8,
                    choice: 'H',
                    value: '8',
                    text: `I don't earn money / currently a student`,
                    min: 0,
                    max: 0
                },
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
            question: 'How you divide your money? \n (Paano ang pagkakahati-hati ng iyong pera?)',
            choices: [
                {
                    id: 1,
                    choice: 'A',
                    value: '1',
                    text: '50% Needs, 30% Wants, 20% Savings'
                },
                {
                    id: 2,
                    choice: 'B',
                    value: '2',
                    text: '40% Needs, 30% Wants, 30% Savings'
                },
                {
                    id: 3,
                    choice: 'C',
                    value: '3',
                    text: '60% Needs, 30% Wants, 10% Savings'
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
        setIsBtnDisabled(true);
        const firstAnswer = surveyList[0].choices.find((item) => item.value === questionOne);
        const secondAnswer = [];

        questionTwo.forEach((item) => {
            const found = premadeCategories.find((current) => current.category_name === item);
            if (found) secondAnswer.push(found);
        });

        updateSurvey({
            questionOne: firstAnswer,
            questionTwo: secondAnswer,
            questionThree
        })
            .then(() => {
                setIsBtnDisabled(false);
            })
            .catch((err) => console.error(err));
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const updated = { ...questionThree };
        updated[e.target.name] = value;

        let total = updated.needs + updated.wants + updated.savings;

        if (total > 100) {
            // console.log({ total });
            toast.error('Total is over 100. You might want to fix that.', { id: 'budget' });
        }
        if (total < 100) {
            // console.log({ total });
            toast.error('Total is less than 100. You might want to fix that.', { id: 'budget' });
        }
        if (total !== 100) {
            // console.log(Object.values(updated));
            // const keysName = Object.keys(updated);
            // let remaining = 100 - total;
            // const targetIndex = Object.values(updated).findIndex((item) => item <= 0);
            // if (targetIndex !== -1) {
            //     updated[keysName[targetIndex]] = remaining;
            // }
            // updated.total = updated.needs + updated.savings + updated.wants;
            // // console.log({ remaining });
        } else {
            console.log('100%');
        }

        // console.log(updated);
        setQuestionThree({ ...updated, total });
    };

    useEffect(() => {
        // console.log('SURVEY');
        // console.log({ userSurvey });
        setQuestionOne(userSurvey.salary.id);
        setQuestionTwo(userSurvey.priorities.map((item) => item.category_name));
        setQuestionThree(userSurvey.financeRule);
    }, []);

    return (
        <form autoComplete='off' noValidate {...props}>
            <Card>
                <CardHeader
                    subheader={getLanguage(currentLanguage).surveyDetailsHelper}
                    title={getLanguage(currentLanguage).surveyDetails}
                />
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
                            <Typography variant='body2' mb={4}>
                                Budgeting Finances
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
                                <FormControl>
                                    <InputLabel id='demo-simple-select-label'>Needs</InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={questionThree.needs}
                                        label='Choose Answer'
                                        onChange={handleChange}
                                        sx={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
                                        MenuProps={MenuProps}
                                        name='needs'
                                    >
                                        {multiplesOfTen.map((choice, i) => {
                                            return (
                                                <MenuItem key={choice} value={choice}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <ListItemText>{choice} %</ListItemText>
                                                    </Box>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id='demo-simple-select-label'>Wants</InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={questionThree.wants}
                                        label='Choose Answer'
                                        onChange={handleChange}
                                        sx={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
                                        MenuProps={MenuProps}
                                        name='wants'
                                    >
                                        {multiplesOfTen.map((choice, i) => {
                                            return (
                                                <MenuItem key={choice} value={choice}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <ListItemText>{choice} %</ListItemText>
                                                    </Box>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id='demo-simple-select-label'>Savings</InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={questionThree.savings}
                                        label='Choose Answer'
                                        onChange={handleChange}
                                        sx={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
                                        MenuProps={MenuProps}
                                        name='savings'
                                    >
                                        {multiplesOfTen.map((choice, i) => {
                                            return (
                                                <MenuItem key={choice} value={choice}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <ListItemText>{choice} %</ListItemText>
                                                    </Box>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
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
                        disabled={
                            !questionOne || questionTwo.length !== 3 || questionThree.total !== 100 || isBtnDisabled
                        }
                    >
                        {getLanguage(currentLanguage).saveDetails}
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
