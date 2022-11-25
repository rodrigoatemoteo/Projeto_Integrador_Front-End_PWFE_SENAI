import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';

import "../LoginPage/Login.css";

const Cadastro = () => {

  const { cadastrar } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("click", { email, password });
    cadastrar(email, password);
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div id="login">
      <h1 className='title'>Cadastro de Conta</h1>
      <form className='form box' onSubmit={handleSubmit}>
        <div className='field'>
          <label htmlFor="email">Email:</label><br />
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={(event) => setEmail(event.target.value)} 
          />
        </div>
        <div className='field'>
          <label htmlFor="password">Password:</label><br />
          <input 
            type="password" 
            name="email" 
            id="password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}  
          />
        </div>
        <div className="actions">
          <button type="submit" id="cadastrar">Cadastrar conta</button><br />
          <button type="button" id="voltar" onClick={handleClick}>Voltar a tela de login</button>
        </div>
      </form>
    </div>
  )
};

export default Cadastro;