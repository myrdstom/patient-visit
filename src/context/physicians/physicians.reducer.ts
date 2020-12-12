import { physicianActionTypes } from './physicians.types';

interface Physician {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export type PhysicianState = {
    physician: Physician;
    loading: boolean;
};

type Action =
    | {
    type: typeof physicianActionTypes.GET_PHYSICIAN;
    payload: Physician;
}
    | {
    type: typeof physicianActionTypes.SET_LOADING;
    payload: boolean;
};

const physicianReducer = (state: PhysicianState, action: Action) => {
    switch (action.type) {
        case physicianActionTypes.GET_PHYSICIAN:
            return {
                ...state,
                physician: action.payload as Physician,
            };
        case physicianActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload as boolean,
            };
        default:
            return state;
    }
};

export default physicianReducer;
