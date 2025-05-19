import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
});

const CreateLaborer = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'user',
        hireDate: '',
    });
    const [picture, setPicture] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const data = new FormData();
        for (const key in formData) {
            data.append(key, (formData as any)[key]);
        }
        if (picture) {
            data.append('picture', picture);
        }

        try {
            await instance.post('laborers', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (err: any) {
            if (err.response?.data?.error) {
                console.log(err.response.data.error);
                setError(err.response.data.error);
            } else {
                console.error(err);
                setError('Unexpected error occurred');
            }
        }
    };

    return (
        <div className='newLaborer'>
            <h2 className='title'>Create a New Laborer</h2>
            <form onSubmit={handleSubmit} className="newLaborer__form" encType="multipart/form-data">
                <div className='newLaborer__formWrapper'>
                    <div className='newLaborer__formGroup'>
                        <label htmlFor="fname">First Name:</label>
                        <input
                            id="fname"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='newLaborer__formGroup'>
                        <label htmlFor="lname">Last Name:</label>
                        <input
                            id="lname"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='newLaborer__formGroup'>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='newLaborer__formGroup'>
                        <label htmlFor="picture">Picture:</label>
                        <input
                            id="picture"
                            name="picture"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className='newLaborer__formGroup'>
                        <label htmlFor="hireDate">Hire Date:</label>
                        <input
                            id="hireDate"
                            name="hireDate"
                            type="date"
                            value={formData.hireDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='newLaborer__formGroup'>
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

                    <div className='newLaborer__submitWrapper'>
                        <button type="submit" className='newLaborer__create'>Create</button>
                        <Link to={'/'} className='newLaborer__create newLaborer__create--back'>Back</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateLaborer;
