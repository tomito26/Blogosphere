import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useAuthContext } from '../context/AuthContext'


const EditBlog = ({ blogDetails, setEditBlogPage }) => {
  const [blog, setBlog] = useState({
    title: blogDetails.title,
    main_image: blogDetails.main_image,
    blog_text: blogDetails.blog_text,
    tag: blogDetails.tag,
    duration_reading: blogDetails.duration_reading
  })
  const { authToken } = useAuthContext();
  const [success, setSuccess] = useState(null);

  const updateBlog = async (e) => {
    e.preventDefault();
    const { title, main_image, blog_text, tag, duration_reading } = blog;
    const formData = new FormData();
    if (main_image === blogDetails.main_image && title !== blogDetails.title || blog_text !== blogDetails.blog_text || tag !== blogDetails.tag || duration_reading !== blogDetails.duration_reading) {
      formData.append('title', title);
      formData.append('blog_text', blog_text);
      formData.append('tag', tag);
      formData.append('duration_reading', duration_reading);
      formData.append('uid', blogDetails.uid);

      try {
        const res = await fetch('https://web-production-ac66.up.railway.app/api/blogosphere/blogs/',
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${authToken?.access}`
            },
            body: formData

          }
        );
        const data = await res.json();
        setSuccess(data.message);
        window.scrollTo(0,0);

      } catch (error) {
        console.log(error)
      }
    } else if(main_image !== blogDetails.main_image) {
      formData.append('title', title);
      formData.append('blog_text', blog_text);
      formData.append('main_image', main_image);
      formData.append('tag', tag);
      formData.append('duration_reading', duration_reading);
      formData.append('uid', blogDetails.uid);
      try {
        const res = await fetch('https://web-production-ac66.up.railway.app/api/blogosphere/blogs/',
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${authToken?.access}`
            },
            body: formData

          }
        );
        const data = await res.json();
        console.log(data.data);
        setSuccess(data.message);
        setBlog({
          title: data.data.title,
          main_image: data.data.main_image,
          blog_text: data.data.blog_text,
          tag: data.data.tag,
          duration_reading: data.data.duration_reading
        });
        window.scrollTo(0,0)


      } catch (error) {
        console.log(error)
      }

    }
  }

  return (
    <div className='edit-blog-wrapper'>
      <div className="close-modal">
        <FaTimes onClick={() => setEditBlogPage()} />
      </div>
      <h2>Edit Blog</h2>
      {success && <p className='alert-success'>{success}</p>}
      <form onSubmit={updateBlog}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className='form-input' name='title' id='title' value={blog.title} onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <img src={blog.main_image} alt={blog.title} />
          <input type="file" name="main_image" id="main_image" onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.files[0] })} />
        </div>
        <div className="form-group">
          <label htmlFor="blog_text">Write your Story</label>
          <textarea name="blog_text" id="blog_text" cols="30" rows="10" value={blog.blog_text} onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="duration_reading">How long does it take to read?</label>
          <input type="text" name="duration_reading" id="duration_reading" className='form-input' value={blog.duration_reading} onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" name="tag" id="tag" className='form-input' value={blog.tag} onChange={e => setBlog({ ...blog, [e.target.name]: e.target.value })} />
        </div>
        <button className='btn'>Edit Blog</button>
      </form>
    </div>
  )
}

export default EditBlog