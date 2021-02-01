import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SimpleTable from '../components/Tables/SimpleTable'
import Grid from '@material-ui/core/Grid';
import InfoNav from '../components/Nav/InfoNav';
import MiniDrawer from '../components/Drawer/Drawer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';

import {getLoyaltyUsers, getUserDetails, deleteUser} from '../services/accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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

export const Users = () => {

    const [users, setUsers] = useState([])
    const classes = useStyles();

    useEffect(() => {
        const fetchedUsers = async () => {
            setUsers(await getLoyaltyUsers());
            console.log(users)
        } 

        fetchedUsers();
    }, [])

    const constructTable = () => {
        if (users === undefined || users.length === 0){
            return <p>Loading...</p>
        }else{
            return users.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.related_user.first_name} {row.related_user.last_name}
                </TableCell>
                <TableCell align="right">{row.related_user.location}</TableCell>
                <TableCell align="right">{row.related_user.phone_number}</TableCell>
                <TableCell align="right">{row.points_earned}</TableCell>
                <TableCell align="right">{row.card_number}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" color="default">View Details</Button>
                    <Button variant="outlined" color="secondary">DeActivate User</Button>
                </TableCell>
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
                    <Grid container>
                        <InfoNav title="Users"/>
                        <SimpleTable idcolumn="#" column1="Name" column2="Location" column3="Contact" column4="Points Accrued" column5="Rating" column6="Actions" rows={constructTable()}/>
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}