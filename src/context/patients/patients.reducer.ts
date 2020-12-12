import {patientActionTypes} from "./patients.types";


interface Patient {
        id?: string,
        address?: string,
        email?: string,
        firstName?: string,
        lastName?: string,
        phone?: string,
        since?: string
}

export type State = {
    patients:Patient[],
    patient:Patient,
    loading: boolean
}

type Action = {
    type: typeof patientActionTypes.GET_PATIENTS,
    payload: Patient[]
} | {
    type: typeof patientActionTypes.GET_PATIENT,
    payload: Patient
}| {
    type: typeof patientActionTypes.SET_LOADING,
    payload: boolean
}


const patientsReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case patientActionTypes.GET_PATIENTS:
            return {
                ...state,
                patients: action.payload as Patient[],
            };
        case patientActionTypes.GET_PATIENT:
            return {
                ...state,
                patient: action.payload as Patient
            };
        case patientActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload as boolean
            }
        default:
            return state;
    }
};

export default patientsReducer
