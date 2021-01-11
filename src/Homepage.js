/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Homepage = props => {

    useEffect(()=>{
        fetch('/posts')
        .then(response=>response.json())
        .then(data=>{
          // console.log(data);
          let userFilter = data.post_list.filter(post=>post.author&&post.author.username===localStorage.getItem('currentUser'));
          props.setUserPosts(userFilter);
          // console.log('USER POSTS',userPosts);
        })
        .catch(err=>console.error(err));
    },[])

    if(props.userPosts){
        var postList = props.userPosts.map(post=>
        <div
            className='preview'
            key={post._id}
            data-post={JSON.stringify(post)}
        >
            <h2 className='postTitle'>{post.title}</h2>
            <p className='postContent'>{post.content}</p>
            <button onClick={publish}>{post.published?'Unpublish':'Publish'}</button>
        </div>)
    }

    function publish(e){
        let parent = e.target.parentElement;
        let post = JSON.parse(parent.getAttribute('data-post'));
        // let title = parent.querySelector('.postTitle').innerHTML;
        // let content = parent.querySelector('.postContent').innerHTML;
        
        fetch('/posts/'+post.id, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('authToken')
            },
            body:JSON.stringify({
                title: post.title,
                content: post.content,
                published: !post.published,
                author: post.author._id
            })
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            window.location.reload();
        })
        .catch(err=>console.error(err));

        // console.log('/posts/'+post.id)
        // console.log(post.title);
        // console.log(post.content);
        // console.log(post.published);
        // console.log(post.author);
    }

    props.checkExpiration();
    if(localStorage.getItem('currentUser')){
        return(
            <div>
                {/* <Link to='/login'>Login</Link> */}
                Welcome {localStorage.getItem('currentUser')}
                <Link to='/posts'> Create a Post</Link>
                <h1>USER POSTS</h1>
                {postList}
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