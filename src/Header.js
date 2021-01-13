import { Link } from "react-router-dom"

const Header = props => {
    if(localStorage.getItem('currentUser')){
        return(
            <header>
                <Link to='/'>Blog Manager</Link>
                <nav>
                    <a href='https://lufere.dev/blog-API'>Blog Viewer</a>
                    <p>Welcome {JSON.parse(localStorage.getItem('currentUser')).username}</p>
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
                </nav>
            </header>
        )
    }

}

export default Header