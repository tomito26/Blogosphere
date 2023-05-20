import Blogs from '../components/Blogs'


const Home = ({ visibleBlogs, pages, setCurrentPage, prevPage, nextPage, currentPage }) => {



  return (
    <div className="container">
      <div className='wrapper'>
        {visibleBlogs.map(blog => <Blogs key={blog.uid} blog={blog} />)}
      </div>
      <div className="container-tags">
        <h2>Recommended Topics</h2>
        <div className="tag-wrapper">
          <p>React</p>
          <p>JavaScript</p>
          <p>Coding</p>
          <p>Vue</p>
          <p>Politics</p>
          <p>UI Design</p>
          <p>Data Science</p>
          <p>Self Improvement</p>
          <p>Angular</p>
          <p>Python</p>
          <p>UX Design</p>
          <p>Programming</p>
        </div>
      </div>
      <ul className='page-numbers'>
        <li className='page-number' onClick={prevPage}>Prev</li>
        {pages.map(page => <li class={`page-number ${currentPage === page ? 'active-page' : ""}`} key={page} onClick={() => setCurrentPage(page)}>{page}</li>)}
        <li className='page-number' onClick={nextPage}>Next</li>
      </ul>
    </div>
  )
}

export default Home