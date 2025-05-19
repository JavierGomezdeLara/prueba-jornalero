import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LaborerDetail from './LaborerDetail';
import { Laborer } from '../types';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
});

//This is a middleware so we can separate the logic of requesting a certain laborer

const LaborerRouteWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laborer, setLaborer] = useState<Laborer | null>(null);

  //We make a call to the API to get a certain laborer

  useEffect(() => {
    const fetchLaborer = async () => {
      try {
        const response = await instance.get<Laborer>(`laborers/${id}`);
        setLaborer(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchLaborer();
  }, [id]);

  if (!laborer) return <p>Loading...</p>;

  //And if it exists we pass it down with props to another component

  return <LaborerDetail laborer={laborer} handleGoToLaborersPage={() => navigate('/')} />;
};

export default LaborerRouteWrapper;
