import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { PatientContext } from '../../context/patients/patientState';
import './patients.styles.scss';
import Table from '../../components/table/table';
import Loader from '../../components/loader';

const Patients = () => {
    const { getPatients, patients, loadData, loading } = useContext(
        PatientContext
    );
    useEffect(() => {
        loadData();
        getPatients();
    }, []);

    const columns = [
        'ID',
        'Patient Name',
        'Email',
        'Address',
        'Phone',
        'Date',
        'Visit Details',
    ];
    const cleanData = () => {
        let cleanedPatients: Array<object> = [];
        patients.map((element) => {
            if (patients.length > 0) {
                cleanedPatients.push({
                    id: element.id,
                    name: `${element.firstName} ${element.lastName}`,
                    email: element.email,
                    address: element.address,
                    phone: element.phone,
                    date: dayjs(element.since).format('MMMM D, YYYY h:mm A'),
                    details: (
                        <Link to={{ pathname: `/visits/${element.id}/` }}>
                            <i className="far fa-eye" />
                        </Link>
                    ),
                });
            }
        });
        return cleanedPatients;
    };

    const patientData = cleanData();
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="patients-table">
                    <div className="table-titles">Patients</div>
                    <Table columns={columns} rowData={patientData} />
                </div>
            )}
        </div>
    );
};

export default Patients;
