import { useHistory, useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react'; 

const BlogEdit = props => {
    const {id} = useParams();
    const history = useHistory();

    function onSubmit(e) {
        e.preventDefault();
        props.checkExpiration();
        if(!localStorage.getItem('authToken')) {
            history.push('./login')
        }else{
            fetch(`${process.env.REACT_APP_API}/posts/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + localStorage.getItem('authToken')
                },
                body:JSON.stringify({
                    title: props.title,
                    content: htmlDecode(props.content),
                    // content: props.content,
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

    function htmlDecode(input){
        var doc = new DOMParser().parseFromString(input, "text/html");
        // console.log('doc', doc.documentElement.textContent);
        return doc.documentElement.textContent;
    }

    return(
        <div className='postForm'>
            <h2>Editing {props.title}</h2>
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
                    <Editor
                        textareaName='myTextArea'
                        apiKey="iou7093g4pl6zn5mrc6fxwye33asheqmzogqvbiyn985qfef"
                        value={htmlDecode(props.content)}
                        initialValue={htmlDecode(props.content)}
                        onEditorChange={props.onChange}
                        init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image',
                            'charmap print preview anchor help',
                            'searchreplace visualblocks code',
                            'insertdatetime media table paste wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
                        }}
                        // onChange={handleEditorChange}
                    />
                </label>
                {/* <label> Post Content: 
                    <textarea
                        name = 'content'
                        value = {props.content}
                        onChange = {props.onChange}
                    />
                </label> */}
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