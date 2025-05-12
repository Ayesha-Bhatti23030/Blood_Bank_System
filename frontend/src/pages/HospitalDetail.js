import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../utilis/useAxios';
import Swal from 'sweetalert2';
import '../styles/HospitalDetails.css'; // Add custom CSS for styling

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
        <div className="hospital-detail-container">
            {/* Hospital Details Section */}
            <div className="hospital-profile">
                <h2 className="hospital-name">{hospital.name}</h2>
                <p className="hospital-address"><strong>Address:</strong> {hospital.address}</p>
                <p className="hospital-phone"><strong>Phone:</strong> {hospital.phone}</p>
            </div>

            {/* Blood Inventory Section */}
            <div className="blood-inventory">
                <h3>Blood Inventory</h3>
                {hospital.inventory.length === 0 ? (
                    <p>No blood stock available.</p>
                ) : (
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>Blood Group</th>
                                <th>Component</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospital.inventory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.blood_group}</td>
                                    <td>{item.blood_component}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default HospitalDetail;
