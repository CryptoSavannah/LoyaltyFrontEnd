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
    // padding: 10,
    // backgroundColor: '#e8ebee'
  },
  title: {
    fontSize: 12,
    alignSelf: 'center',
    // color: 'white'
  },
  title2: {
    // fontSize: 16,
    alignSelf: 'center',
    color: 'white'
  },
  pos: {
    marginBottom: 12,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    // color: 'white'
  },
  cover: {
    width: '40%',
    alignSelf: 'center',
  },
  label2: {
    padding: 20
  },
  figure: {
    // fontSize: 18,
    fontWeight: 'bold'
  }
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
    <Card className={classes.root} style={{ flexDirection: 'column' }} >
      <Typography variant="body2" component="p" style={{textAlign: 'left', paddingLeft: 5}}>
        {props.name}
      </Typography>
      <div style={{ color: props.color, paddingTop: 10, paddingBottom: 10 }}>
        <Typography variant="h4" component="h4" className={classes.figure}>
          {props.figure}
        </Typography>
      </div>
      <div >
        {props.icon === 'BusinessCenter' && <BusinessCenter fontSize="small" style={{ color: props.color }} />}
        {props.icon === 'Group' && <Group fontSize="small" style={{ color: props.color }} />}
        {props.icon === 'Redeem' && <Redeem fontSize="small" style={{ color: props.color }} />}
        {props.icon === 'Loyalty' && <Loyalty fontSize="small" style={{ color: props.color }} />}
        {props.icon === 'GroupWork' && <GroupWork fontSize="small" style={{ color: props.color }} />}
        {props.icon === 'TrendingUp' && <TrendingUp fontSize="small" style={{ color: props.color }} />}
        {/* {props.icon === 'BusinessCenter' && <BusinessCenter fontSize="large" style={{ color: '#f5a310' }} />}
        {props.icon === 'Group' && <Group fontSize="large" style={{ color: '#3f51b5' }} />}
        {props.icon === 'Redeem' && <Redeem fontSize="large" style={{ color: '#353f49' }} />}
        {props.icon === 'Loyalty' && <Loyalty fontSize="large" style={{ color: '#942391' }} />}
        {props.icon === 'GroupWork' && <GroupWork fontSize="large" style={{ color: 'rgb(231,67,133)' }} />}
        {props.icon === 'TrendingUp' && <TrendingUp fontSize="large" style={{ color: '#052e83' }} />} */}

      </div>
      <div className={classes.label2} style={{ backgroundColor: props.color }}>
        <Typography className={classes.title2} gutterBottom>
          {props.name}
        </Typography>
      </div>
    </Card>
    //   <Card className={classes.root} style={{backgroundColor: props.color}}>
    //   <div className={classes.cover}>
    //     {props.icon === 'BusinessCenter' && <BusinessCenter fontSize="large" style={{color: '#fff'}}/>}
    //     {props.icon === 'Group' && <Group fontSize="large" style={{color: '#fff'}}/>}
    //     {props.icon === 'Redeem' && <Redeem fontSize="large" style={{color: '#fff'}}/>}
    //     {props.icon === 'Loyalty' && <Loyalty fontSize="large" style={{color: '#fff'}}/>}
    //     {props.icon === 'GroupWork' && <GroupWork fontSize="large" style={{color: '#fff'}}/>}
    //     {props.icon === 'TrendingUp' && <TrendingUp fontSize="large" style={{color: '#fff'}}/>}

    //   </div>
    //   <div className={classes.details}>
    //   <Typography variant={props.name==="All Programs" ? "h4" : "h3"} component={props.name==="All Programs" ? "h4" : "h3"}>
    //       {props.figure}
    //     </Typography>
    //     <Typography color="textSecondary" className={props.name==="All Programs" ? classes.title2 : classes.title}  gutterBottom>
    //       {props.name}
    //     </Typography>

    //     {/* <Typography variant="body2" component="p">
    //       {props.label}
    //     </Typography> */}
    //   </div>
    // </Card>
  );
}