import React, {useState, useEffect, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import SimpleCard from '../components/Cards/SimpleCard'
import { makeStyles } from '@material-ui/core/styles'
import MiniDrawer from '../components/Drawer/Drawer';
import InAppBar from '../components/Nav/InAppBar';
import SimpleTable from '../components/Tables/SimpleTable'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import InfoNav from '../components/Nav/InfoNav';

import {getLoyaltyTransactions} from '../services/program_transactions';

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

export const ProgramTransactions = () => {

    const classes = useStyles();
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        
        const fetchedTransactions = async () => {
            setTransactions(await getLoyaltyTransactions());
        } 

        fetchedTransactions();
    }, [transactions])

    const constructTable = () => {
        if (transactions === undefined || transactions.length === 0){
            return <p>Loading...</p>
        }else{
            return transactions.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.receipt_number}
                </TableCell>
                <TableCell align="right">{row.transaction_amount}</TableCell>
                <TableCell align="right">{row.points_awarded}</TableCell>
                <TableCell align="right">{row.payment_mode}</TableCell>
                <TableCell align="right">{row.transaction_date}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" color="default">View Details</Button>
                    <Button variant="outlined" color="secondary">Archive Txn</Button>
                </TableCell>
                </TableRow>
                )
            )
        }
    }

    return (
    <div className={classes.root}>
        <MiniDrawer/>
        <main className={classes.content}>
            <div className={classes.toolbar} />

            <Grid container>
                <InAppBar />

                <Grid container className="spacer" spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Total Transactions" figure={transactions.length} label="all transactions"/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Average Transaction Amount" figure="15 K" label="Average Transaction amt"/>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <SimpleCard name="Average Points Awarded" figure="12 K" label="Average Points Awarded"/>
                    </Grid>
                </Grid>

                <Grid container className="spacer">
                    <InfoNav title="Transactions"/>
                    <SimpleTable idcolumn="#" column1="Receipt" column2="Amount" column3="Points Awarded" column4="Payment Mode" column5="Date" column6="Actions" rows={constructTable()}/>
                </Grid>
                
            </Grid>
        </main>
    </div>
    )
}