import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Patients from './components/patients';
import Visits from './components/visits';
import Header from './components/header';
import { PatientProvider } from './context/patients/patientState';
import { VisitProvider } from './context/visits/visitState';
import './App.scss';

function App() {
  return (
    <PatientProvider>
      <VisitProvider>
      <Router>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Patients} />
                            <Route exact path="/visits/:id" component={Visits} />
                            </Switch>
                            </Router>
                            </VisitProvider>

    </PatientProvider>
    );
  }
  
  export default App;