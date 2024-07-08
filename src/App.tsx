import React from 'react';
import './style/starterstyles.css'
import Header from './components/header';
import CreatePage from './components/create-sample-page';
import { SharePage } from './components/share-sample-page';
import { HomePage } from './components/home-page';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

const App: React.FC = () => {
  return (

    <Router>
      <header><Header /></header>
      <main>
        <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/create-sample/:id" element = {<CreatePage />} />
          <Route path = "/share-sample-page/:id" element = {<SharePage />} />
  


        </Routes>
      
      </main>
    </Router>

   

  );
};

export default App;