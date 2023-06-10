import { MdOutlineBookmarkAdd, MdOutlineDoDisturbOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar  from '../assets/profile_avatar.png'

const UserBlogs = ({ blog }) => {
  const dateOfPost = new Date(blog.created_at).toDateString().slice(4).trim();
	const newDate = dateOfPost.slice(0, 6) + ',' + dateOfPost.slice(6);
	const [author, setAuthor] = useState({})

	useEffect(() =>{
		const getAuthor = async () => {
			const res = await fetch(`https://web-production-ac66.up.railway.app/api/account/user_detail/${blog.author}/`);
			const data = await res.json();
			setAuthor(data.data);
		}
		getAuthor()
	},[blog.author])
  
  return (
    <div className="card">
			<div className="card-header">
				<div className="profile-info">
					<div className="profile-image">
						<img src={author.user_profile?.profile_image ? author.user_profile?.profile_image : Avatar} alt="profile" />
					</div>
					<p>{`${author?.first_name } ${author?.last_name}`}</p>
				</div>
				<span>.</span>
				<p className="date">{newDate}</p>
			</div>
			<div className="card-body">
				<div className="card-wrapper">
					<Link className="blog-link" to={`/blogs/${blog.uid}`}>
						<h1>{blog.title}</h1>
						<p>{blog.blog_text.length > 250 ? `${blog.blog_text.slice(0, 250)}...` : blog.blog_text}</p>
					</Link>
				</div>
				<div className="content-image">
					<Link to={`/blogs/${blog && blog.uid}`}>
						<img src={blog.main_image} alt={blog.title} />
					</Link>
				</div>
			</div>
			<div className="card-footer">
				<div className="footer-info">
					<p className="tag">{blog.tag}</p>
					<p>{`${blog.duration_reading} read`}</p>
				</div>
				<div className="footer-icons">
					<MdOutlineBookmarkAdd className="icon" />
					<MdOutlineDoDisturbOn className="icon" />
				</div>
			</div>
		</div>
  )
}

export default UserBlogs