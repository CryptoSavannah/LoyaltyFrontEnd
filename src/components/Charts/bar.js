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
      backgroundColor: 'rgb(63, 81, 181, 0.8)',
      borderColor: 'rgb(63, 81, 181)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgb(63, 81, 181)',
      hoverBorderColor: 'rgb(63, 81, 181)',
      data: [65, 90, 80, 18, 20, 80]
    }
  ],
};

var options = {
  scales: {
      xAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          }
      }],
      yAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          }   
      }]
  }
}

export default function BarChart(){

    return (
        <Card>
            <CardContent style={{backgroundColor: '#fafafa'}}>
            <Typography>
                   Users 
            </Typography>
            <Bar data={data} options={options} />
            </CardContent>
        </Card>
    )
};