// import React from 'react';

import { useHistory } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react'; 

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
    const handleEditorChange = (e) => {
        console.log(
          'Content was updated:',
          e.target.getContent()
        );
        props.setContent(e.target.getContent());
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
                    <Editor
                        className='editor'
                        textareaName='myTextArea'
                        apiKey="iou7093g4pl6zn5mrc6fxwye33asheqmzogqvbiyn985qfef"
                        initialValue="<p>Initial content</p>"
                        value={props.content}
                        onEditorChange={props.onChange}
                        tagName='textarea'
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
                {/* <label> Post Content
                    <textarea
                        name = 'content'
                        value = {props.content}
                        onChange = {props.onChange}
                    />
                </label> */}
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