import { useHistory, useParams } from "react-router-dom";

const BlogEdit = props => {
    const {id} = useParams();
    const history = useHistory();

    function onSubmit(e) {
        e.preventDefault();
        props.checkExpiration();
        if(!localStorage.getItem('authToken')) {
            history.push('./login')
        }else{
            fetch('/posts/'+id,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + localStorage.getItem('authToken')
                },
                body:JSON.stringify({
                    title: props.title,
                    content: props.content,
                    published: props.published,
                    author: props.editAuthor
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
        <div>
            <h2>EDIT</h2>
            <form>
                <label>Title: 
                    <input
                        type = 'text'
                        name = 'title'
                        value = {props.title}
                        onChange = {props.onChange}
                    />
                </label>
                <label> Post Content: 
                    <textarea
                        name = 'content'
                        value = {props.content}
                        onChange = {props.onChange}
                    />
                </label>
                <label>Publish?
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
    )
}

export default BlogEdit