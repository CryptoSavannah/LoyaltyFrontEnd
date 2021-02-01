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

import {getPartnerships, createPartnership, getPartnershipDetails, deletePartnership} from '../services/partnerships';

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

export const Partnerships = () => {

    const [partners, setPartners] = useState([])
    const classes = useStyles();
    const [partnerName, setPartnerName] = useState("")
    const [partnerProduct, setPartnerProduct] = useState("")
    const [partnerContact, setPartnerContact] = useState("")
    const [percentagePoints, setPercentagePoints] = useState("")
    const [open, setOpen] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [programToDelete, setProgramToDelete] = useState("")

    useEffect(() => {
        // const fetchedPartnerships = async () => {
        //     setPartners(await getPartnerships());
        // } 

        // fetchedPartnerships();

    }, [])

    //Modal Stuff
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDelete = () => {
        setOpenDeleteModal(true);
    };
    
    const handleCloseDelete = () => {
        setOpenDeleteModal(false);
    };

    const updatePartnerName = e => {
        setPartnerName(e.target.value)
    }

    const updatePartnerContact = e => {
        setPartnerContact(e.target.value)
    }

    const updatePartnerProduct = e => {
        setPartnerProduct(e.target.value)
    }

    const updatePercentagePoints = e => {
        setPercentagePoints(e.target.value)
    }

    //Submit user data
    const submitPartnershipData = async () => {
        const partnerdata = await createPartnership(partnerName, partnerProduct, partnerContact, percentagePoints)
        
        if(partnerdata.status===400){
            setOpen(false);
            location.reload()
            return false
        }
        setOpen(false);
        location.reload()
        return true
    }

    const pickProgramForDelete = async(id) => {
        const deletedProgram = await getPartnershipDetails(id)
        if(deletedProgram.status==404){
            console.log("failed")
            return false
        } 
        setProgramToDelete(deletedProgram.id)
        return true
    }

    const executeDeleteProgram = async(id) => {
        const programDelete = await deletePartnership(id)
        if(programDelete.status==404){
            console.log("failed")
            return false
        }
        location.reload()
        return true
    }

    const constructTable = () => {
        if (partners === undefined || partners.length === 0){
            return <p>Partnerships Coming Soon</p>
        }else{
            return partners.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.partner_name}
                </TableCell>
                <TableCell align="right">{row.partner_product}</TableCell>
                <TableCell align="right">{row.partner_contact}</TableCell>
                <TableCell align="right">{row.percentage_points}</TableCell>
                <TableCell align="right">{row.partner_returns}</TableCell>
                <TableCell align="right">
                <Button variant="outlined" color="primary">Edit Partner</Button>
                    <Button variant="outlined" color="default">View Details</Button>
                    <Button variant="outlined" color="secondary" onClick={e=>{
                            pickProgramForDelete(row.id)
                            handleOpenDelete()
                        }}>Archive Partner</Button>
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
                        <InfoNav title="Partnerships" button="Add Partner" onclick={handleOpen}/>
                        <SimpleTable idcolumn="#" column1="Partner Name" column2="Partner Product" column3="Contact" column4="Percentage Points" column5="Returns" column6="Actions" rows={constructTable()}/>
                    </Grid>
                </Grid>
            </main>

               {/* Modals Add Program Modal*/}
               <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Add New Partnership</h2>
                    <p id="transition-modal-description">Please fill in all partnership details correctly</p>
                    <form
                    noValidate autoComplete="off"
                    onSubmit={e => {
                        e.preventDefault()
                        submitPartnershipData()
                        }}>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField value={partnerName} label="Partner Name" variant="outlined" fullWidth onChange={updatePartnerName}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField value={partnerProduct} label="Partner Product" variant="outlined" fullWidth onChange={updatePartnerProduct}/>
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField value={partnerContact} label="Partner Contact" variant="outlined" fullWidth onChange={updatePartnerContact}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField value={percentagePoints} label="Percentage Points" variant="outlined" fullWidth onChange={updatePercentagePoints}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={6}>
                                <Button size="large" variant="contained" color="secondary" onClick={handleClose}> 
                                    Close
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Button type="submit" size="large" variant="contained" color="primary" onClick={handleClose}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                </Fade>
            </Modal>

            {programToDelete==="" ? (
                null
            ): (
            <Modal
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                open={openDeleteModal}
                onClose={handleCloseDelete}
                aria-labelledby="simple-modal-delete"
                aria-describedby="simple-modal-delete"
            >
                <div className={classes.paper}>
                    <h1 id="simple-delete-title">Confirm Program Delete</h1>
                    <Divider/>
                    <form
                    noValidate autoComplete="off"
                    onSubmit={e => {
                        e.preventDefault()
                        executeDeleteProgram(programToDelete)
                        }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <p>Confirm that you want to archive this partner, Please note that they will no longer appear on any of your programs.</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={6}>
                                <Button size="large" variant="contained" color="secondary" onClick={handleCloseDelete}> 
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Button type="submit" size="large" variant="contained" color="primary">
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Modal>
            )}
    
        </div>
    )
}