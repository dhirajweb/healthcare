import './App.css';
import Login from './components/Login/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Doctor from './components/Dashboard/Doctor'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/doctor' component={Doctor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
