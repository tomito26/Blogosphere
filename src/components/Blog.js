import { useParams } from "react-router-dom";
import { FaFacebook,FaTwitter,FaLinkedin,FaLink } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";

const Blog = ({ blogs }) => {
  const { blogId } = useParams();
  const blogItem = blogs.filter(blog => blog.id == blogId)[0];
  const datePosted = new Date(blogItem.date_posted).toDateString().slice(4);
  const dateOfPost = datePosted.slice(0, 6)
  
  return (
    <div className="blog-wrapper">
      <div className="blog-header">
        <div className="author-details">
          <div className="author-profile-photo">
            <img src={blogItem.author.profileImage} alt={blogItem.username} />
          </div>
          <div className="blog-details">
            <div className="username">
              <p>{blogItem.author.username}</p>
            </div>
            <div className="blog-info">
              <p>{dateOfPost}</p>
              <span>.</span>
              <p>{blogItem.duration_reading}</p>
            </div>
          </div>
        </div>
        <div className="share-links">
          <FaTwitter  className="link"/>
          <FaFacebook className="link"/>
          <FaLinkedin  className="link"/>
          <FaLink className="link"/>
          <MdOutlineBookmarkAdd className="link"/>
        </div>
      </div>
      <div className="content-container">
        <article>
          <h1>{blogItem.title}</h1>
          <div className="content-photo">
            <img src={blogItem.imageUrl} alt={blogItem.title} />
          </div>
          <p>{blogItem.content}</p>
        </article>
      </div>
    </div>
  )
}

export default Blog