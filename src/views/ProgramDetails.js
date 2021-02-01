import React, {useState, useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import SimpleCard from '../components/Cards/SimpleCard'
import { makeStyles } from '@material-ui/core/styles'
import MiniDrawer from '../components/Drawer/Drawer';
import InAppBar from '../components/Nav/InAppBar';
import LineChart from '../components/Charts/line';
import RadarChart from '../components/Charts/radar';

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

export const ProgramDetails = () => {

    const classes = useStyles();

    return (
    <div className={classes.root}>
        <MiniDrawer/>
        <main className={classes.content}>
            <div className={classes.toolbar} />

            <Grid container>
                <InAppBar />

                <Grid container className="spacer" spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Total Sales" figure="1.5 M" label="all sales"/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Total Points Awarded" figure="60 K" label="all points awarded"/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Performance" figure="65%" label="Overall Performance"/>
                    </Grid>
                </Grid>

                <Grid container className="spacer" spacing={3}>
                    <Grid item md={7} lg={7} sm={12}>
                        <LineChart/>
                    </Grid>
                    <Grid item md={5} lg={5} sm={12}>
                        <RadarChart/>
                    </Grid>
                </Grid>
            </Grid>
        </main>
    </div>
    )
}