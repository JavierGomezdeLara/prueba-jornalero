/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './style/App.scss'
import axios from 'axios'
import React from 'react';
import LaborerDetail from './LaborerDetail';
import { DataProvider } from './context/Context';
import { Laborer } from './types';


const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
});



const Laborers = (): React.ReactElement => {


  const [data, setData] = useState<Laborer[]>([])
  const [laborer, setLaborer] = useState<Laborer>();

  const [view, setView] = useState({ page: 'laborers', selectedLaborer: -1 });
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    setLoading(true);

    if (view.page === 'laborers') {
      fetchData();
    }

    if (view.page == 'laborer-detail') {
      laborerfetchData();
    }

  }, [view.page])

  const fetchData = async () => {
    await instance.get('laborers', { method: 'GET' }).then((response) => {
      setData(response.data);
      setLoading(false);
    })
  }

  const laborerfetchData = async () => {
    await instance.get(`laborers/${view.selectedLaborer}`, { method: 'GET' }).then((response) => {
      setLaborer(response.data);
      setLoading(false);
    })
  }

  const LaborersBodyTable = React.memo(({ laborers }: { laborers: Laborer[] }) => {


    return (
      <tbody>
        {!!laborers.length &&

          laborers.map((laborer: Laborer, index: number) => {

            const d = Number(new Date().getTime() - new Date(laborer.hireDate).getTime());
            const date = String(Math.floor(d / 86400000));
            const daysSinceHireDate = date + " " + "days ago";
            const laborerEmail = laborer.email;


            return (
              <tr>
                <td onClick={() => {
                  setView({ page: 'laborer-detail', selectedLaborer: index + 1 })
                }}><span className='tableWrapper__name'>{
                  laborer.firstName + " " + laborer.lastName
                }</span></td>
                <td>{laborerEmail}</td>
                <td>{daysSinceHireDate}</td>

                <td className={`tableWrapper__role tableWrapper__role--${laborer.role}`}>{<span className={'tag ' + laborer.role}>{laborer.role}</span>}</td>
              </tr>
            );
          })}
      </tbody>
    );
  });

  const Page = () => {
    switch (view.page) {
      case 'laborers':
        return (
          <>
            <div className='tableWrapper'>


              <table className='tableWrapper__workerTable'>
                <thead className='tableWrapper__head'>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Days since hired</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <LaborersBodyTable laborers={data} />
              </table>

            </div>

          </>)
      case 'laborer-detail':
        return <LaborerDetail laborer={data[view.selectedLaborer || 0].id} handleGoToLaborersPage={() => {
          setView({ page: 'laborers', selectedLaborer: -1 })
        }} />
    }
  }

  return (
    <>
      <DataProvider laborer={laborer}>
        <h1 className='title'>
          Laborer CMS
        </h1>        {!loading && Page()}
      </DataProvider>
    </>
  )
}

export default Laborers
