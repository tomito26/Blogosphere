import { useParams } from "react-router-dom";
import Blogs from "../components/Blogs";

const SimilarBlogs = ({ blogs }) => {
  const { blogTag } = useParams()
  return (
    <div className="container">
      <div className="wrapper">
        {blogs.filter(blogItems => blogItems.tag === blogTag).map(blog => <Blogs blog={blog} key={blog.id} />)}
      </div>
      <div className="container-tags">
        <div className="header">
          <div className="stories">
            <h2>{ blogs.filter(blogItem => blogTag === blogItem.tag).length }</h2>
            <p>Stories</p>
          </div>
          <div className="writers">
            <h2>{ blogs.filter(blogItem => blogTag === blogItem.tag).length }</h2>
            <p>Writers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarBlogs