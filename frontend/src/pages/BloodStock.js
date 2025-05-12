import React, { useEffect, useState } from 'react';
import useAxios from '../utilis/useAxios';
import Swal from 'sweetalert2';
import "../styles/Donor.css";

const BloodStock = () => {
    const api = useAxios();
    const [bloodStocks, setBloodStocks] = useState([]);
    const [newStock, setNewStock] = useState({
        donor_cnic: '',
        hospital_license: '',
        blood_group: '',
        blood_component: '',
        blood_test_result: '',
        collection_date: '',
        storage_location: '',
        price: '',
    });

    const isValidCnic = (cnic) => {
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    return cnicPattern.test(cnic);
    };

    const [editStock, setEditStock] = useState(null); // holds stock being edited
    const [isEditing, setIsEditing] = useState(false); // flag for edit mode

    const handleEditClick = (stock) => {
        setNewStock(stock);
        setEditStock(stock);
        setIsEditing(true);
    };

    const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const BLOOD_COMPONENTS = ['Whole Blood', 'Plasma', 'Platelets', 'Red Cells'];

    // Fetch existing stock
    const fetchBloodStocks = async () => {
        try {
            const response = await api.get('/bloodstocks/');
            setBloodStocks(response.data);
        } catch (error) {
            console.error('Failed to fetch blood stocks', error);
            Swal.fire('Error fetching data!', '', 'error');
        }
    };

    useEffect(() => {
        fetchBloodStocks();
    }, []);

    const handleChange = (e) => {
        setNewStock({ ...newStock, [e.target.name]: e.target.value });
    };

    const handleAddStock = async (e) => {
        e.preventDefault();

        if (!isValidCnic(newStock.donor_cnic)) {
        Swal.fire('Invalid CNIC Format!', 'CNIC must be in XXXXX-XXXXXXX-X format.', 'error');
        return;
        }
        try {
            const response = await api.post('/bloodstocks/', newStock);
            setBloodStocks([...bloodStocks, response.data]);
            Swal.fire('Blood stock added!', '', 'success');
            setNewStock({
                donor_cnic: '',
                hospital_license: '',
                blood_group: '',
                blood_component: '',
                blood_test_result: '',
                collection_date: '',
                storage_location: '',
                price: '',
            });
        } catch (error) {
            const errorData = error.response?.data;
            let message = 'Failed to add stock!';
            if (errorData && typeof errorData === 'object') {
                message = Object.entries(errorData)
                    .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
                    .join('\n');
            }
            Swal.fire('Validation Error', message, 'error');
        }
    };

    const handleDeleteStock = async (id) => {
        try {
            await api.delete(`/bloodstocks/${id}/`);
            setBloodStocks(bloodStocks.filter(stock => stock.id !== id));
            Swal.fire('Deleted successfully!', '', 'success');
        } catch (error) {
            console.error('Error deleting stock:', error);
            Swal.fire('Failed to delete!', '', 'error');
        }
    };

    const handleUpdateStock = async (e) => {
        e.preventDefault();

        if (!isValidCnic(newStock.donor_cnic)) {
        Swal.fire('Invalid CNIC Format!', 'CNIC must be in XXXXX-XXXXXXX-X format.', 'error');
        return;
        }

        try {
            const response = await api.put(`/bloodstocks/${editStock.unique_identifier}/`, newStock);
            const updatedStocks = bloodStocks.map(stock =>
                stock.unique_identifier === editStock.unique_identifier ? response.data : stock
            );
            setBloodStocks(updatedStocks);
            setNewStock({
                donor_cnic: '',
                hospital_license: '',
                blood_group: '',
                blood_component: '',
                blood_test_result: '',
                collection_date: '',
                storage_location: '',
                price: '',
            });
            setEditStock(null);
            setIsEditing(false);
            Swal.fire('Stock updated successfully!', '', 'success');
        } catch (error) {
            const errorData = error.response?.data;
            let message = 'Failed to update stock!';
            if (errorData && typeof errorData === 'object') {
                message = Object.entries(errorData)
                    .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
                    .join('\n');
            }
            Swal.fire('Validation Error', message, 'error');
            }
    };

    return (
        <div className="container">
            <h2>Blood Stock Management</h2>

            {/* Add or Edit Blood Stock Form */}
            <form onSubmit={isEditing ? handleUpdateStock : handleAddStock} className='donor-form'>
                <input type="text" name="donor_cnic" placeholder="Donor CNIC" value={newStock.donor_cnic} onChange={handleChange} required />
                <input type="text" name="hospital_license" placeholder="Hospital License" value={newStock.hospital_license} onChange={handleChange} required />

                <select name="blood_group" value={newStock.blood_group} onChange={handleChange} required>
                    <option value="">Select Blood Group</option>
                    {BLOOD_GROUPS.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>

                <select name="blood_component" value={newStock.blood_component} onChange={handleChange} required>
                    <option value="">Select Component</option>
                    {BLOOD_COMPONENTS.map(comp => (
                        <option key={comp} value={comp}>{comp}</option>
                    ))}
                </select>

                <input type="text" name="blood_test_result" placeholder="Blood Test Result" value={newStock.blood_test_result} onChange={handleChange} required />
                <input type="date" name="collection_date" value={newStock.collection_date} onChange={handleChange} required />
                <input type="text" name="storage_location" placeholder="Storage Location" value={newStock.storage_location} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={newStock.price} onChange={handleChange} required />

                <button type="submit">{isEditing ? 'Update BloodStock' : 'Add BloodStock'}</button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setEditStock(null);
                            setNewStock({
                                donor_cnic: '',
                                hospital_license: '',
                                blood_group: '',
                                blood_component: '',
                                blood_test_result: '',
                                collection_date: '',
                                storage_location: '',
                                price: '',
                            });
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Blood Stocks Table */}
            <table>
                <thead>
                    <tr>
                        <th>Donor CNIC</th>
                        <th>Blood Group</th>
                        <th>Component</th>
                        <th>Collection Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bloodStocks.map(stock => (
                        <tr key={stock.unique_identifier}>
                            <td>{stock.donor_cnic}</td>
                            <td>{stock.blood_group}</td>
                            <td>{stock.blood_component}</td>
                            <td>{stock.collection_date}</td>
                            <td>{stock.status}</td>
                            <td>
                                <button onClick={() => handleDeleteStock(stock.unique_identifier)}>Delete</button>
                                <button onClick={() => handleEditClick(stock)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BloodStock;
