import React from 'react';
import { Login } from './components/Login'
import { Home } from './components/Home'
import './App.css';
import Guide from './Navigator';

const App = () => {
  return <Guide>
    <div className='body-wrapper'>
      <Login href="/" />
      <Home href="/home" />
    </div>
  </Guide>

}

export default App;