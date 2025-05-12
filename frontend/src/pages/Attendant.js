import React, { useEffect, useState } from 'react';
import useAxios from '../utilis/useAxios';
import Swal from 'sweetalert2';

const Attendant = () => {
    const api = useAxios();
    const [attendants, setAttendants] = useState([]);
    const [newAttendant, setNewAttendant] = useState({
        cnic: '',
        name: '',
        contact: '',
        email: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [editAttendant, setEditAttendant] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchAttendants = async () => {
        try {
            const response = await api.get('/attendants/');
            setAttendants(response.data);
        } catch (error) {
            console.error('Failed to fetch attendants:', error);
            Swal.fire('Error fetching data!', '', 'error');
        }
    };

    useEffect(() => {
        fetchAttendants();
    }, []);

    const handleChange = (e) => {
        setNewAttendant({ ...newAttendant, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: '' }); // clear error on field change
    };

    const validateCNICFormat = (cnic) => {
        const regex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
        return regex.test(cnic);
    };

    const handleAddAttendant = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!validateCNICFormat(newAttendant.cnic)) {
            errors.cnic = 'CNIC must be in format XXXXX-XXXXXXX-X';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await api.post('/attendants/', newAttendant);
            setAttendants([...attendants, response.data]);
            Swal.fire('Attendant added!', '', 'success');
            setNewAttendant({ cnic: '', name: '', contact: '', email: '' });
            setFormErrors({});
        } catch (error) {
            const errorData = error.response?.data;
            if (errorData && typeof errorData === 'object') {
                setFormErrors(errorData);
            } else {
                Swal.fire('Failed to add attendant!', 'Unexpected error occurred.', 'error');
            }
        }
    };

    const handleUpdateAttendant = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!validateCNICFormat(newAttendant.cnic)) {
            errors.cnic = 'CNIC must be in format XXXXX-XXXXXXX-X';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await api.put(`/attendants/${editAttendant.cnic}/`, newAttendant);
            const updatedList = attendants.map(a =>
                a.cnic === editAttendant.cnic ? response.data : a
            );
            setAttendants(updatedList);
            Swal.fire('Attendant updated!', '', 'success');
            setNewAttendant({ cnic: '', name: '', contact: '', email: '' });
            setIsEditing(false);
            setEditAttendant(null);
            setFormErrors({});
        } catch (error) {
            const errorData = error.response?.data;
            if (errorData && typeof errorData === 'object') {
                setFormErrors(errorData);
            } else {
                Swal.fire('Failed to update attendant!', 'Unexpected error occurred.', 'error');
            }
        }
    };

    const handleDeleteAttendant = async (cnic) => {
        try {
            await api.delete(`/attendants/${cnic}/`);
            setAttendants(attendants.filter(a => a.cnic !== cnic));
            Swal.fire('Deleted successfully!', '', 'success');
        } catch (error) {
            console.error('Error deleting attendant:', error);
            Swal.fire('Failed to delete!', '', 'error');
        }
    };

    const handleEditClick = (attendant) => {
        setNewAttendant(attendant);
        setEditAttendant(attendant);
        setIsEditing(true);
        setFormErrors({});
    };

    return (
        <div className="container">
            <h2>Attendant Management</h2>

            <form onSubmit={isEditing ? handleUpdateAttendant : handleAddAttendant}>
                <input
                    type="text"
                    name="cnic"
                    placeholder="CNIC (e.g. 42101-1234567-1)"
                    value={newAttendant.cnic}
                    onChange={handleChange}
                    required
                    disabled={isEditing}
                    pattern="^[0-9]{5}-[0-9]{7}-[0-9]$"
                />
                {formErrors.cnic && <p className="error">{formErrors.cnic}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newAttendant.name}
                    onChange={handleChange}
                    required
                />
                {formErrors.name && <p className="error">{formErrors.name}</p>}

                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={newAttendant.contact}
                    onChange={handleChange}
                    required
                />
                {formErrors.contact && <p className="error">{formErrors.contact}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newAttendant.email}
                    onChange={handleChange}
                    required
                />
                {formErrors.email && <p className="error">{formErrors.email}</p>}

                <button type="submit">
                    {isEditing ? 'Update Attendant' : 'Add Attendant'}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setEditAttendant(null);
                            setNewAttendant({ cnic: '', name: '', contact: '', email: '' });
                            setFormErrors({});
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>CNIC</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendants.map(attendant => (
                        <tr key={attendant.cnic}>
                            <td>{attendant.cnic}</td>
                            <td>{attendant.name}</td>
                            <td>{attendant.contact}</td>
                            <td>{attendant.email}</td>
                            <td>
                                <button onClick={() => handleEditClick(attendant)}>Edit</button>
                                <button onClick={() => handleDeleteAttendant(attendant.cnic)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attendant;
