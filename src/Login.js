import { Link, useHistory } from "react-router-dom";
const Login = props => {
    const history = useHistory();

    function onSubmit(e){
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API}/login`,{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: props.username,
                password: props.password
            })
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            if(data.status===200){
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                // props.setCurrentUser(data.user.username);
                history.push('/');
            }
        })
    }



    return(
        
        <div className='userFormContainer'>

            <div className='userForm'>
                <h3>Log in</h3>
                <form>
                    <label> Username:
                        <input
                            type='text'
                            name='username'
                            value={props.username}
                            onChange={props.onChange}
                        />
                    </label>
                    <label> Password:
                        <input
                            type='password'
                            name='password'
                            value={props.password}
                            onChange={props.onChange}
                        />
                    </label>
                        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                    <button
                        type='submit'
                        onClick={onSubmit}
                    >Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login