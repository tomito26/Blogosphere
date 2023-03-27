import { useState } from 'react'
import axios  from 'axios'

const Write = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    imageUrl: "",
    content: "",
    date_posted: "",
    duration_reading: "",
    tag: ""
  });
  const createNewBlog = (e) =>{
    e.preventDefault()
    const { title, imageUrl, content, date_posted, duration_reading, tag } = newBlog;
    if(title && imageUrl && content && date_posted && duration_reading && tag){
      addBlog(newBlog)
    }
    else{
      alert("Kindly all the inputs are required");
    }
  }
  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "cig8a61u");

    axios.post(`https://api.cloudinary.com/v1_1/dmtsu8tdt/image/upload`, formData).then(res => setNewBlog({...newBlog, imageUrl:res.data.secure_url})).catch(error => console.log(error));

  }
  return (
    <div className='form-container'>
      <form onSubmit={createNewBlog}>
        <h1>Write a blog</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name='title' id='title' placeholder='Write a title to your blog' value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
        </div>
        <div className="form-group">
          <input type="file" name="imageUrl" id="imageUrl"  onChange={(e) => uploadImage(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label htmlFor="story">Write your story</label>
          <textarea name="story" id="story" cols="30" rows="10" placeholder='Tell your story' value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date </label>
          <input type="date" name="date" id="date" value={newBlog.date_posted} onChange={(e) => setNewBlog({...newBlog, date_posted: e.target.value}) }/>
        </div>
        <div className="form-group">
          <label htmlFor="duration">How long it will take for the reader to finish reading?</label>
          <input type="text" name='duration' id='duration' placeholder='e.g 3min read' value={newBlog.duration_reading} onChange={(e) => setNewBlog({...newBlog, duration_reading: e.target.value}) }/>
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" name='tag' id='tag' placeholder='e.g React,HTML' value={newBlog.tag} onChange={(e) => setNewBlog({...newBlog, tag: e.target.value})}/>
        </div>
        <input type="submit" value="Publish" className='btn' />
      </form>
    </div>
  )
}

export default Write