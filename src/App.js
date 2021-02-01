import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignIn from './views/Login';
import {Dashboard} from './views/Dashboard';
import {Users} from './views/Users';
import {Partnerships} from './views/Partnerships';
import {Programs} from './views/Programs';
import {ProgramDetails} from './views/ProgramDetails';
import {ProgramTransactions} from './views/ProgramTransactions'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/users" component={Users}/>
          <Route exact path="/partnerships" component={Partnerships}/>
          <Route exact path="/programs" component={Programs}/>
          <Route path="/programs/overview" component={ProgramDetails}/>
          <Route path="/programs/transactions" component={ProgramTransactions}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
