import { Link } from 'react-router-dom';

const Homepage = props => {
    props.checkExpiration();
    if(localStorage.getItem('currentUser')){
        return(
            <div>
                {/* <Link to='/login'>Login</Link> */}
                Welcome {localStorage.getItem('currentUser')}
            </div>
        );
    }else{
        return(
            <div>
                <Link to='/login'>Login</Link>
                Welcome guest
            </div>
        );
    }
}

export default Homepage