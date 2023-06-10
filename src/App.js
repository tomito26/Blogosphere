import Header from './components/Header';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './components/Blog';
import Write from './pages/Write';
import Register from './pages/authentication/Register';
import Login from './pages/authentication/Login';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Edit from './pages/Edit';




function App() {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const { pathname } = useLocation();
  const [blogsPerPage, setBlogsPerPage] = useState(5);
  const numOfTotalPages = Math.ceil(blogs.length / blogsPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const visibleBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);



  useEffect(() => {
    window.scrollTo(0, 0);

    const getBlogs = async () => {
      const blogsFromServer = await fetchBlogs();
      setBlogs(blogsFromServer);
    }

    getBlogs();
  }, [pathname])

  const fetchBlogs = async () => {
    const response = await fetch('https://web-production-ac66.up.railway.app/api/blogosphere/all_blogs/');
    const data = await response.json();

    return data.data;

  }
  const prevPage = () => {
    console.log(currentPage)
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    console.log(currentPage)
    
    if(currentPage < numOfTotalPages){
      setCurrentPage(currentPage + 1);
    }
  }

  const toggleMenu = () => {
    setDropdownMenu(!dropdownMenu);
  }

  return (
    <div className="App" onDoubleClick={() => setDropdownMenu(false)}>
      <AuthProvider>
        <Header onToggleMenu={toggleMenu} dropdownMenu={dropdownMenu} setDropdownMenu={setDropdownMenu} />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home visibleBlogs={visibleBlogs} pages={pages} setCurrentPage={setCurrentPage}  nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} />}/>
            <Route path="/blogs/:blogId" element={<Blog blogs={blogs} />} />
            <Route path="/write" element={<Write />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit' element={<Edit />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
