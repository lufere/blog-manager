// import React from 'react';

import { useHistory } from "react-router-dom";

const BlogCreate = props => {
    const history = useHistory();
    function onSubmit(e){
        e.preventDefault();
        props.checkExpiration();
        if(!localStorage.getItem('authToken')) {
            history.push('./login')
        }else{
            fetch(`${process.env.REACT_APP_API}/posts`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + localStorage.getItem('authToken')
                },
                body:JSON.stringify({
                    title: props.title,
                    content: props.content,
                    published: props.published,
                })
            })
                .then(response=>response.json())
                .then(data=>{
                    console.log(data);
                    history.push('/');
                })
                .catch(err=>console.error(err))
        }
    }

    return(
        <div className='postForm'>
            <h2>Creating New Post</h2>
            <form>
                <label>Title 
                    <input
                        type = 'text'
                        name = 'title'
                        className = 'formTitle'
                        value = {props.title}
                        onChange = {props.onChange}
                    />
                </label>
                <label> Post Content
                    <textarea
                        name = 'content'
                        value = {props.content}
                        onChange = {props.onChange}
                    />
                </label>
                <label>Publish
                    <input
                        type = 'checkbox'
                        name = 'published'
                        value = {props.published}
                        checked = {props.published}
                        onChange = {props.onChange}
                    />
                </label>
                <button
                    onClick={onSubmit}
                    type='submit'
                >Submit</button>
            </form>
        </div>
    );
}

export default BlogCreate