import React, { useState, useEffect, useContext } from 'react';
import MiniDrawer from '../components/Drawer/Drawer';
import PlainNavInfo from '../components/Nav/PlainNavInfo'
import SimpleCard from '../components/Cards/SimpleCard2'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SimpleTable from '../components/Tables/SimpleTable';
import { makeStyles } from '@material-ui/core/styles';
import LineChart from '../components/Charts/line';
import BarChart from '../components/Charts/bar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { getPrograms } from '../services/programs';
import { getLoyaltyTransactions } from '../services/program_transactions';
import { getLoyaltyUsers } from '../services/accounts';
import { SnackbarContext } from '../context/SnackbarContext';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    margin: -12
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  dashContent: {
    // flexDirection: 'row'
  },
  leftContent: {
    flex: 0,
    // flexDirection: 'column',
    backgroundColor: '#252525'
  },
  rightContent: {
    flex: 1
  },
  title: {
    color: '#3f51b5',
    fontWeight: 'bold',
    alignItems: 'center'
  }
}));

const token = localStorage.getItem("token");

export const Dashboard = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // console.log('selectedDate: ', selectedDate);
  };
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    // console.log('selectedDate2: ', selectedDate2);
  };
  const { snack, setSnack } = useContext(SnackbarContext);
  const classes = useStyles();
  const [loadingPrograms, setLoadingPrograms] = useState(true)
  const [loadingTotalUsers, setLoadingTotalUsers] = useState(true)
  const [loadingTTAwardeded, setLoadingTTAwardeded] = useState(true)
  const [loadingTTRedeemed, setLoadingTTRedeemed] = useState(true)

  const [allPrograms, setAllPrograms] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [pointsAwardeded, setPointsAwardeded] = useState(0)
  const [pointsRedeemed, setPointsRedeemed] = useState(0)

  useEffect(() => {

    const fetchedTotalUsers = async () => {
      setTotalUsers((await getLoyaltyUsers()).length);
      // setTotalUsers((await getLoyaltyUsers(selectedDate, selectedDate2)).length);
      setLoadingPrograms(false);
    }

    const fetchedPrograms = async () => {
      setAllPrograms((await getPrograms()).length);
      // setAllPrograms((await getPrograms(selectedDate, selectedDate2)).length);
      setLoadingTotalUsers(false);

    }
    const fetchedPointsRedeemed = async () => {
      // setPointsRedeemed(await getPrograms());
      // console.log('users: ' + await getLoyaltyUsers())
      setLoadingTTRedeemed(false);

    }
    const fetchedPointsAwardeded = async () => {
      // setPointsAwardeded(await getPrograms());
      // console.log('users: ' + await getLoyaltyUsers())
      setLoadingTTAwardeded(false);

    }

    fetchedTotalUsers().then(() => {
      console.log('users after: ', totalUsers)
    });
    fetchedPrograms();
    fetchedPointsAwardeded();
    fetchedPointsRedeemed();

    // if(totalUsers.status){
    //   if(totalUsers.status.toString() === "500"){
    //     setSnack({ message: 'Server Error', open: true })
    //   }
    //   else{
    //     setSnack({ message: 'successfuly loaded data', open: true })
    //   }
    // }

  }, [allPrograms, pointsAwardeded, totalUsers, pointsRedeemed])

  return (
    <div className={classes.root}>
      <MiniDrawer props={props} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <div className={[classes.dashContent, 'row']}>
          <div className={[classes.leftContent, 'col-lg-4']}>
            {loadingPrograms ? <SimpleCard name="All Programs" figure={'...'} label="all programs" icon={'BusinessCenter'} /> :
              <SimpleCard name="All Programs" figure={allPrograms} label="all programs" icon={'BusinessCenter'} />
            }
            {loadingTotalUsers ? <SimpleCard name="Total Users" figure={'...'} label="Total Users" icon={'Group'} /> :
              <SimpleCard name="Total Users" figure={totalUsers} label="all users" icon={'Group'} />
            }
            {loadingTTAwardeded ? <SimpleCard name="Total Points Awarded" figure={'...'} label="Total Points Awarded" icon={'Loyalty'} /> :
              <SimpleCard name="Total Points Awarded" figure={pointsAwardeded} label="total Points Awarded" icon={'Loyalty'} />
            }
            {loadingTTRedeemed ? <SimpleCard name="Total Points Redeemed" figure={'...'} label="Total Points Redeemed" icon={'Redeem'} /> :
              <SimpleCard name="Total Points Redeemed" figure={pointsRedeemed} label="total points redeemed" icon={'Redeem'} />
            }
          </div>
          <div className={[classes.rightContent, 'col-lg-8']}>
          <LineChart />
          </div>
        </div> */}
        {/* <Grid container spacing={3} justify="center" alignItems="stretch" alignContent="stretch">
        <Grid item xs={12} sm={6} md={4} lg={4}><div className={[]}>
            {loadingPrograms ? <SimpleCard name="All Programs" figure={'...'} label="all programs" icon={'BusinessCenter'} /> :
              <SimpleCard name="All Programs" figure={allPrograms} label="all programs" icon={'BusinessCenter'} />
            }
            {loadingTotalUsers ? <SimpleCard name="Total Users" figure={'...'} label="Total Users" icon={'Group'} /> :
              <SimpleCard name="Total Users" figure={totalUsers} label="all users" icon={'Group'} />
            }
            {loadingTTAwardeded ? <SimpleCard name="Total Points Awarded" figure={'...'} label="Total Points Awarded" icon={'Loyalty'} /> :
              <SimpleCard name="Total Points Awarded" figure={pointsAwardeded} label="total Points Awarded" icon={'Loyalty'} />
            }
            {loadingTTRedeemed ? <SimpleCard name="Total Points Redeemed" figure={'...'} label="Total Points Redeemed" icon={'Redeem'} /> :
              <SimpleCard name="Total Points Redeemed" figure={pointsRedeemed} label="total points redeemed" icon={'Redeem'} />
            }
          </div></Grid>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Grid item >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-end" style={{ color: "#fff" }}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="From Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                InputProps={{ style: {
                  color: "#fff",
                  fontSize: 12},
                  shrink: true
                 }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color: "#fff",
                      fontSize: 12 }
                  }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="To Date"
                format="MM/dd/yyyy"
                value={selectedDate2}
                onChange={handleDateChange2}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          </Grid>
          <LineChart />
          </Grid>
        </Grid> */}
        {/* <Card> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ backgroundColor: "#fff", paddingTop: -12 }}>
          <Grid container justify="center" spacing={3} style={{paddingBottom: 10}} >
            <Grid item item xs={12} sm={6} md={3} lg={3} style={{alignSelf: 'center'}} >
              <Typography className={classes.title}>
                Store Summary
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} item ></Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} item>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Start Date"
                format="dd/MMM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                InputProps={{
                  style: {
                    // color: "#fff",
                    // fontSize: 12
                  },
                  shrink: true
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    // color: "#fff",
                    fontSize: 14
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} item>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End Date"
                format="dd/MMM/yyyy"
                value={selectedDate2}
                onChange={handleDateChange2}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                InputProps={{
                  style: {
                    // color: "#fff",
                    // fontSize: 12
                  },
                  shrink: true
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    // color: "#fff",
                    fontSize: 14
                  }
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        {/* </Card> */}
        <Grid container justify="center" alignItems="center">
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {loadingPrograms ? <SimpleCard name="All Programs" figure={'...'} label="all programs" icon={'BusinessCenter'} color="#f5a310" /> :
                <SimpleCard name="All Programs" figure={allPrograms} label="all programs" icon={'BusinessCenter'} color="#f5a310" />
              }
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {loadingTotalUsers ? <SimpleCard name="Total Users" figure={'...'} label="Total Users" icon={'Group'} color="#3f51b5" /> :
                <SimpleCard name="Total Users" figure={totalUsers} label="all users" icon={'Group'} color="#3f51b5" />
              }
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {loadingTTAwardeded ? <SimpleCard name="Total Points Awarded" figure={'...'} label="Total Points Awarded" icon={'Loyalty'} color="#942391" /> :
                <SimpleCard name="Total Points Awarded" figure={pointsAwardeded} label="total Points Awarded" icon={'Loyalty'} color="#942391" />
              }
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {loadingTTRedeemed ? <SimpleCard name="Total Points Redeemed" figure={'...'} label="Total Points Redeemed" icon={'Redeem'} color="#353f49" /> :
                <SimpleCard name="Total Points Redeemed" figure={pointsRedeemed} label="total points redeemed" icon={'Redeem'} color="#353f49" />
              }
            </Grid>
          </Grid>

          <Grid container className="spacer" spacing={3} justify="center" alignItems="center">
            <Grid item md={6} lg={6} sm={12}>
              <BarChart />
            </Grid>
            <Grid item md={6} lg={6} sm={12}>
              <LineChart />
            </Grid>
          </Grid>
        </Grid>
      </main>

    </div>
  )
}