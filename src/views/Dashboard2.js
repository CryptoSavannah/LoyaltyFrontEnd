import React, { useState, useEffect, useContext } from 'react';
import MiniDrawer from '../components/Drawer/Drawer';
import PlainNavInfo from '../components/Nav/PlainNavInfo'
import SimpleCard from '../components/Cards/SimpleCard'
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const token = localStorage.getItem("token");

export const Dashboard = (props) => {
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
      setLoadingPrograms(false);
    }

    const fetchedPrograms = async () => {
      setAllPrograms((await getPrograms()).length);
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

    fetchedTotalUsers();
    fetchedPrograms();
    fetchedPointsAwardeded();
    fetchedPointsRedeemed();

    setSnack({ message: 'successfuly loaded data', open: true})

  }, [allPrograms, pointsAwardeded, totalUsers, pointsRedeemed])

  return (
    <div className={classes.root}>
      <MiniDrawer props={props} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Grid container spacing={0} justify="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4} lg={4}>
            {loadingPrograms ? <SimpleCard name="All Programs" figure={'...'} label="all programs" color="rgb(231,67,133,.5)" /> :
                <SimpleCard name="All Programs" figure={allPrograms} label="all programs" color="rgb(231,67,133,.5)" />
              }
              {loadingPrograms ? <SimpleCard name="All Programs" figure={'...'} label="all programs" color="rgb(231,67,133,.5)" /> :
                <SimpleCard name="All Programs" figure={allPrograms} label="all programs" color="rgb(231,67,133,.5)" />
              }{loadingPrograms ? <SimpleCard name="All Programs" figure={'...'} label="all programs" color="rgb(231,67,133,.5)" /> :
              <SimpleCard name="All Programs" figure={allPrograms} label="all programs" color="rgb(231,67,133,.5)" />
            }
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={8}>
              <LineChart/>
            </Grid>
          </Grid>
        </main>

    </div>
  )
}