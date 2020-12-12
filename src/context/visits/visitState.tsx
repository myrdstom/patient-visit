
import React, { createContext, useReducer } from 'react';
import visitReducer, { VisitState } from './visits.reducer';
import { visitActionTypes } from './visits.types';
import { baseUrl } from '../../helpers/baseUrl';
import axios from 'axios';

type Props = {
    children?: React.ReactChild | React.ReactChild[];
};

export const initialState: VisitState = {
    visits: [],
    patientVisits: [],
    loading: false,
};

type Context = typeof initialState & {
    getVisits(): void;
    getPatientVisits(id: string): void;
    loadData(): void;
};


export const VisitContext = createContext<Context>({
    ...initialState,
    getVisits: () => {},
    getPatientVisits: () => {},
    loadData: () => {},
});


export const VisitProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(visitReducer, initialState);

    const loadData = () => {
        dispatch({
            type: visitActionTypes.SET_LOADING,
            payload: true,
        });
    };

    const getVisits = () => {
        axios.get(`${baseUrl}/v1/visits`).then((res) => {
            dispatch({
                type: visitActionTypes.GET_VISITS,
                payload: res.data,
            });
        }).then(() => {
            dispatch({
                type: visitActionTypes.SET_LOADING,
                payload: false,
            });
        });
    };
    const getPatientVisits = (id: string) => {
        axios.get(`${baseUrl}/v1/patients/${id}/visits`).then((res) => {
            dispatch({
                type: visitActionTypes.GET_PATIENT_VISITS,
                payload: res.data,
            });
        }).then(() => {
            dispatch({
                type: visitActionTypes.SET_LOADING,
                payload: false,
            });
        });
    };

    return (
        <VisitContext.Provider
            value={{
                visits: state.visits,
                patientVisits: state.patientVisits,
                loading: state.loading,
                getVisits,
                getPatientVisits,
                loadData
            }}
        >
            {children}
        </VisitContext.Provider>
    );
};
