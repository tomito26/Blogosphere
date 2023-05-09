import React, { useState } from 'react'

const EditBlog = ({ blogDetails }) => {
  
  const[updatedBlog, setUpdatedBlog] = useState({
    title: blogDetails.title,
    main_image: blogDetails.main_image,
    blog_text: blogDetails.blog_text,
    tag: blogDetails.tag,
    duration_reading: blogDetails.duration_reading
  })
  return (
    <div className='edit-blog-wrapper'>
      <h2>Edit Blog</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className='form-input'/>
        </div>
        
      </form>
    </div>
  )
}

export default EditBlog