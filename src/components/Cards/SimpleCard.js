import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BusinessCenter, Group, Redeem, Loyalty, GroupWork, Spa, ThumbsUpDown, TrendingUp } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: 10,
  },
  title: {
    fontSize: 12,
    alignSelf: 'center',
    color: 'white'
  },
  title2: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'black'
  },
  pos: {
    marginBottom: 12,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    color: 'white'
  },
  cover: {
    width: '40%',
    alignSelf: 'center',
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    // <Card className={classes.root}>
    //   <CardContent style={{ backgroundColor: props.color }}>
    //     <Typography className={classes.title} color="textSecondary" gutterBottom>
    //       {props.name}
    //     </Typography>
    //     <Typography variant="h3" component="h3">
    //       {props.figure}
    //     </Typography>
    //     <Typography variant="body2" component="p">
    //       {props.label}
    //     </Typography>
    //   </CardContent>
    // </Card>
    <Card className={classes.root} style={{backgroundColor: props.color}}>
      <div className={classes.cover}>
        {props.icon === 'BusinessCenter' && <BusinessCenter fontSize="large" style={{ color: '#fff' }}/>}
        {props.icon === 'Group' && <Group fontSize="large" style={{ color: '#fff' }}/>}
        {props.icon === 'Redeem' && <Redeem fontSize="large" style={{ color: '#fff' }}/>}
        {props.icon === 'Loyalty' && <Loyalty fontSize="large" style={{ color: '#fff' }}/>}
        {props.icon === 'GroupWork' && <GroupWork fontSize="large" style={{ color: '#fff' }}/>}
        {props.icon === 'TrendingUp' && <TrendingUp fontSize="large" style={{ color: '#fff' }}/>}

      </div>
      <div className={classes.details}>
        <Typography color="textSecondary" className={classes.title}  gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h3" component="h3">
          {props.figure}
        </Typography>
        {/* <Typography variant="body2" component="p">
          {props.label}
        </Typography> */}
      </div>
    </Card>
  );
}