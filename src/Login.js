
const Login = props => {

    function onSubmit(e){
        e.preventDefault();
        fetch('/login',{
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
                props.setCurrentUser(data.user.username);
            }
        })
    }
    
    function test(e){
        e.preventDefault();
        console.log(props.currentUser);
    }

    return(
        <div>
            <h2>Sign in</h2>
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
                <button
                    type='submit'
                    onClick={onSubmit}
                >Log In</button>
                <button onClick={test}>TEST</button>
            </form>
        </div>
    );
}

export default Login