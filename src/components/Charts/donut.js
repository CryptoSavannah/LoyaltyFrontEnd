import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const data = {
	labels: [
		'Bar Soap',
		'Lato Milk',
        'Kakira Sugar',
        'Eggs'
	],
	datasets: [{
		data: [3, 6, 3, 1],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
        '#FFCE56',
        '#FADE76'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
        '#FFCE56',
        '#FADE76'
		]
	}]
};

export default function Donut(){

    return (
      <Card>
        <CardContent>
            <Typography>
                Most Purchased Products
            </Typography>
            <Doughnut data={data} />
        </CardContent>
      </Card>
    );
};