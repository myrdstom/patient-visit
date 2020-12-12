import React, { useEffect, useContext } from 'react';
import { VisitContext } from '../../context/visits/visitState';
import './visits.styles.scss';
import Table from '../table/table';
import dayjs from 'dayjs';
import { PatientContext } from '../../context/patients/patientState';
import { Link, useParams, useHistory } from 'react-router-dom';
import Loader from '../loader';

interface RouteParams {
    id: string;
}

const Visits = () => {
    const {
        getVisits,
        patientVisits,
        getPatientVisits,
        loading,
        loadData,
    } = useContext(VisitContext);
    const { patient, getPatient } = useContext(PatientContext);
    let { id } = useParams<RouteParams>();
    let history = useHistory();
    useEffect(() => {
        loadData();
        getPatient(id);
        getPatientVisits(id);
        getVisits();
    }, []);

    const columns = [
        'ID',
        'Patient Name',
        'Symptoms',
        'Date',
        'Location',
        'Diagnosis',
        'Physician Details',
    ];

    const cleanData = () => {
        let cleanedPatients: Array<object> = [];
        patientVisits.map((element) => {
            if (patientVisits.length > 0) {
                cleanedPatients.push({
                    id: element.id,
                    patientName: patient.firstName + ' ' + patient.lastName,
                    symptoms: element.symptoms,
                    time: dayjs(element.time).format('MMMM D, YYYY h:mm A'),
                    location: element.location,
                    diagnosis: element.diagnosis,
                    details: (
                        <Link
                            to={{
                                pathname: `/physician/${element.physicianId}/`,
                            }}
                        >
                            <i className="far fa-eye" />
                        </Link>
                    ),
                });
            }
        });
        return cleanedPatients;
    };

    const visitData = cleanData();
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="visit-table">
                    <div className="table-titles">Patient Visits</div>
                    <div className="nav-buttons">
                        <button onClick={() => history.goBack()}>
                            Go Back
                        </button>
                        <button onClick={() => history.push('/')}>Home</button>
                    </div>
                    <Table columns={columns} rowData={visitData} />
                </div>
            )}
        </div>
    );
};

export default Visits;
