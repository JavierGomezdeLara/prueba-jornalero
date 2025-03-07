/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
import React from 'react';
import LaborerDetail from './LaborerDetail';
import { DataProvider } from './Context';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
});

const Laborers = (): React.ReactElement => {
  const [data, setData] = useState<any>([])
  const [laborer, setLaborer] = useState<any>({})
  const [view, setView] = useState({ page: 'laborers', selectedLaborer: -1 })
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    if (view.page == 'laborers') {
      const fetchedData = fetchData();
      setData(fetchedData as any);
    }

    if (view.page == 'laborer-detail') {
      const newData = laborerfetchData();
      setLaborer(newData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.page])



  const LaborersBodyTable = React.memo(({ laborers }: {
    laborers: {
      id: number;
      firstName: string;
      lastName: string;
      hireDate: string;
      email: string;
      role: string;
    }[]
  }) => {
    const roleTag = (role: string) => {
      if (role == 'user') {
        return <div className='tag user'>User</div>
      } else if (role == 'admin') {
        return <div className='tag admin'>Admin</div>
      } else if (role == 'supervisor') {
        return <div className='tag supervisor'>Supervisor</div>
      } else {
        return <div className='tag'>Unknown</div>
      }
    }

    return (
      <tbody>
        {!!laborers.length &&
          laborers.map((laborer: any, index: number) => {
            const d = Number(new Date().getTime() - new Date(laborer.hireDate).getTime());
            const date = String(Math.floor(d / 86400000));
            const daysSinceHireDate = date + " " + "days ago";
            const laborerEmail = laborer.email;


            return (
              <tr>
                <td onClick={() => {
                  setView({ page: 'laborer-detail', selectedLaborer: index + 1 })
                }}>{
                   laborer.firstName + " " + laborer.lastName
                  }</td>
                <td>{laborerEmail}</td>
                                <td>{daysSinceHireDate}</td>

                <td>{roleTag(laborer.role)}</td>
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                                <th>Days since hired</th>

                <th>Role</th>
              </tr>
            </thead>
            <LaborersBodyTable laborers={data} />
          </table>)
      case 'laborer-detail':
        return <LaborerDetail laborer={data[view.selectedLaborer || 0].id} handleGoToLaborersPage={() => {
          setView({ page: 'laborers', selectedLaborer: -1 })
        }} />
    }
  }

  return (
    <>
      <DataProvider laborer={laborer}>
<h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
      Laborer CMS
    </h1>        {!loading && Page()}
      </DataProvider>
    </>
  )
}

export default Laborers
