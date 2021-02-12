import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SimpleTable from '../components/Tables/SimpleTable'
import Grid from '@material-ui/core/Grid';
import SimpleCard from '../components/Cards/SimpleCard'
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
import MenuItem from '@material-ui/core/MenuItem';

import {getPartnerships} from '../services/partnerships';
import {getPrograms, createProgram, getProgramDetails, deleteProgram} from '../services/programs';

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

export const Programs = (props) => {

    const [programs, setPrograms] = useState([])
    const [partners, setPartners] = useState([])
    const [products, setProducts] = useState([])
    const [programName, setProgramName] = useState("")
    const [productsAttached, setProductsAttached] = useState("")
    const [programPercentage, setProgramPercentage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [dueDate, setDueDate] = useState("")
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [programToDelete, setProgramToDelete] = useState("")

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

    const updateProgramName = e => {
        setProgramName(e.target.value)
    }

    const updateProductsAttached = e => {
        setProductsAttached(e.target.value)
    }

    const updateProgramPercentage = e => {
        setProgramPercentage(e.target.value)
    }

    const updateStartDate = e => {
        setStartDate(e.target.value)
    }

    const updateDueDate = e => {
        setDueDate(e.target.value)
    }


    useEffect(async () => {
            setPartners(await getPartnerships());
            setPrograms(await getPrograms());
            // console.log("Programs in P :" + await getPrograms());

        setProducts(
            [
                {
                    "id": "1",
                    "name": "All"
                }
            ]
        )

    }, [])

    const fetchProgramDetails = () => {
        props.history.push("/programs/overview")
        return true
    }

    //Submit user data
    const submitProgramData = async () => {
        const userdata = await createProgram(programName, productsAttached, programPercentage, startDate, dueDate)
        
        if(userdata.status===400){
            setOpen(false);
            location.reload()
            return false
        }
        setOpen(false);
        location.reload()
        return true
    }

    const pickProgramForDelete = async(id) => {
        const deletedProgram = await getProgramDetails(id)
        if(deleteProgram.status==404){
            console.log("failed")
            return false
        } 
        setProgramToDelete(deletedProgram.id)
        return true
    }

    const executeDeleteProgram = async(id) => {
        const programDelete = await deleteProgram(id)
        if(programDelete.status==404){
            console.log("failed")
            return false
        }
        location.reload()
        return true
    }

    const constructTable = () => {
        if (programs === undefined || programs.length === 0){
            return <p>Loading...</p>
        }else{
            return programs.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.program_name}
                </TableCell>
                <TableCell align="right">{row.products_attached}</TableCell>
                <TableCell align="right">{row.program_partner}</TableCell>
                <TableCell align="right">{row.program_percentage}</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">
                <Button variant="outlined" color="primary">Edit Program</Button>
                    <Button variant="outlined" color="default" onClick={
                            e=>{
                                fetchProgramDetails()
                            }
                        }>View Details</Button>
                    <Button variant="outlined" color="secondary" onClick={e=>{
                            pickProgramForDelete(row.id)
                            handleOpenDelete()
                        }}>Delete Program</Button>
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
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3} md={3} >
                        <SimpleCard name="Active Programs" figure="3" label="all programs"/>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} >
                        <SimpleCard name="Active Partnerships" figure="2" label="active partnerships"/>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} >
                        <SimpleCard name="Total % Return" figure="70%" label="percentage return"/>
                    </Grid>
                </Grid>


                <Grid container className="spacer">
                    <Grid container>
                        <InfoNav title="Loyalty Programs" button="Add Program" onclick={handleOpen}/>
                        <SimpleTable idcolumn="#" column1="Program Name" column2="Products Attached" column3="Program Partner" column4="Percentage Split" column5="Points Awarded" column6="Actions" rows={constructTable()}/>
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
                    <h2 id="transition-modal-title">Add New Program</h2>
                    <p id="transition-modal-description">Please fill in all program details correctly</p>
                    <form
                    noValidate autoComplete="off"
                    onSubmit={e => {
                        e.preventDefault()
                        submitProgramData()
                        }}>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField value={programName} label="Program Name" variant="outlined" fullWidth onChange={updateProgramName}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField value={programPercentage} label="Percentage" variant="outlined" fullWidth onChange={updateProgramPercentage}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={6}>
                                <TextField value={startDate}
                                label="Start Date" 
                                type="date"  
                                fullWidth 
                                onChange={updateStartDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField value={dueDate}
                                label="Due Date" 
                                type="date"  
                                fullWidth 
                                onChange={updateDueDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    select
                                    label="Select "
                                    value={productsAttached}
                                    fullWidth
                                    helperText="Please select the product partner"
                                    onChange={updateProductsAttached}
                                    >
                                    {partners.map((option) => (
                                        <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    select
                                    label="Select "
                                    value={productsAttached}
                                    fullWidth
                                    helperText="Please select the related products"
                                    onChange={updateProductsAttached}
                                    >
                                    {products.map((option) => (
                                        <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                                <p>Confirm that you want to delete this program, Cancel otherwise</p>
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