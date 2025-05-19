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
        picture: '',
    });
    const [error, setError] = useState<string | null>(null);


    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        setError(null);

        await instance.post('laborers', formData);
        navigate('/');
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.error) {

            //This is to find the error message from the response of the server
            console.log(err.response.data.error.errors[0].message);

            setError(err.response.data.error.errors[0].message); 
        } else {
            console.log(err);
            
            setError('Unexpected error occurred');
        }
    }
};

    return (
        <div className='newLaborer'>
            <h2 className='title'>Create a New Laborer</h2>
            <form onSubmit={handleSubmit} className="newLaborer__form">

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
                        <label htmlFor="picture">Picture URL:</label>
                        <input
                            id="picture"
                            name="picture"
                            placeholder="Picture URL"
                            value={formData.picture}
                            onChange={handleChange}
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