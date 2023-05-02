import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SimpleTable from '../components/Tables/SimpleTable'
import Grid from '@material-ui/core/Grid';
import SimpleCard from '../components/Cards/SimpleCard'
import InfoNav from '../components/Nav/InfoNav';
import MiniDrawer from '../components/Drawer/Drawer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { getPartnerships } from '../services/partnerships';
import { getPrograms, createProgram, getProgramDetails, deleteProgram } from '../services/programs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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

{/* <SimpleTable idcolumn="#" column1="Program" column2="Products Attached" column3="Partner" column4="% Split" column5="Points Awarded" column6="Actions" rows={constructTable()} /> */ }

const columns = [
  { id: 'id', label: '#', minWidth: 100 },
  { id: 'program', label: 'Program Name', minWidth: 170 },
  { id: 'products', label: 'Products Attached', minWidth: 170 },
  { id: 'partner', label: 'Program Partner', minWidth: 170 },
  { id: 'split', label: '% Split', minWidth: 100, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' },
];
function createData2(id, program, products, partner, split) {
  return { id, program, products, partner, split };
}

const rows2 = [
  createData2("Loyal shopper", "CS-LS", "Any products purchased, Minimum shopping amount UGX44,000", "Capital Shoppers supermarket", 5, "View"),
  createData2("Gold shopper", "CS-GS", "Any products purchased, Minimum shopping amount UGX150,0000", "Capital Shoppers supermarket", 5, "View"),
  createData2("Platinum shopper", "CS-PS", "Any products purchased, Minimum shopping amount UGX300,0000", "Capital Shoppers supermarket", 5, "View"),
  createData2("Coca-Cola Fest", "CCF", "All Coca-Cola products", "Century Bottling Limited", 9),
  createData2("Proctor & Gamble", "PG", "Pampers, Gillette, Ariel, Always, Downy, Safeguard", "Kiboko enterprises", 5),
  createData2("Unilever", "UN", "Royco, Omo, Sunlight, Vaseline, Dove, Geisha, Vim, Lux, Lifebuoy, Rexona, Sure", "Charms limited", 5),
  createData2("Back to School", "B2S", "Stationery, toiletries", "Picfare, Charms Limited", 9),
  createData2("Christmas Extra", "CS-CE", "Shopping in the festive season, Minimum amount UGX 50,000", "Capital Shoppers supermarket", 5),
  
  // createData2('India', 'IN', 1324171354, 3287263, 9),
  // createData2('China', 'CN', 1403500365, 9596961, 9),
  // createData2('Italy', 'IT', 60483973, 301340, 9),
  // createData2('United States', 'US', 327167434, 9833520, 9),
  // createData2('Canada', 'CA', 37602103, 9984670, 9),
  // createData2('Australia', 'AU', 25475400, 7692024, 9),
  // createData2('Germany', 'DE', 83019200, 357578, 9),
  // createData2('Ireland', 'IE', 4857000, 70273, 9),
  // createData2('Mexico', 'MX', 126577691, 1972550, 9),
  // createData2('Japan', 'JP', 126317000, 377973, 9),
  // createData2('France', 'FR', 67022000, 640679, 9),
  // createData2('United Kingdom', 'GB', 67545757, 242495, 9),
  // createData2('Russia', 'RU', 146793744, 17098246, 9),
  // createData2('Nigeria', 'NG', 200962417, 923768, 9),
  // createData2('Brazil', 'BR', 210147125, 8515767, 9),
];
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("Loyal shopper", "CS-LS", "Any products purchased, Minimum shopping amount UGX44,000", "Capital Shoppers supermarket"),
  createData("Gold shopper", "CS-GS", "Any products purchased, Minimum shopping amount UGX150,0000", "Capital Shoppers supermarket"),
  createData("Platinum shopper", "CS-PS", "Any products purchased, Minimum shopping amount UGX300,0000", "Capital Shoppers supermarket"),
  createData("Coca-Cola Fest", "CCF", "All Coca-Cola products", "Century Bottling Limited"),
  createData("Proctor & Gamble", "PG", "Pampers, Gillette, Ariel, Always, Downy, Safeguard", "Kiboko enterprises"),
  createData("Unilever", "UN", "Royco, Omo, Sunlight, Vaseline, Dove, Geisha, Vim, Lux, Lifebuoy, Rexona, Sure", "Charms limited"),
  createData("Back to School", "B2S", "Stationery, toiletries", "Picfare, Charms Limited"),
  createData("Christmas Extra", "CS-CE", "Shopping in the festive season, Minimum amount UGX 50,000", "Capital Shoppers supermarket"),
  // createData('Mexico', 'MX', 126577691, 1972550),
  // createData('Japan', 'JP', 126317000, 377973),
  // createData('France', 'FR', 67022000, 640679),
  // createData('United Kingdom', 'GB', 67545757, 242495),
  // createData('Russia', 'RU', 146793744, 17098246),
  // createData('Nigeria', 'NG', 200962417, 923768),
  // createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles2 = makeStyles({
  root: {
    width: '100%',
    marginTop: 30
  },
  container: {
    maxHeight: 440,
  },
});

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

    if (userdata.status === 400) {
      setOpen(false);
      location.reload()
      return false
    }
    setOpen(false);
    location.reload()
    return true
  }

  const pickProgramForDelete = async (id) => {
    const deletedProgram = await getProgramDetails(id)
    if (deleteProgram.status == 404) {
      console.log("failed")
      return false
    }
    setProgramToDelete(deletedProgram.id)
    return true
  }

  const executeDeleteProgram = async (id) => {
    const programDelete = await deleteProgram(id)
    if (programDelete.status == 404) {
      console.log("failed")
      return false
    }
    location.reload()
    return true
  }

  const constructTable = () => {
    if (programs === undefined || programs.length === 0) {
      return <p>Loading...</p>
    } else {
      if (programs.status) {
        if (programs.status.toString() === "500") {
          return <p>Network Error</p>
        }
      } else {
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
              <Button variant="outlined" color="primary">E</Button>
              <Button variant="outlined" color="default" onClick={
                e => {
                  fetchProgramDetails()
                }
              }>V</Button>
              <Button variant="outlined" color="secondary" onClick={e => {
                pickProgramForDelete(row.id)
                handleOpenDelete()
              }}>D</Button>
            </TableCell>
          </TableRow>
        )
        )
      }
    }
  }

  const classes2 = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const constructTable2 = () => {
    if (programs === undefined || programs.length === 0) {
      return <p>Loading...</p>
    } else {
      if (programs.status) {
        if (programs.status.toString() === "500") {
          return <p>Network Error</p>
        }
      } else {
        {rows2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number' ? column.format(value) : value}
                  </TableCell>
                );
              })}
              <TableCell align="right">
              <Button variant="outlined" color="primary">E</Button>
              <Button variant="outlined" color="default" onClick={
                e => {
                  fetchProgramDetails()
                }
              }>V</Button>
              <Button variant="outlined" color="secondary" onClick={e => {
                pickProgramForDelete(row.id)
                handleOpenDelete()
              }}>D</Button>
            </TableCell>
            </TableRow>
          );
        })}
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
              <Button variant="outlined" color="primary">E</Button>
              <Button variant="outlined" color="default" onClick={
                e => {
                  fetchProgramDetails()
                }
              }>V</Button>
              <Button variant="outlined" color="secondary" onClick={e => {
                pickProgramForDelete(row.id)
                handleOpenDelete()
              }}>D</Button>
            </TableCell>
          </TableRow>
        )
        )
      }
    }
  }


  return (
    <div className={classes.root}>
      <MiniDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3} md={3} >
            <SimpleCard name="Active Programs" figure={3} label="all programs" icon={'BusinessCenter'} color="rgb(53, 63, 73)" />
          </Grid>
          <Grid item xs={6} sm={3} md={3} >
            <SimpleCard name="Active Partnerships" figure="2" label="active partnerships" icon={'GroupWork'} color="rgb(1, 47, 109)" />
          </Grid>
          <Grid item xs={6} sm={3} md={3} >
            <SimpleCard name="Total % Return" figure="70%" label="percentage return" icon={'TrendingUp'} color="rgb(231,67,133)" />
          </Grid>
        </Grid>


        {/* <Grid container className="spacer">
          <Grid container>
            <InfoNav title="Loyalty Programs" button="Add Program" onclick={handleOpen} />
            <SimpleTable idcolumn="#" column1="Program" column2="Products Attached" column3="Partner" column4="% Split" column5="Points Awarded" column6="Actions" rows={constructTable()} />
          </Grid>
        </Grid> */}
        <Paper className={classes2.root}>
          <div style={{ display: 'flex', justifyContent: 'right', borderRadius: 5, backgroundColor: '#fafafa' }}>
            <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left", paddingTop: 10, paddingLeft: 10 }}>
              Loyalty Programs
          </Typography >
            {/* <Link href="#" onClick={handleOpen} style={{ paddingBottom: 5, margin: 10 }}>Add Program</Link> */}
            <Button color="primary" onClick={handleOpen} style={{ paddingBottom: 3, paddingTop: 3, margin:2}}>Add Program</Button>
          </div>
          <TableContainer className={classes2.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                {/* <TableRow style={{paddingTop: 0, paddingBottom: 0}}>
                  <TableCell align="center" colSpan={5} style={{ backgroundColor: '#fff'}}>
                  </TableCell>
                  <TableCell align="right" style={{ backgroundColor: '#fff'}}>
                    <Button color="primary" onClick={handleOpen} style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#fafafa'}}>Add Program</Button>
                  </TableCell>
                </TableRow> */}
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
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
                  <TextField value={programName} label="Program Name" variant="outlined" fullWidth onChange={updateProgramName} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField value={programPercentage} label="Percentage" variant="outlined" fullWidth onChange={updateProgramPercentage} />
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
                    }} />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField value={dueDate}
                    label="Due Date"
                    type="date"
                    fullWidth
                    onChange={updateDueDate}
                    InputLabelProps={{
                      shrink: true,
                    }} />
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
                    {(partners === undefined || partners.length === 0) ? partners.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    )) : null}
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
                    {(products === undefined || products.length === 0) ? products.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    )) : null}
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

      {programToDelete === "" ? (
        null
      ) : (
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
              <Divider />
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