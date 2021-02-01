import React from 'react';
import {Radar} from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const data = {
  labels: ['Bar Soap', 'Lato Milk', 'Cooking Oil', 'Toilet Paper', 'Wheat Flour', 'Gorillos', 'CocaCola'],
  datasets: [
    {
      label: 'Most Purchased Products',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 70, 90, 81, 85, 30, 60]
    },
  ]
};

export default function RadarChart(){

    return (
      <Card>
        <CardContent>
            <Typography>
                Most Purchased Products
            </Typography>
            <Radar data={data} />
        </CardContent>
      </Card>
    );
};