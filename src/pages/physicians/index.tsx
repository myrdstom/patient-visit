import React, { useEffect, useContext } from 'react';
import { PhysicianContext } from '../../context/physicians/physicianState';
import './physicians.styles.scss';
import Table from '../../components/table/table';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../../components/loader';

interface RouteParams {
    id: string
}

const Physicians = () => {
    const { getPhysician, physician, loadData, loading } = useContext(
        PhysicianContext
    );
    let {id} = useParams<RouteParams>();
    let history = useHistory();

    useEffect(() => {
        loadData();
        getPhysician(id);
    }, []);

    const columns = ['ID', 'Physician Name', 'Phone'];
    const cleanData = () => {
        let cleanedPatients = [];

        if (physician.id) {
            cleanedPatients.push({
                id: physician.id,
                name: `${physician.firstName} ${physician.lastName}`,
                phone: physician.phone,
            });
        }
        return cleanedPatients;
    };

    const physicianData = cleanData();
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="physician-table">
                    <div className="table-titles">Physician Seen</div>
                    <div className="nav-buttons">
                        <button onClick={() => history.goBack()}>
                            Go Back
                        </button>
                        <button onClick={() => history.push('/')}>Home</button>
                    </div>
                    <Table columns={columns} rowData={physicianData} />
                </div>
            )}
        </div>
    );
};

export default Physicians;
