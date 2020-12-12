import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Patients from './components/patients';
import Header from './components/header';
import { PatientProvider } from './context/patients/patientState';
import './App.scss';

function App() {
  return (
    <PatientProvider>
      <Router>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Patients} />
                            </Switch>
                            </Router>

    </PatientProvider>
    );
  }
  
  export default App;