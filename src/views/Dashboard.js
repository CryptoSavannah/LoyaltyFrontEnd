import React, {useState, useEffect} from 'react';
import MiniDrawer from '../components/Drawer/Drawer';
import PlainNavInfo from '../components/Nav/PlainNavInfo'
import SimpleCard from '../components/Cards/SimpleCard'
import Grid from '@material-ui/core/Grid';
import SimpleTable from '../components/Tables/SimpleTable';
import { makeStyles } from '@material-ui/core/styles';
import Donut from '../components/Charts/donut';
import BarChart from '../components/Charts/bar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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

export const Dashboard = () => {
    const classes = useStyles();
    const [bestPerforming, setBestPerforming] = useState([])
    const [worstPerforming, setWorstPerforming] = useState([])

    useEffect(() => {
        setBestPerforming([
            {
                "id":"1",
                "branch":"Najeera",
                "points":"30,000"
            },
            {
                "id":"2",
                "branch":"Munyonyo",
                "points":"30,000"
            }
        ])

        setWorstPerforming([
            {
                "id":"1",
                "branch":"Maya",
                "points":"3000"
            },
            {
                "id":"2",
                "branch":"Kasokoso",
                "points":"200"
            }
        ])
        
    }, [])

    const constructBestTable = () => {
        if (bestPerforming === undefined || bestPerforming.length === 0){
            return <p>Loading...</p>
        }else{
            return bestPerforming.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.branch}
                </TableCell>
                <TableCell align="right">{row.points}</TableCell>
                <TableCell align="right">{row.Contact}</TableCell>
                </TableRow>
                )
            )
        }
    }

    const constructWorstTable = () => {
        if (worstPerforming === undefined || worstPerforming.length === 0){
            return <p>Loading...</p>
        }else{
            return worstPerforming.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.branch}
                </TableCell>
                <TableCell align="right">{row.points}</TableCell>
                </TableRow>
                )
            )
        }
    }

    return(
        <div className={classes.root}>
            <MiniDrawer/>

            <main className={classes.content}>
                <div className={classes.toolbar} />
        
            <Grid container>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="All Programs" figure="3" label="all programs"/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Total Users" figure="60 K" label="all users"/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Total Sales" figure="20 M" label="total sales"/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Total Points Awarded" figure="200 K" label="total points awarded"/>
                    </Grid>
                </Grid>

                <Grid container className="spacer" spacing={3}>
                    <Grid item md={6} lg={6} sm={12}>
                        <Donut/>
                    </Grid>
                    <Grid item md={6} lg={6} sm={12}>
                        <BarChart/>
                    </Grid>
                </Grid>

                <Grid container className="spacer" spacing={3}>
                    <Grid item md={6} lg={6} sm={12}>
                        <PlainNavInfo title="Best Performing Branches"/>
                        <SimpleTable idcolumn="#" column1="Branch" column2="Total Points" rows={constructBestTable()}/>
                    </Grid>
                    <Grid item md={6} lg={6} sm={12}>
                        <PlainNavInfo title="Worst Performing Branches"/>
                        <SimpleTable idcolumn="#" column1="Branch" column2="Total Points" rows={constructWorstTable()}/>
                    </Grid>
                </Grid>
            </Grid>
            </main>
            
        </div>
    )
}