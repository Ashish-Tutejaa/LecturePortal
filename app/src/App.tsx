import React, {useRef} from 'react';
import './App.css';
import {TextField,Button} from '@material-ui/core';

const Login = () => {

  const fileRef = useRef<null | HTMLInputElement>(null);

  const textStyles = {
    width: '70%',
    margin: "5px 0px"
  }
  return <div className='authPanel'>
  <div className='login'>
    <h3>Sign In</h3>
    <TextField style={textStyles} label="Username"/>
    <TextField style={textStyles} label='Password'/>
    <Button style={{margin: "30px 0px"}} size='small' variant='outlined' color='primary' children='sign in'/>
  </div>
  <div className='vr'></div>
  <div className='signup'>
    <h3>Sign Up</h3>
    <TextField style={textStyles} label="Username"/>
    <TextField style={textStyles} label='Password'/>
    <TextField style={textStyles} label='Confirm Password'/>
    <Button onClick={() =>{
      if(fileRef.current !== null){
        fileRef.current.click();
      }
    }} style={{margin: "15px 0px"}} size='small' variant='contained' color='default' children='Select ID Photo'/>
    <Button size='small' variant='contained' color='primary' children='sign up'/>
    <input ref={fileRef} type='file' hidden></input>
  </div>
  </div>
}

const App = () => {
  return <div className='body-wrapper'>
    <Login/>
  </div>
}

export default App;