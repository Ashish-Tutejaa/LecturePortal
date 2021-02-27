import React, { useRef } from 'react';
import './App.css';
import { TextField, Button } from '@material-ui/core';

const Login = () => {

  const fileRef = useRef<null | HTMLInputElement>(null);

  const textStyles = {
    width: '70%',
    margin: "5px 0px"
  }
  return <div className='authPanel'>
    <div className='login'>
      <h3>Sign In</h3>
      <TextField style={textStyles} label="Username" />
      <TextField style={textStyles} label='Password' />
      <Button style={{ margin: "30px 0px" }} size='small' variant='outlined' color='primary' children='sign in' />
    </div>
    <div className='signup'>
      <h3>Sign Up</h3>
        <TextField style={textStyles} label="Username" />
        <TextField style={textStyles} label='Password' />
        <TextField style={textStyles} label='Confirm Password' />
        <Button onClick={(e) => {
          e.preventDefault();
          if (fileRef.current !== null) {
            fileRef.current.click();
          }
        }} style={{ margin: "15px 0px" }} size='small' variant='contained' color='default' children='Select ID Photo' />
        <Button type='submit' onClick={(e) => {
          if(fileRef.current !== null && fileRef.current.files !== null){
            let blobURL = URL.createObjectURL(fileRef.current.files[0]);
            let newImg = new Image();
            
            newImg.onload = () => {
              let canvas : HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
              let context = canvas.getContext('2d'); 
              context?.drawImage(newImg,0,0);
              
              canvas.toBlob((i) => {
                console.log(i);
                fetch('http://localhost:5000/getData', {
                  method : "POST",
                  headers :{
                    'Content-Type' : 'application/octet-stream'
                  },
                  body : i
                })
              });
              }
            newImg.src = blobURL;
          }
        }} size='small' variant='contained' color='primary' children='sign up' />
        <input ref={fileRef} type='file' hidden></input>
        <canvas id='canvas' style={{display : 'none'}}/>
    </div>
  </div>
}

const App = () => {
  return <div className='body-wrapper'>
    <Login />
  </div>
}

export default App;