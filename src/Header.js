import React, { useContext } from "react";
import { Link } from "react-router-dom"
import UserContext from './UserContext'

const Header = props => {
    const user = useContext(UserContext)
    console.log('USER', user)
    if(user){
        return(
            <header>
                <Link to='/'>Blog Manager</Link>
                <nav>
                    <a href='https://lufere.dev/blog-API'>Blog Viewer</a>
                    <p>Welcome <span>{user.username}</span></p>
                    {/* <p>{user?user.username:'none'}</p> */}
                    <button
                        onClick={()=>{
                            localStorage.clear();
                            // window.location.reload();
                            props.logout();
                        }}
                    >
                        Logout
                    </button>
                    {/* <Link to='/signup'>Sign up</Link> */}
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
                    {/* <p>{user?user:'none'}</p> */}
                </nav>
            </header>
        )
    }

}

export default Header