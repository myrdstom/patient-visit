import React, { createContext, useReducer } from 'react';
import physicianReducer, { PhysicianState } from './physicians.reducer';
import { physicianActionTypes } from './physicians.types';
import { baseUrl } from '../../helpers/baseUrl';
import axios from 'axios';

type Props = {
    children?: React.ReactChild | React.ReactChild[];
};

export const initialState: PhysicianState = {
    physician: {
        id: '',
        firstName:'',
        lastName:'',
        phone:''
    },
    loading: false,
};

type Context = typeof initialState & {
    getPhysician(id: string): void;
    loadData(): void;
};


export const PhysicianContext = createContext<Context>({
    ...initialState,
    getPhysician: () => {},
    loadData: () => {},
});


export const PhysicianProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(physicianReducer, initialState);

    const loadData = () => {
        dispatch({
            type: physicianActionTypes.SET_LOADING,
            payload: true,
        });
    };

    const getPhysician = (id: string) => {
        axios
            .get(`${baseUrl}/v1/physicians/${id}`)
            .then((res) => {
                dispatch({
                    type: physicianActionTypes.GET_PHYSICIAN,
                    payload: res.data,
                });
            })
            .then(() => {
                dispatch({
                    type: physicianActionTypes.SET_LOADING,
                    payload: false,
                });
            });
    };

    return (
        <PhysicianContext.Provider
            value={{
                physician: state.physician,
                loading: state.loading,
                getPhysician,
                loadData,
            }}
        >
            {children}
        </PhysicianContext.Provider>
    );
};
