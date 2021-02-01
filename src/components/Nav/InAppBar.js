import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/programs/overview" className="nav-link">Program Overview</Link>
          <Link to="/programs/transactions" className="nav-link">Transactions</Link>
          <Link to="/projects/impact" className="nav-link">Financials</Link>
          <Link to="/projects/financials" className="nav-link">Performance</Link>
          <Link to="/projects/outcomes" className="nav-link">Analytics</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}