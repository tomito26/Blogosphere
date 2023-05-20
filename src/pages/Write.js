import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


const Write = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    main_image: "",
    blog_text: "",
    duration_reading: "",
    tag: ""
  });
  const [inputError, setInpuError] = useState(null);
  const { authToken, logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createNewBlog = async (e) => {
    e.preventDefault()
    setLoading(true);
    const { title, main_image, blog_text, duration_reading, tag } = newBlog;
    if (!title || !main_image || !blog_text || !duration_reading || !tag) {
      setInpuError('All the fields are required');
      setLoading(false)
    } else if (title && main_image && blog_text && duration_reading && tag) {

      const formData = new FormData();
      formData.append('title', title);
      formData.append('main_image', main_image);
      formData.append('blog_text', blog_text);
      formData.append('duration_reading', duration_reading);
      formData.append('tag', tag)

      try {
        const res = await fetch('http://localhost:8000/api/blogosphere/blogs/',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken?.access}`
            },
            body: formData
          }
        )
        console.log(res)
        if (res?.ok) {
          setNewBlog({
            title: "",
            main_image: "",
            blog_text: "",
            duration_reading: "",
            tag: ""
          });
          setLoading(false);
          navigate('/');
        } else if (res?.status === 401) {
          logoutUser();
        }
      } catch (err) {
        console.log(err)
      }
    }


  }

  return (
    <div className='form-container'>
      <form onSubmit={createNewBlog}>
        <h1>Write Blog</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name='title' id='title' placeholder='Write a title to your blog' className='form-input' value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor='main_image'>Upload Image</label>
          <input type="file" name="main_image" id="main_image" onChange={(e) => setNewBlog({ ...newBlog, [e.target.name]: e.target.files[0] })} />
        </div>
        <div className="form-group">
          <label htmlFor="blog_text">Write your story</label>
          <textarea name="blog_text" id="blog_text" cols="30" rows="10" placeholder='Tell your story' value={newBlog.blog_text} onChange={(e) => setNewBlog({ ...newBlog, [e.target.name]: e.target.value })}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="duration">How long it will take for the reader to finish reading?</label>
          <input type="text" name='duration_reading' id='duration' placeholder='e.g 3min' className='form-input' value={newBlog.duration_reading} onChange={(e) => setNewBlog({ ...newBlog, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" name='tag' id='tag' placeholder='e.g React,HTML' className='form-input' value={newBlog.tag} onChange={(e) => setNewBlog({ ...newBlog, [e.target.name]: e.target.value })} />
        </div>
        {inputError && <p className='input-error'>{inputError}</p>}
        <button type="submit" className='btn' disabled={loading ? true :  false}>Publish</button>
      </form>
    </div>
  )
}

export default Write