import React from 'react';
import {Bar} from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const data = {
  labels: ['February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Users Breakdown',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 90, 80, 18, 20, 80]
    }
  ]
};

export default function BarChart(){

    return (
        <Card>
            <CardContent>
            <Typography>
                   Users 
            </Typography>
            <Bar data={data} />
            </CardContent>
        </Card>
    )
};