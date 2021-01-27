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
        fetch(`${process.env.REACT_APP_API}/posts`)
        .then(response=>response.json())
        .then(data=>{
        //   console.log(data);
          if(localStorage.getItem('currentUser')){
              let currentUser = JSON.parse(localStorage.getItem('currentUser')).username
              let userFilter = data.post_list.filter(post=>post.author&&post.author.username===currentUser);
              props.setUserPosts(userFilter);
          }
          // console.log('USER POSTS',userPosts);
        })
        .catch(err=>console.error(err));
    },[])

    function htmlDecode(input){
        // var e = document.createElement('textarea');
        // e.innerHTML = input;
        // // handle case of empty input
        // return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;

        var doc = new DOMParser().parseFromString(input, "text/html");
        // console.log('doc', doc.documentElement.textContent);
        return doc.documentElement.textContent;
    }

    if(props.userPosts){
        var postList = props.userPosts.map(post=>
        <div
            className={post.published?'preview':'preview unpublishedPost'}
            key={post._id}
            data-post={JSON.stringify(post)}
            data-id={post._id}
        >
            <h2 className='postTitle'>{post.title}<span>{post.published?'':' (Unpublished)'}</span></h2>
            <div className='actions'>
                <button className={post.published?'unpublish':'publish'} onClick={publishPost}>{post.published?'Unpublish':'Publish'}</button>
                <button className='delete' onClick={deletePost}>Delete</button>
                <button className='edit' onClick={editPost}>Edit</button>
            </div>
            <div className='content' dangerouslySetInnerHTML={{__html: htmlDecode(post.content) }}>
                {/* <p className='postContent'>{unescape(post.content)}</p> */}
            </div>
        </div>)
    }

    function publishPost(e){
        let parent = e.target.parentElement.parentElement;
        let post = JSON.parse(parent.getAttribute('data-post'));
        // let title = parent.querySelector('.postTitle').innerHTML;
        // let content = parent.querySelector('.postContent').innerHTML;
        
        fetch(`${process.env.REACT_APP_API}/posts/${post.id}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('authToken')
            },
            body:JSON.stringify({
                title: post.title,
                content: htmlDecode(post.content),
                published: !post.published,
                author: post.author._id
            })
        })
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                window.location.reload();
            })
            .catch(err=>{
                console.error(err);
                props.sessionExpired();
                history.push('/login');
                // window.location.reload();
            });
    }

    function deletePost(e){
        let parent = e.target.parentElement.parentElement;
        let id = parent.getAttribute('data-id');
        fetch(`${process.env.REACT_APP_API}/posts/${id}`, {
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
            .catch(err=>{
                console.error(err)
                props.sessionExpired();
                history.push('/login');
            });
    }

    function editPost(e){
        let parent = e.target.parentElement.parentElement;
        let post = JSON.parse(parent.getAttribute('data-post'));
        // console.log(post);
        if(props.checkExpiration()){
            props.sessionExpired();
            history.push('/login');
        }else{
            props.setTitle(post.title);
            props.setContent(post.content);
            props.setPublished(post.published);
            props.setEditAuthor(post.author._id);
            history.push('/posts/' + post.id);
        }
    }

    // props.checkExpiration();
    if(localStorage.getItem('currentUser')){
        return(
            <div className='homepage'>
                {/* <Link to='/login'>Login</Link> */}
                {/* Welcome {JSON.parse(localStorage.getItem('currentUser')).username} */}
                <h1>Blog Posts by {JSON.parse(localStorage.getItem('currentUser')).username}</h1>
                {/* <h1>{JSON.parse(localStorage.getItem('currentUser')).username}'s Blog Posts</h1> */}
                <Link to='/posts'>
                    <div className='createPost'>
                        <h2>Create a new Post</h2>
                        {/* <button className='createBtn'>+</button> */}
                    </div>
                </Link>
                {postList}
            </div>
        );
    }else{
        history.push('/login');
        return(
            <div>
                <Link to='/login'>Login</Link>
                Welcome guest
            </div>
        );
    }
}

export default Homepage