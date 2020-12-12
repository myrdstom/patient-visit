import React, { createContext, useReducer } from 'react';
import patientsReducer, { State } from './patients.reducer';
import { patientActionTypes } from './patients.types';
import { baseUrl } from '../../helpers/baseUrl';
import axios from 'axios';

type Props = {
    children?: React.ReactChild | React.ReactChild[];
};


export const initialState:State = {
    patients: [],
    patient: {},
    loading: false
};

type Context = typeof initialState & {
    getPatients(): void,
    getPatient(id: string): void,
    loadData(): void
}


export const PatientContext = createContext<Context>({
    ...initialState,
    getPatients: () => {},
    getPatient: () => {},
    loadData: () => {},
});



export const PatientProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(patientsReducer, initialState);

    const loadData = () =>{
        dispatch({
            type: patientActionTypes.SET_LOADING,
            payload: true,
        });

    }

    const getPatients = () => {
         axios.get(`${baseUrl}/v1/patients`).then((res) => {
            dispatch({
                type: patientActionTypes.GET_PATIENTS,
                payload: res.data,
            });
        }).then(() => {
             dispatch({
                 type: patientActionTypes.SET_LOADING,
                 payload: false,
             });
         });
    };

    const getPatient =  (id: string) => {
         axios.get(`${baseUrl}/v1/patients/${id}`).then((res) => {
            dispatch({
                type: patientActionTypes.GET_PATIENT,
                payload: res.data,
            });
        }).then(() => {
             dispatch({
                 type: patientActionTypes.SET_LOADING,
                 payload: false,
             });
         });
    };

    return (
        <PatientContext.Provider
            value={{
                patients: state.patients,
                patient: state.patient,
                loading: state.loading,
                getPatients,
                getPatient,
                loadData,
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};
