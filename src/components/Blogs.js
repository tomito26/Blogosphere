import { MdOutlineBookmarkAdd, MdOutlineDoDisturbOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Blogs = ({ blog }) => {
	
	const dateOfPost = new Date(blog.date_posted).toDateString().slice(4).trim();
	const newDate = dateOfPost.slice(0, 6) + ',' + dateOfPost.slice(6);
	

	return (
		<div className="card">
			<div className="card-header">
				<div className="profile-info">
					<div className="profile-image">
						<img src={blog.author.profileImage} alt="profile" />
					</div>
					<p>{blog.author.username}</p>
				</div>
				<span>.</span>
				<p className="date">{newDate}</p>
			</div>
			<div className="card-body">
				<div className="card-wrapper">
					<Link className="blog-link" to={`/blogs/${blog.id}`}>
						<h1>{blog.title}</h1>
						<p>{blog.content.length > 250 ? `${blog.content.slice(0, 250)}...` : blog.content}</p>
					</Link>
				</div>
				<div className="content-image">
					<Link to={`/blogs/${blog.id}`}>
						<img src={blog.imageUrl} alt={blog.title} />
					</Link>
				</div>
			</div>
			<div className="card-footer">
				<div className="footer-info">
					<p className="tag"><Link className="tag-link" to={`/similar-blogs/${blog.tag}`}>{blog.tag}</Link></p>
					<p>{blog.duration_reading}</p>
				</div>
				<div className="footer-icons">
					<MdOutlineBookmarkAdd className="icon" />
					<MdOutlineDoDisturbOn className="icon" />
				</div>
			</div>
		</div>
	)
}

export default Blogs