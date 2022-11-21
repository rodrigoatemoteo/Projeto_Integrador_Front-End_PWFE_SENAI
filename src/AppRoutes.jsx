import React, { useContext } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/Home';
import Cadastro from './pages/Cadastro/Cadastro';

import { AuthProvider, AuthContext } from './contexts/auth';

const AppRoutes = () => {

  const Private = ({children}) => {
  
    const { loading } = useContext(AuthContext);

    if(loading){
      return <div className='loading'>Carregando...</div>
    }

    const { authenticated } = useContext(AuthContext);

    if(!authenticated){
      return <Navigate to='/login' />
    }

    return children;

  };

  return(
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/cadastro" element={<Cadastro />} />
          <Route exact path="/" element={
            <Private>
              <HomePage />
            </Private>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default AppRoutes;