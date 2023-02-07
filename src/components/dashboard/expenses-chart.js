import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import FoodIcon from '@mui/icons-material/FoodBank';
import HealthIcon from '@mui/icons-material/HealthAndSafety';
import GymIcon from '@mui/icons-material/SportsBar';
import BillsIcon from '@mui/icons-material/ElectricBolt';

export const ExpensesChart = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [30, 15, 15, 40],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', "#2ecc71"],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Food', 'Health', 'Gym', 'Bills']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Food',
      value: 30,
      icon: FoodIcon,
      color: '#3F51B5'
    },
    {
      title: 'Health',
      value: 15,
      icon: HealthIcon,
      color: '#E53935'
    },
    {
      title: 'Gym',
      value: 15,
      icon: GymIcon,
      color: '#FB8C00'
    },
    {
      title: 'Bills',
      value: 40,
      icon: BillsIcon,
      color: '#2ecc71'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Expenses" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h5"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
