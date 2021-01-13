import { Link, useHistory } from "react-router-dom"

const Signup = props => {
    const history = useHistory();
    
    function onSubmit(e){
        e.preventDefault();
        fetch('/sign-up',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                "username":props.username,
                "password":props.password,
                "creator":true
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status===400){
                console.log('info', data.errors)
                if(data.info && data.info.message) alert(data.info.message);
                if(data.errors){
                    data.errors.forEach(error=>alert(error.msg))
                }
                props.setPassword('');
            }
            if(data.status===200){
                let token = data.token;
                let user = data.user;
                console.log('user', data.user)
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('authToken', token);
                props.setUsername('');
                props.setPassword('');
                history.push('/');
            }
        })
        .catch(err=>console.error(err))
    }

    return(
        <div className='userFormContainer'>
            <div className='userForm'>
                <h3>Sign up</h3>
                <form>
                    <label> Username
                        <input type='text' name='username' value={props.username} onChange={props.onChange}></input>
                    </label>
                    <label> Password
                        <input type='password' name='password' value={props.password} onChange={props.onChange}></input>
                    </label>
                    <p>Already have an account? <Link to='/login'> Log In</Link></p>
                    <button className='signupSubmit' type='submit' onClick={onSubmit}>Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup