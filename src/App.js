/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import './App.scss';
import jwt from 'jsonwebtoken';

import Login from './Login';
import Homepage from './Homepage';
import BlogCreate from './BlogCreate';
import BlogEdit from './BlogEdit';
import Header from './Header';
import Signup from './Signup';


import { UserProvider } from './UserContext'


function App() {
  // const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [userPosts, setUserPosts] = useState();
  const [editAuthor, setEditAuthor] = useState();
  const [errors, setErrors] = useState();
  const [expired, setExpired] = useState(false);

  function onChange(e){
    let name, value;
    if(e.target){
      name = e.target.name;
      value = e.target.value;
    }else{
      name = 'content';
      value = e;
      // value = htmlDecode(e);
    }
    // console.log(name, value);
    if(name==='username') setUsername(value);
    if(name==='password') setPassword(value);
    if(name==='title') setTitle(value);
    if(name==='content') setContent(value);
    if(name==='published') setPublished(!published);
  }

  function logout(){
    setCurrentUser(null);
    // history.push('/login');
  }

  function reset(){
    setUsername('');
    setPassword('');
  }

  function sessionExpired(){
    setErrors('Session Expired, Log in again');
    setExpired(true);
    logout();
    localStorage.clear();
  }

  function checkExpiration(){
    if(localStorage.getItem('authToken')){
      var isExpired = false;
      const token = localStorage.getItem('authToken');
      var decodedToken = jwt.decode(token, {complete:true});
      var dateNow = new Date();
      if(decodedToken.payload.exp < dateNow.getTime()/1000) isExpired = true;
      let payload = decodedToken.payload;
      payload.token = token;
      if(isExpired){
        // setCurrentUser();
        localStorage.clear();
        return true
      }else{
        setCurrentUser(payload);
        return false
      }
      // console.log(decodedToken.payload.username);
      // localStorage.setItem('currentUser', decodedToken.payload.username)
      // console.log(dateNow.getTime()/1000);
      // console.log('EXPIRED ',isExpired);
    }
  }

  useEffect(()=>{
    // console.log('tokenLS', localStorage.getItem('authToken'));
    // console.log('hi')
    checkExpiration();
    // localStorage.clear()
  },[])

  // useEffect(()=>console.log('USER POSTS', userPosts),[userPosts])
  // useEffect(()=>console.log('set', currentUser),[currentUser])

  return (
    <UserProvider value={currentUser}>
      <HashRouter>
        <Header
          checkExpiration={checkExpiration}
          logout={logout}
        />
        <Switch>
          <Route exact path='/'>
            <Homepage
              errors={errors}
              setErrors={setErrors}
              // currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              checkExpiration={checkExpiration}
              sessionExpired={sessionExpired}
              setExpired={setExpired}
              logout={logout}
              userPosts={userPosts}
              setUserPosts={setUserPosts}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              published={published}
              setPublished={setPublished}
              setEditAuthor={setEditAuthor}
            />
          </Route>
          <Route exact path='/login'>
            <Login
              errors={errors}
              setErrors={setErrors}
              expired={expired}
              username={username}
              password={password}
              reset={reset}
              onChange={onChange}
              // currentUser={currentUser}
              checkExpiration={checkExpiration}
              setCurrentUser={setCurrentUser}
            />
          </Route>
          <Route exact path='/signup'>
            <Signup
              errors={errors}
              setErrors={setErrors}
              reset={reset}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              onChange={onChange}
            />
          </Route>
          <Route exact path='/posts/'>
            <BlogCreate
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              published={published}
              setPublished={setPublished}
              onChange={onChange}
              checkExpiration={checkExpiration}
            />
          </Route>
          <Route exact path='/posts/:id'>
            <BlogEdit
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              published={published}
              setPublished={setPublished}
              onChange={onChange}
              checkExpiration={checkExpiration}
              editAuthor={editAuthor}
              setEditAuthor={setEditAuthor}
            />
          </Route>
        </Switch>
      </HashRouter>
    </UserProvider>

  );
}

export default App;
