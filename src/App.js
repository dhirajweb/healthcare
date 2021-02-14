import './App.css';
import Login from './components/Login/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Doctor from './components/Dashboard/Doctor'
import Patient from './components/Dashboard/Patient'
import { connect } from 'react-redux'
import Error from './components/Error'

const App = (props) => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/doctor' component={localStorage.getItem('loginRole') === 'doctor' ? Doctor:Error} />
          <Route exact path='/patient' component={localStorage.getItem('loginRole') === 'patient' ? Patient:Error} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App);
