import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './views/Login';
import { Dashboard } from './views/Dashboard';
import { Users } from './views/Users';
import { Partnerships } from './views/Partnerships';
import { Programs } from './views/Programs';
import { ProgramDetails } from './views/ProgramDetails';
import { ProgramTransactions } from './views/ProgramTransactions';
import { SnackbarContext } from './context/SnackbarContext';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const App = () => {
  const [snack, setSnack] = useState({
    message: '',
    color: '',
    open: false,
  });

  const handleClose = (event, reason) => {
    setSnack({ ...snack, open: false });
  };
  return (
    <div className="App">
      <SnackbarContext.Provider value={{ snack, setSnack }}>
        <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <Alert onClose={handleClose}>
            {snack.message}
          </Alert>
        </Snackbar>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/partnerships" component={Partnerships} />
            <Route exact path="/programs" component={Programs} />
            <Route path="/programs/overview" component={ProgramDetails} />
            <Route path="/programs/transactions" component={ProgramTransactions} />
          </Switch>
        </BrowserRouter>
      </SnackbarContext.Provider>

    </div>
  )
}

export default App;
