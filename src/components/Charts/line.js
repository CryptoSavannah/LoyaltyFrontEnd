
import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Monthly points awarded',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgb(148, 35, 145, 0.4)',
      borderColor: 'rgb(148, 35, 145, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgb(148, 35, 145, 1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgb(148, 35, 145, 1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 100, 140, 200, 400, 70, 150, 90, 250, 45, 80]
    },
    {
      label: 'Monthly points redeemed',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(111, 175, 0, 0.4)',
      borderColor: 'rgba(111, 175, 0, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(111, 175, 0, 1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(111, 175, 0, 1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [50, 40, 90, 50, 300, 35, 30, 60, 20, 130, 35, 70]
    }
  ]
};

var options = {
  legend: {
    labels: {
      fontColor: "white",
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: "rgba(0, 0, 0, 0)",
      },
      ticks: {
        fontColor: "white"
      }
    }],
    yAxes: [{
      gridLines: {
        color: "rgba(0, 0, 0, 0)",
      },
      ticks: {
        fontColor: "white"
      }
    }]
  }
}

export default function LineChart() {

  return (
    <Card>
      <CardContent style={{ backgroundColor: 'rgb(53, 63, 73)', color: '#fff' }}>
        <Typography>
          Points Awarded Monthly(In thousands)
                </Typography>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  )
};