/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import jwt from 'jsonwebtoken';

import Login from './Login';

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



  return (
    <BrowserRouter>
      <Switch>
        <Route>
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
