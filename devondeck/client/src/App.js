
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import DevRegisterForm from './components/devs/register';
import OrgRegisterForm from './components/orgs/register';
import DevLoginForm from './components/devs/login';
import Loginorg from './components/orgs/login';
import LanguagePage from './components/devs/skills/Languages'; 
import FrameworkPage from './components/devs/skills/Frameworks';
import NewPositionPage from './components/orgs/jobs/new';
import ShowJob from './components/orgs/jobs/job';
import OrgDashboardComponent from './components/orgs/dashboard';


function App() {

  
    return(
      <BrowserRouter>
        <div>
          <Routes>
          <Route path="/" element={<DevRegisterForm />} />
            <Route path="/devs/login" element={<DevLoginForm />} />
            <Route path="/devs/skills/Languages" element={<LanguagePage />} />
            <Route path="/devs/skills/Frameworks" element={<FrameworkPage />} />
            <Route path="/orgs/register" element={<OrgRegisterForm />} />
            <Route path="/orgs/login" element={<Loginorg />} />
            <Route path="/orgs/dashboard" element={<OrgDashboardComponent />} />
            <Route path="/orgs/jobs/:positionId" element={<ShowJob />} />
            <Route path="/orgs/jobs/new" element={<NewPositionPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }


export default App;
