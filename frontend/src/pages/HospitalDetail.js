import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../utilis/useAxios';
import Swal from 'sweetalert2';

const HospitalDetail = () => {
    const { id } = useParams();  // Get hospital ID from URL
    const axiosInstance = useAxios();
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/hospitals/${id}/`)
            .then(response => {
                setHospital(response.data);
            })
            .catch(error => {
                console.error('Error fetching hospital details:', error);
                Swal.fire('Error!', 'Unable to fetch hospital details.', 'error');
            });
    }, [id]);

    if (!hospital) return <p>Loading hospital details...</p>;

    return (
        <div>
            <h2>{hospital.name}</h2>
            <p><strong>Address:</strong> {hospital.address}</p>
            <p><strong>Phone:</strong> {hospital.phone}</p>

            <h3>Blood Inventory</h3>
            {hospital.inventory.length === 0 ? (
                <p>No blood stock available.</p>
            ) : (
                <ul>
                    {hospital.inventory.map((item, index) => (
                        <li key={index}>
                            Blood Group: {item.blood_group} | Component: {item.blood_component} | Quantity: {item.quantity} | Price: {item.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HospitalDetail;
