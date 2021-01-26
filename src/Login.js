/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
const Login = props => {
    const history = useHistory();

    useEffect(()=>{
        if(!props.expired) props.setErrors();
        // if(props.expired) props.setErrors('Session Expired, Log in again');
        props.reset();
    },[])

    function onSubmit(e){
        console.log(props.errors)
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
                props.checkExpiration();
                props.reset();
                props.setErrors();
                // props.setCurrentUser(data.user.username);
                history.push('/');
            }else if(data.status === 400){
                props.setErrors(data.info.message);
            }
        })
        return () =>{
            console.log('UNMOUNTED')
            props.reset();
        }
    }



    return(
        <div className='userFormContainer'>
            {props.errors?<div className='errorBanner'>{props.errors}</div>:null}
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