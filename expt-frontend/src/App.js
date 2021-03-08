import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';

import Dashboard from './components/Dashboard.js';
import Signup from './components/authentication/Signup.js';
import Login from './components/authentication/Login.js';
import ForgotPassword from './components/authentication/ForgotPassword';
import PrivateRoute from './components/authentication/PrivateRoute.js';
import PatientSignUp from './components/forms/PatientSignUp.js';
import TherapistSignUp from './components/forms/TherapistSignUp';
import CompanySignUp from './components/forms/CompanySignUp.js';
import TherapistDashboard from './components/Dashboards/TherapistDashboard.js';
import PatientDashboard from './components/Dashboards/PatientDashboard.js';

import CssBaseline from '@material-ui/core/CssBaseline';
import AddressFrom from './components/forms/AddressForm.js';
import SurgeryCard from './components/forms/SurgeryCard'

function App() {
  return (
    <>
    <CssBaseline />
    
    <div classNa me="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <Route path="/addPatient" component={PatientSignUp}/>
            <Route path="/addTherapist" component={TherapistSignUp}/>
            <Route path="/addCompany" component={CompanySignUp}/>
            <Route path="/therapist" component={TherapistDashboard}/>
            <Route path="/patient" component={PatientDashboard}/>
            <Route path="/surgerycard" component={SurgeryCard}/>
            {/* Debugging */}
            <Route path="/address" component={AddressFrom}/>

            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
          </Switch>
        </AuthProvider>
      </Router>
      </div>
      </>
    

  );
}

export default App;
