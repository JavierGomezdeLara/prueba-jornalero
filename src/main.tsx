import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Laborers from './pages/Laborers';
import './style/App.scss';
import LaborerRouteWrapper from './pages/LaborerRouteWrapper';
import CreateLaborer from './pages/CreateLaborer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Laborers />} />
        <Route path="/laborer/:id" element={ <LaborerRouteWrapper /> } />
        <Route path='/newLaborer' element = {<CreateLaborer/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);