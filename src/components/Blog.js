import { useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaLink } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { BsEnvelopePlus } from "react-icons/bs";
import { useState, useEffect } from "react";
import Avatar from '../assets/profile_avatar.png'


const Blog = () => {
  const[blogDetails, setBlogDetails] = useState({});
  const[authorProfile, setAuthorProfile]= useState({});
  const { blogId } = useParams();
 
  useEffect(() => {
    const getBlog = async () => {
      const res = await fetch(`http://localhost:8000/api/blogosphere/blog_detail/${blogId}/`);
      const data = await res.json();
      setBlogDetails(data.data);
    }
    getBlog();
    const getAuthor = async () => {
      if(blogDetails){
        const res = await fetch(`http://localhost:8000/api/account/user_detail/${blogDetails.author}/`)
        const data = await res.json();
        setAuthorProfile(data.data)
      }
    }
    getAuthor()
  },[blogDetails.author,blogId,blogDetails])
  const datePosted = blogDetails ? new Date(blogDetails.created_at).toDateString().slice(4) : '';
  const dateOfPost = datePosted.slice(0, 6)
  

  return (
    <div className="blog-container">
      <div className="blog-wrapper">
        <div className="blog-header">
          <div className="author-details">
            <div className="author-profile-photo">
              <img src={authorProfile?.user_profile?.profile_image || Avatar} alt={authorProfile ? authorProfile.username : ''} />
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
          <img src={ authorProfile.user_profile?.profile_image || Avatar} alt="" />
        </div>
        <p className="author-name">{`${authorProfile ? authorProfile.first_name : ''} ${authorProfile ? authorProfile.last_name : ''}`}</p>
        <p className="followers">{`@${authorProfile ? authorProfile.username : ''}`}</p>
        <p className="author-description">{authorProfile ? authorProfile.user_profile?.bio : ""}</p>
        <div className="buttons">
          <button className="followBtn">Follow</button>
          <button className="emailBtn"><BsEnvelopePlus /></button>
        </div>
      </div>
    </div>
  )
}

export default Blog