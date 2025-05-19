import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
});


// We create an interface to help us recieve and shape the Data, so we
// can make it a datatype

interface FormDataShape {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  hireDate: string;
}

const EditLaborer = () => {
  //Take the parameters from the url and define the navigate
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  //States, defining formData and the picture so we can store it for later

  const [formData, setFormData] = useState<FormDataShape>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    hireDate: '',
  });
  const [picture, setPicture] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  //We call the API to get the data for the form

  useEffect(() => {
    if (!id) return;
    instance
      .get(`laborers/${id}`)
      .then(res => {
        const { firstName, lastName, email, role, hireDate } = res.data;
        setFormData({
          firstName,
          lastName,
          email,
          role,

          hireDate: hireDate.substring(0, 10),
        });
      })
      .catch(console.error);
  }, [id]);

    //Functions for handling the change of the inputs AND the one for the picture


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture(e.target.files[0]);
    }
  };

    // Handle the submit, we send new data and only rewrite the new data


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!id) {
      setError('Invalid laborer ID');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val as string);
    });
    if (picture) {
      data.append('picture', picture);
    }

    try {
      await instance.put(`laborers/${id}`, data, {
        //The headers here is because we send an image
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/');
    } catch (err: any) {
      const msg = err.response?.data?.error;
      setError(typeof msg === 'string' ? msg : 'Unexpected error occurred');
    }
  };

  return (
    <div className='newLaborer'>
      <h2 className='title'>Edit Laborer</h2>
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
            <label htmlFor="picture">Picture (optional):</label>
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
            <button type="submit" className='newLaborer__create'>Save</button>
            <Link to={'/'} className='newLaborer__create newLaborer__create--back'>Back</Link>
          </div>

        </div>
      </form>
    </div>
  );
};

export default EditLaborer;
