import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom"
import UserContext from './UserContext'

const Header = props => {
    const history = useHistory();
    const user = useContext(UserContext)
  
    if(user){
        return(
            <header>
                <Link to='/'>Blog Manager</Link>
                <nav>
                    <a href='https://lufere.dev/blog-API'>Blog Viewer</a>
                    <p>Welcome <span>{user.username}</span></p>
                    <button
                        onClick={()=>{
                            history.push('/login');
                            localStorage.clear();
                            // window.location.reload();
                            props.logout();
                        }}
                    >
                        Logout
                    </button>
                </nav>
            </header>
        )
    }else{
        return(
            <header>
                <Link to='/'>Blog Manager</Link>
                <nav>
                    <a href='https://lufere.dev/blog-API'>Blog Viewer</a>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign up</Link>
                </nav>
            </header>
        )
    }

}

export default Header