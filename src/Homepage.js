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
        var postList = props.userPosts.map(post=><div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>)
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