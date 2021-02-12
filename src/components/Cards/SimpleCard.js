import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {BusinessCenter, CardGiftcard, Redeem, Loyalty}  from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    // justifyContent: 'center'
    alignSelf: 'center'

  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent style={{backgroundColor: props.color}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h3" component="h3">
          {props.figure}
        </Typography>
        <Typography variant="body2" component="p">
          {props.label}
        </Typography>
      </CardContent>
    </Card>
  );
}