import React, { useEffect, useState } from 'react';
import useAxios from '../utilis/useAxios';
import Swal from 'sweetalert2';

const Donor = () => {
    const api = useAxios();
    const [donors, setDonors] = useState([]);
    const [newDonor, setNewDonor] = useState({
        cnic: '',
        name: '',
        age: '',
        gender: '',
        weight: '',
        history_of_disease: '',
        medication: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [editDonor, setEditDonor] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = (donor) => {
    setNewDonor(donor);
    setEditDonor(donor);  // Ensure the donor object has the correct data, especially the id.
    setIsEditing(true);
    };

    const GENDER_CHOICES = ['male', 'female', 'other'];

    const fetchDonors = async () => {
        try {
            const response = await api.get('/donors/');
            setDonors(response.data);
        } catch (error) {
            console.error('Failed to fetch donors:', error);
            Swal.fire('Error fetching data!', '', 'error');
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    const handleChange = (e) => {
        setNewDonor({ ...newDonor, [e.target.name]: e.target.value });
    };

    const validateCNICFormat = (cnic) => {
        const regex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
        return regex.test(cnic);
    };

    const handleAddDonor = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!validateCNICFormat(newDonor.cnic)) {
            errors.cnic = 'CNIC must be in format XXXXX-XXXXXXX-X';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try {
            const response = await api.post('/donors/', newDonor);
            setDonors([...donors, response.data]);
            Swal.fire('Donor added!', '', 'success');
            setNewDonor({
                cnic: '',
                name: '',
                age: '',
                gender: '',
                weight: '',
                history_of_disease: '',
                medication: '',
            });
        } catch (error) {
            console.error('Error adding donor:', error.response?.data || error);
            Swal.fire('Failed to add donor!', 'Check required fields', 'error');
        }
    };

        // When updating the donor information:
    const handleUpdateDonor = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!validateCNICFormat(newDonor.cnic)) {
            errors.cnic = 'CNIC must be in format XXXXX-XXXXXXX-X';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            // Using cnic instead of id
            const response = await api.put(`/donors/${editDonor.cnic}/`, newDonor);
            const updatedList = donors.map(d =>
                d.cnic === editDonor.cnic ? response.data : d
            );
            setDonors(updatedList);
            Swal.fire('Donor updated!', '', 'success');
            setNewDonor({
                cnic: '',
                name: '',
                age: '',
                gender: '',
                weight: '',
                history_of_disease: '',
                medication: '',
            });
            setIsEditing(false);
            setEditDonor(null);
        } catch (error) {
            console.error('Update error:', error);
            Swal.fire('Failed to update donor!', '', 'error');
        }
    };

    // When deleting a donor:
    const handleDeleteDonor = async (cnic) => {
        try {
            await api.delete(`/donors/${cnic}/`);  // Use cnic as identifier
            setDonors(donors.filter(donor => donor.cnic !== cnic));
            Swal.fire('Deleted successfully!', '', 'success');
        } catch (error) {
            console.error('Error deleting donor:', error);
            Swal.fire('Failed to delete!', '', 'error');
        }
    };

    

    return (
        <div className="container">
            <h2>Donor Management</h2>

            {/* Add Donor Form */}
            <form onSubmit={isEditing ? handleUpdateDonor : handleAddDonor}>
                <input
                    type="text"
                    name="cnic"
                    placeholder="CNIC (e.g. 42101-1234567-1)"
                    value={newDonor.cnic}
                    onChange={handleChange}
                    required
                    disabled={isEditing}
                    pattern="^[0-9]{5}-[0-9]{7}-[0-9]$"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newDonor.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={newDonor.age}
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    value={newDonor.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    {GENDER_CHOICES.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight"
                    value={newDonor.weight}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="history_of_disease"
                    placeholder="History of Disease"
                    value={newDonor.history_of_disease}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="medication"
                    placeholder="Medication"
                    value={newDonor.medication}
                    onChange={handleChange}
                />

                <button type="submit">{isEditing ? 'Update Donor' : 'Add Donor'}</button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);  // Reset editing state
                            setEditDonor(null);  // Reset the donor being edited
                            setNewDonor({
                                cnic: '',
                                name: '',
                                age: '',
                                gender: '',
                                weight: '',
                                history_of_disease: '',
                                medication: '',
                            });  // Reset the form fields
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Donor Table */}
            <table>
                <thead>
                    <tr>
                        <th>CNIC</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Weight</th>
                        <th>History of Disease</th>
                        <th>Medication</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {donors.map(donor => (
                        <tr key={donor.id}>
                            <td>{donor.cnic}</td>
                            <td>{donor.name}</td>
                            <td>{donor.age}</td>
                            <td>{donor.gender}</td>
                            <td>{donor.weight}</td>
                            <td>{donor.history_of_disease}</td>
                            <td>{donor.medication}</td>
                            <td>
                                <button onClick={() => handleEditClick(donor)}>Edit</button>
                                <button onClick={() => handleDeleteDonor(donor.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Donor;
