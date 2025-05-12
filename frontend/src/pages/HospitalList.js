import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxios from '../utilis/useAxios'; // adjust path based on your file structure

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const axiosInstance = useAxios();  // ✅ use your custom axios hook

    useEffect(() => {
        axiosInstance.get('/hospitals/')
            .then(response => {
                console.log('Fetched hospitals:', response.data); // ✅ See what you got
                setHospitals(response.data);
            })
            .catch(error => {
                console.error('Error fetching hospital data:', error);
                Swal.fire('Error!', 'Unable to fetch hospital data.', 'error');
            });
    }, []);

    return (
        <div className="hospital-list">
            <h2>Hospitals</h2>
            <ul>
                {hospitals.map(hospital => (
                    
                    <li key={hospital.id}>
                        <Link to={`/hospitals/${hospital.id}`}>
                            {hospital.name} - {hospital.address}
                        </Link>
                    </li>
                    
                )
                )}
            </ul>
        </div>
    );
};

export default HospitalList;
