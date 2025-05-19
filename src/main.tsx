import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Laborers from './pages/Laborers';
import './style/App.scss';
import LaborerRouteWrapper from './pages/LaborerRouteWrapper';
import CreateLaborer from './pages/CreateLaborer';
import EditLaborer from './pages/EditLaborer';

ReactDOM.createRoot(document.getElementById('root')!).render(


  <React.StrictMode>
    <BrowserRouter>
  
  {/* Routes for the diferent views, including new laborer and edit */}
  
      <Routes>
        <Route path="/" element={<Laborers />} />
        <Route path="/laborer/:id" element={ <LaborerRouteWrapper /> } />
        <Route path='/newLaborer' element = {<CreateLaborer/>} />
        <Route path='/editLaborer/:id' element = {<EditLaborer/>} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);