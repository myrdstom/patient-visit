import { visitActionTypes } from './visits.types';

interface Visit {
    id: string;
    patientId: string;
    physicianId: string;
    time: string;
    location: string;
    symptoms: string;
    diagnosis: string;
}

export type VisitState = {
    visits: Visit[];
    patientVisits: Visit[];
    loading: boolean;
};

type Action =
    | {
          type: typeof visitActionTypes.GET_VISITS;
          payload: Visit[];
      }
    | {
          type: typeof visitActionTypes.GET_PATIENT_VISITS;
          payload: Visit[];
      }
    | {
          type: typeof visitActionTypes.SET_LOADING;
          payload: boolean;
      };

const visitReducer = (state: VisitState, action: Action) => {
    switch (action.type) {
        case visitActionTypes.GET_VISITS:
            return {
                ...state,
                visits: action.payload as Visit[],
            };
        case visitActionTypes.GET_PATIENT_VISITS:
            return {
                ...state,
                patientVisits: action.payload as Visit[],
            };
        case visitActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload as boolean,
            };
        default:
            return state;
    }
};

export default visitReducer;
