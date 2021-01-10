/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import jwt from 'jsonwebtoken';

import Login from './Login';
import Homepage from './Homepage'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();

  function onChange(e){
    let name = e.target.name;
    let value = e.target.value;
    if(name==='username') setUsername(value);
    if(name==='password') setPassword(value);
  }

  function checkExpiration(){
    if(localStorage.getItem('authToken')){
      var isExpired = false;
      const token = localStorage.getItem('authToken');
      var decodedToken = jwt.decode(token, {complete:true});
      var dateNow = new Date();
      if(decodedToken.payload.exp < dateNow.getTime()/1000) isExpired = true;
      // setCurrentUser(decodedToken.payload.username);
      if(isExpired){
        // setCurrentUser();
        localStorage.clear();
      }
      console.log(decodedToken.payload.username);
      // localStorage.setItem('currentUser', decodedToken.payload.username)
      // console.log(dateNow.getTime()/1000);
      console.log('EXPIRED ',isExpired);
    }
  }

  useEffect(()=>{
    // console.log('tokenLS', localStorage.getItem('authToken'));
    checkExpiration();
    // console.log('username:', currentUser);
  },[])

  useEffect(()=>console.log('set', currentUser),[currentUser])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          {/* <p>Welcome {currentUser}</p> 
          <p>Welcome {currentUser?currentUser:'Guest'}</p> 
          {!currentUser?<Link to='/login'>Login</Link>:null} */}
          <Homepage
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            checkExpiration={checkExpiration}
          />
        </Route>
        <Route path='/login'>
          <Login
            username={username}
            password={password}
            onChange={onChange}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          {/* <div className="App">
            <p>
              Initial commit
            </p>
          </div> */}
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
