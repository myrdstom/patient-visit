import React, {FC} from 'react';

import './table.styles.scss';


const Table= ({columns, rowData}) => {


    return (
        <div >
            <div className="container-table100">
                <div className="wrap-table100">
                    <div className="table100">
                        <table>
                            <thead>
                                <tr className="table100-head">
                                    {columns.map((column, i) => (
                                        <th className="column1" key={i}>{column}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rowData.map((data) => (
                                    <tr key={data.id}>
                                        {Object.values(data).map((item,i) => (
                                            <td className="column1" key={i}>{item}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
