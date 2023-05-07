import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchedBlog from "../components/SearchedBlog";
import SearchError from "./SearchError";


const Search = () => {
  const { searchTerm } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const findBlogItems = async () => {
        const res = await fetch(`http://localhost:8000/api/blogosphere/all_blogs/?search=${searchTerm}`);
        const data = await res.json();
        setBlogs(data.data)
      }
      findBlogItems();
    }
  }, [searchTerm]);

  return (
    <div className="search-container">
      <div className="search-wrapper">
        {blogs.length > 0 ? blogs.map(blog => <SearchedBlog key={blog.uid} blog={blog} />) : <SearchError searchTerm={searchTerm} />}
      </div>
    </div>
  )
}

export default Search