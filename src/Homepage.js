/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Homepage = props => {
    const history = useHistory();

    useEffect(()=>{
        // localStorage.clear()
        props.setTitle('');
        props.setContent('');
        props.setPublished(false);
        props.setEditAuthor('');
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
            data-id={post._id}
        >
            <h2 className='postTitle'>{post.title}</h2>
            <p className='postContent'>{post.content}</p>
            <button onClick={publishPost}>{post.published?'Unpublish':'Publish'}</button>
            <button onClick={deletePost}>Delete Post</button>
            <button onClick={editPost}>Edit Post</button>
        </div>)
    }

    function publishPost(e){
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
    }

    function deletePost(e){
        let parent = e.target.parentElement;
        let id = parent.getAttribute('data-id');
        fetch('/posts/'+ id, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('authToken')
            }
        })
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                window.location.reload();
            })
            .catch(err=>console.error(err));
    }

    function editPost(e){
        let parent = e.target.parentElement;
        let post = JSON.parse(parent.getAttribute('data-post'));
        props.setTitle(post.title);
        props.setContent(post.content);
        props.setPublished(post.published);
        props.setEditAuthor(post.author._id);
        history.push('/posts/' + post.id);
    }

    props.checkExpiration();
    if(localStorage.getItem('currentUser')){
        return(
            <div>
                {/* <Link to='/login'>Login</Link> */}
                Welcome {JSON.parse(localStorage.getItem('currentUser')).username}
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