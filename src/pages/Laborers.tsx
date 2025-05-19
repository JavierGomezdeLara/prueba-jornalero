import { useEffect, useState } from 'react';
import '../style/App.scss';
import axios from 'axios';
import React from 'react';
import LaborerDetail from './LaborerDetail';
import { Laborer } from '../types';
import { Link } from 'react-router-dom';


const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
});

const Laborers = (): React.ReactElement => {

  // States: we define Laborers with the type, and set the view to change the components

  const [data, setData] = useState<Laborer[]>([]);
  const [laborer, setLaborer] = useState<Laborer | null>(null);
  const [view, setView] = useState({ page: 'laborers', selectedLaborer: -1 });
  const [loading, setLoading] = useState(false);

  // we define the useEffects to fetch the data depending on the value of the view 


  useEffect(() => {
    setLoading(true);

    if (view.page === 'laborers') {
      fetchData();
    }

    if (view.page === 'laborer-detail') {
      fetchLaborer();
    }
  }, [view.page]);

  const fetchData = async () => {
    try {
      const response = await instance.get<Laborer[]>('laborers');
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLaborer = async () => {
    try {
      const response = await instance.get<Laborer>(`laborers/${view.selectedLaborer}`);
      setLaborer(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //Here we reach the table body, that we separate from the rest of the table for more comfort

  const LaborersBodyTable = React.memo(({ laborers }: { laborers: Laborer[] }) => {
    return (
      <tbody>
        {laborers.map((laborer: Laborer) => {
          const daysSinceHire = Math.floor(
            (Date.now() - new Date(laborer.hireDate).getTime()) / 86400000
          );
          return (
            <tr key={laborer.id}>
              <td
                onClick={() =>
                  setView({ page: 'laborer-detail', selectedLaborer: laborer.id })
                }
              >
                <span className='tableWrapper__name'>
                  {laborer.firstName} {laborer.lastName}
                </span>
              </td>
              <td>{laborer.email}</td>
              <td>{`${daysSinceHire} days ago`}</td>
              <td className={`tableWrapper__role tableWrapper__role--${laborer.role}`}>
                <span className={'tag ' + laborer.role}>{laborer.role}</span>
              </td>
              <td >
                <Link to={"/editLaborer/"+laborer.id} className='tableWrapper__editButton'> Edit </Link>


              </td>
            </tr>
          );
        })}
      </tbody>
    );
  });

    //Here we make the rest of the table OR change the component we load

  const Page = () => {
    switch (view.page) {
      case 'laborers':
        return (
          <>
          <div className='createWrapper'>
            <Link to="/newLaborer" className='createWrapper__create'>
              Add New Laborer
            </Link>
          </div>
          <div className='tableWrapper'>
            
            <table className='tableWrapper__workerTable'>
              <thead className='tableWrapper__head'>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Days since hired</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <LaborersBodyTable laborers={data} />
            </table>
          </div>
          </>
        );
      case 'laborer-detail':
        return laborer ? (
          <LaborerDetail
            laborer={laborer}
            handleGoToLaborersPage={() =>
              setView({ page: 'laborers', selectedLaborer: -1 })
            }
          />
        ) : (
          <p>Loading laborer...</p>
        );
    }
  };

  return (
    <>
      <h1 className='title'>Laborer CMS</h1>
      {!loading && Page()}
    </>
  );
};

export default Laborers;
