/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import jwt from 'jsonwebtoken';

import Login from './Login';
import Homepage from './Homepage';
import BlogCreate from './BlogCreate';
import BlogEdit from './BlogEdit';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [userPosts, setUserPosts] = useState();
  const [editAuthor, setEditAuthor] = useState();

  function onChange(e){
    let name = e.target.name;
    let value = e.target.value;
    if(name==='username') setUsername(value);
    if(name==='password') setPassword(value);
    if(name==='title') setTitle(value);
    if(name==='content') setContent(value);
    if(name==='published') setPublished(!published);
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
      // console.log(decodedToken.payload.username);
      // localStorage.setItem('currentUser', decodedToken.payload.username)
      // console.log(dateNow.getTime()/1000);
      console.log('EXPIRED ',isExpired);
    }
  }

  useEffect(()=>{
    // console.log('tokenLS', localStorage.getItem('authToken'));
    console.log('hi')
    checkExpiration();
    // localStorage.clear()
  },[])

  useEffect(()=>console.log('USER POSTS', userPosts),[userPosts])
  // useEffect(()=>console.log('set', currentUser),[currentUser])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Homepage
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            checkExpiration={checkExpiration}
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
        <Route path='/login'>
          <Login
            username={username}
            password={password}
            onChange={onChange}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
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
        <Route path='/posts/:id'>
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
    </BrowserRouter>

  );
}

export default App;
