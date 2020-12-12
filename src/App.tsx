import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Patients from './pages/patients';
import Visits from './pages/visits';
import Physicians from './pages/physicians';
import Header from './components/header';
import { PatientProvider } from './context/patients/patientState';
import { VisitProvider } from './context/visits/visitState';
import {PhysicianProvider} from "./context/physicians/physicianState";
import './App.scss';

function App() {
    return (
        <PatientProvider>
            <VisitProvider>
                <PhysicianProvider>
                    <Router>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Patients} />
                            <Route exact path="/visits/:id" component={Visits} />
                            <Route
                                exact
                                path="/physician/:id"
                                component={Physicians}
                            />
                        </Switch>
                    </Router>
                </PhysicianProvider>
            </VisitProvider>
        </PatientProvider>
    );
}

export default App;
