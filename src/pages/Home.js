import Blogs from '../components/Blogs'

const Home = ({ blogs }) => {
 
  return (
    <div className="container">
      <div className='wrapper'>
        {blogs.map(blog => <Blogs key={blog.uid} blog={blog} />)}
      </div>
      <div className="container-tags">
        <h2>Recommended Topics</h2>
        <div className="tag-wrapper">
          <p>React</p>
          <p>JavaScript</p>
          <p>Politics</p>
          <p>UI Design</p>
          <p>Data Science</p>
          <p>Self Improvement</p>
          <p>Coding</p>
          <p>Programming</p>
        </div>
      </div>
    </div>
  )
}

export default Home