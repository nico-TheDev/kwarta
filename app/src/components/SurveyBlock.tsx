'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    Link,
    ListItemText,
    MenuItem,
    MobileStepper,
    Paper,
    Select,
    Typography
} from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useAuthStore } from 'stores/useAuthStore';
import { auth } from '../../firebase.config';

import Image from 'next/image';
import premadeCategories from 'data/categories';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
        sx: {
            maxHeight: 280
        }
    }
};

const questionTypographySx = { whiteSpace: 'pre-line' };

const formControlStyle = {
    width: {
        xs: '100%',
        md: '80%'
    }
};

const multiplesOfTen = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const surveyList = [
    {
        id: 1,
        source: '/static/images/svg/survey-1.svg',
        question: 'What is your monthly salary? \n (Ano ang iyong buwanang sweldo?)',
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
        question:
            'Choose categories you prioritize when spending money \n (Select 3) \n (Ito ang mga kategoryang binibigyan mong prayoridad sa paggastos ng pera.)',
        choices: categories,
        count: 1
    },

    {
        id: 3,
        source: '/static/images/svg/survey-3.svg',
        question: `How do you budget your finances? \n (Paano ang pagkakahati-hati o pag-bubudget ng iyong pera?) 
        `,
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

export default function SurveyBlock() {
    const router = useRouter();
    const [questionOne, setQuestionOne] = useState('');
    const [questionTwo, setQuestionTwo] = useState([]);
    const [questionThree, setQuestionThree] = useState({
        needs: 0,
        wants: 0,
        savings: 0,
        total: 0
    });
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const user = useAuthStore((state) => state.authState.user);
    const [isDone, setIsDone] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [authReady, setAuthReady] = useState(false);
    const [firebaseUid, setFirebaseUid] = useState<string | undefined>();
    const [authChecked, setAuthChecked] = useState(false);
    const manageSurvey = useAuthStore((state) => state.manageSurvey);
    const skipSurvey = useAuthStore((state) => state.skipSurvey);
    const stepCount = 3;

    const uid = user?.uid ?? firebaseUid ?? auth?.currentUser?.uid;

    useEffect(() => {
        const finishHydration = () => setAuthReady(true);
        if (useAuthStore.persist.hasHydrated()) {
            finishHydration();
        }
        return useAuthStore.persist.onFinishHydration(finishHydration);
    }, []);

    useEffect(() => {
        if (!authReady) return;
        if (!auth) {
            setAuthChecked(true);
            return;
        }
        return onAuthStateChanged(auth, (firebaseUser) => {
            setFirebaseUid(firebaseUser?.uid);
            setAuthChecked(true);
        });
    }, [authReady]);

    useEffect(() => {
        if (!authReady || !authChecked) return;
        if (!uid) {
            toast.error('Please log in to complete the survey.');
            router.replace('/login');
        }
    }, [authReady, authChecked, uid, router]);

    const handleSubmit = async () => {
        if (!uid) {
            toast.error('Please log in to complete the survey.');
            router.replace('/login');
            return;
        }

        setIsBtnDisabled(true);
        const firstAnswer = surveyList[0].choices.find((item) => questionOne === item.value);
        const secondAnswer = [];

        questionTwo.forEach((item) => {
            const found = premadeCategories.find((current) => current.category_name === item);
            if (found) secondAnswer.push(found);
        });

        try {
            await manageSurvey(
                {
                    questionOne: firstAnswer,
                    questionTwo: secondAnswer,
                    questionThree
                },
                uid
            );
            setIsDone(true);

            setTimeout(() => {
                router.push('/accounts');
            }, 5000);
        } catch {
            setIsBtnDisabled(false);
        }
    };

    const handleSkip = async () => {
        if (!uid) {
            toast.error('Please log in to continue.');
            router.replace('/login');
            return;
        }

        setIsBtnDisabled(true);
        try {
            await skipSurvey(uid);
            router.push('/dashboard');
        } catch {
            setIsBtnDisabled(false);
        }
    };

    const handleChange = (e) => {
        const value = Number(e.target.value);
        const updated = { ...questionThree };
        updated[e.target.name] = value;

        const total = updated.needs + updated.wants + updated.savings;

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

    if (!authReady || (!authChecked && !uid)) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            {isDone && (
                <Paper
                    sx={{
                        background: 'white',
                        position: 'absolute',
                        p: 3,
                        textAlign: 'center',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        zIndex: 90999,
                        height: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        width: {
                            md: '50%',
                            xs: '80%'
                        }
                    }}
                    elevation={20}
                >
                    <Typography variant='h5'>
                        <Typography sx={{ fontSize: 120 }}>😊</Typography>
                        You finished the survey 🎉
                        <br />
                        You will now be redirected to the main dashboard.{' '}
                    </Typography>
                </Paper>
            )}
            <Container maxWidth='md'>
                <Typography variant='h3' sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
                    Initial Survey
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'relative', width: '100%', minHeight: { xs: 200, md: 360 } }}>
                            <Image
                                src={surveyList[activeStep].source}
                                alt='Survey illustration'
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes='(max-width: 900px) 100vw, 33vw'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        {activeStep === 0 && (
                            <Paper sx={{ minHeight: { xs: 'auto', md: '50vh' }, p: 4 }}>
                                <Typography variant='h6' mb={2}>
                                    Socio-economic Standing
                                </Typography>
                                <Typography variant='h6' mb={4} sx={questionTypographySx}>
                                    {surveyList[0].question}
                                </Typography>
                                <Box mb={2}>
                                    <Link
                                        href='https://www.imoney.ph/articles/middle-class-sector-philippines'
                                        target='_blank'
                                    >
                                        <Typography color='textSecondary' variant='caption'>
                                            Source: IMoney PH{' '}
                                        </Typography>
                                    </Link>
                                </Box>
                                <FormControl sx={formControlStyle}>
                                    <InputLabel id='survey-salary-label'>Choose Answer</InputLabel>
                                    <Select
                                        labelId='survey-salary-label'
                                        id='survey-salary-select'
                                        value={questionOne}
                                        label='Choose Answer'
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setQuestionOne(value);
                                        }}
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        MenuProps={MenuProps}
                                    >
                                        {surveyList[0].choices.map((choice, i) => {
                                            return (
                                                <MenuItem key={`salary-${choice.value}`} value={choice.value}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <ListItemText>{choice.text}</ListItemText>
                                                    </Box>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Paper>
                        )}

                        {activeStep === 1 && (
                            <Paper sx={{ minHeight: { xs: 'auto', md: '50vh' }, p: 4 }}>
                                <Typography variant='h6' mb={4} sx={questionTypographySx}>
                                    {surveyList[1].question}
                                </Typography>
                                <FormControl sx={formControlStyle}>
                                    <InputLabel id='survey-priority-label'>Choose Answer</InputLabel>
                                    <Select
                                        labelId='survey-priority-label'
                                        id='survey-priority-select'
                                        value={questionTwo}
                                        label='Choose Answer'
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
                                                <MenuItem key={`priority-${choice.id}-${i}`} value={choice.text}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <ListItemText>{choice.text}</ListItemText>
                                                    </Box>
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Paper>
                        )}

                        {activeStep === 2 && (
                            <Paper sx={{ minHeight: { xs: 'auto', md: '50vh' }, p: 4 }}>
                                <Typography variant='h6' mb={4} sx={questionTypographySx}>
                                    {surveyList[2].question}
                                </Typography>
                                <Typography variant='body1' color='text.secondary' mb={4}>
                                    Example: 50% Needs, 30% Wants, 20% Savings (total must equal 100%)
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-start' }}>
                                    <FormControl sx={{ minWidth: 120 }}>
                                        <InputLabel id='survey-needs-label'>Needs</InputLabel>
                                        <Select
                                            labelId='survey-needs-label'
                                            id='survey-needs-select'
                                            value={questionThree.needs}
                                            label='Needs'
                                            onChange={handleChange}
                                            sx={{ display: 'flex', alignItems: 'center' }}
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
                                    <FormControl sx={{ minWidth: 120 }}>
                                        <InputLabel id='survey-wants-label'>Wants</InputLabel>
                                        <Select
                                            labelId='survey-wants-label'
                                            id='survey-wants-select'
                                            value={questionThree.wants}
                                            label='Wants'
                                            onChange={handleChange}
                                            sx={{ display: 'flex', alignItems: 'center' }}
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
                                    <FormControl sx={{ minWidth: 120 }}>
                                        <InputLabel id='survey-savings-label'>Savings</InputLabel>
                                        <Select
                                            labelId='survey-savings-label'
                                            id='survey-savings-select'
                                            value={questionThree.savings}
                                            label='Savings'
                                            onChange={handleChange}
                                            sx={{ display: 'flex', alignItems: 'center' }}
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
                                <Typography variant='body2' sx={{ mt: 2 }} color='text.secondary'>
                                    Total: {questionThree.total}%
                                </Typography>
                            </Paper>
                        )}

                        <MobileStepper
                            variant='dots'
                            steps={stepCount}
                            position='static'
                            activeStep={activeStep}
                            sx={{ mt: 3, background: 'transparent', flexGrow: 1 }}
                            nextButton={
                                <Button
                                    size='small'
                                    onClick={() => setActiveStep((s) => Math.min(s + 1, stepCount - 1))}
                                    disabled={activeStep === stepCount - 1}
                                >
                                    Next
                                    <KeyboardArrowRight />
                                </Button>
                            }
                            backButton={
                                <Button
                                    size='small'
                                    onClick={() => setActiveStep((s) => Math.max(s - 1, 0))}
                                    disabled={activeStep === 0}
                                >
                                    <KeyboardArrowLeft />
                                    Back
                                </Button>
                            }
                        />

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
                            <Button
                                variant='contained'
                                size='large'
                                sx={{ width: '80%' }}
                                disabled={
                                    !uid ||
                                    !questionOne ||
                                    questionTwo.length !== 3 ||
                                    questionThree.total !== 100 ||
                                    isBtnDisabled
                                }
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <Button
                                variant='text'
                                color='inherit'
                                disabled={!uid || isBtnDisabled}
                                onClick={handleSkip}
                            >
                                Skip for now
                            </Button>
                            <Typography variant='caption' color='text.secondary' sx={{ textAlign: 'center', maxWidth: 360 }}>
                                You can complete the survey later from your profile settings.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
