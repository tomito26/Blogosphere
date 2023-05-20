import { useNavigate, useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaLink, FaTimesCircle, FaRegEdit } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { BsEnvelopePlus } from "react-icons/bs";
import { useState, useEffect } from "react";
import Avatar from '../assets/profile_avatar.png'
import { useAuthContext } from "../context/AuthContext";
import EditBlog from '../components/EditBlog';

const Blog = () => {
  const [blogDetails, setBlogDetails] = useState({});
  const [authorProfile, setAuthorProfile] = useState({});
  const { blogId } = useParams();
  const { profile, authToken } = useAuthContext();
  const navigate = useNavigate();
  const [editBlogPage, setEditBlogPage] = useState(false);


  useEffect(() => {
    const getBlog = async () => {
      const res = await fetch(`http://localhost:8000/api/blogosphere/blog_detail/${blogId}/`);
      const data = await res.json();
      setBlogDetails(data.data);
    }
    getBlog();
    const getAuthor = async () => {
      if (blogDetails) {
        const res = await fetch(`http://localhost:8000/api/account/user_detail/${blogDetails.author}/`)
        const data = await res.json();
        setAuthorProfile(data.data)
      }
    }
    getAuthor()
  }, [blogDetails.author, blogId, blogDetails])
  const datePosted = blogDetails ? new Date(blogDetails.created_at).toDateString().slice(4) : '';
  const dateOfPost = datePosted.slice(0, 6)

  const deleteBlog = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    const formData = new FormData();
    formData.append('uid', blogId)
    if (confirmDelete) {
      const res = await fetch('http://localhost:8000/api/blogosphere/blogs/',
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken?.access}`
          },
          body: formData
        }
      )
      navigate('/');
    }
  }


  return (
    <div className="blog-container">
      <div className="blog-wrapper">
        <div className="blog-header">
          <div className="author-details">
            <div className="author-profile-photo">
              <img src={authorProfile.user_profile?.profile_image ? authorProfile.user_profile?.profile_image : Avatar} alt={authorProfile ? authorProfile.username : ''} />
            </div>
            <div className="blog-details">
              <div className="username">
                <p>{`${authorProfile ? authorProfile.first_name : ''} ${authorProfile ? authorProfile.last_name : ''}`}</p>
              </div>
              <div className="blog-info">
                <p>{dateOfPost}</p>
                <span>.</span>
                <p>{blogDetails ? `${blogDetails.duration_reading} read` : ""}</p>
              </div>
            </div>
          </div>
          <div className="share-links">
            <FaTwitter className="link" />
            <FaFacebook className="link" />
            <FaLinkedin className="link" />
            <FaLink className="link" />
            {profile.user_profile?.user_profile === blogDetails.author ? <FaRegEdit className="link" onClick={() => setEditBlogPage(true)} /> : ""}
            {profile.user_profile?.user_profile === blogDetails.author ? <FaTimesCircle className="link" onClick={deleteBlog} /> : ""}
            <MdOutlineBookmarkAdd className="link" />
          </div>
        </div>
        <div className="content-container">
          <article>
            <h1>{blogDetails ? blogDetails.title : ""}</h1>
            <div className="content-photo">
              <img src={blogDetails ? blogDetails.main_image : ""} alt={blogDetails ? blogDetails.title : ""} />
            </div>
            <p>{blogDetails ? blogDetails.blog_text : ""}</p>
          </article>
        </div>
      </div>
      <div className="author-info">
        <div className="author-profile-image">
          <img src={authorProfile.user_profile?.profile_image ? authorProfile.user_profile?.profile_image : Avatar} alt="" />
        </div>
        <p className="author-name">{`${authorProfile ? authorProfile.first_name : ''} ${authorProfile ? authorProfile.last_name : ''}`}</p>
        <p className="followers">{`@${authorProfile ? authorProfile.username : ''}`}</p>
        <p className="author-description">{authorProfile ? authorProfile.user_profile?.bio : ""}</p>
        <div className="buttons">
          <button className="followBtn">Follow</button>
          <button className="emailBtn"><BsEnvelopePlus /></button>
        </div>
      </div>

      {editBlogPage &&
        <div className="edit-blog">
          <EditBlog blogDetails={blogDetails} setEditBlogPage={setEditBlogPage} />
        </div>}

    </div>
  )
}

export default Blog