import { createContext, ReactNode,  } from 'react';

export const DataContext = createContext({});

export const DataProvider = ({ children,laborer }:{
    children:ReactNode,
    laborer:{
        id:number,
        picture:string,
        firstName:string,
        lastName:string,
        email:string,
        role:string,
        hireDate:string,
    }
}) => {

  return (
    <DataContext.Provider value={{ laborer }}>
      {children}
    </DataContext.Provider>
  );
};
