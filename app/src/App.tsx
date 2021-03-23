import React, { useContext } from 'react';
import { Login, toLogin } from './components/Login';
import { Home, toHome } from './components/Home';
import IsLoggedIn from './components/IsLoggedIn';
import './App.css';
import { GuidingContext } from './Navigator';

const App = () => {

  const GuideCtx = useContext(GuidingContext);

  const pages: { [prop: string]: (props: any) => JSX.Element | null } = {
    "/": Home
  }

  const ToRender = pages[GuideCtx.currentPath.path];

  return <div className='body-wrapper'>
    <IsLoggedIn>
      <ToRender />
    </IsLoggedIn>
  </div>

}

export default App;