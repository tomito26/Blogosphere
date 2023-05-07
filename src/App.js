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
  
  useEffect(() => {
    window.scrollTo(0,0);

    const getBlogs = async () => {
      const blogsFromServer = await fetchBlogs();
      setBlogs(blogsFromServer);
    }

    getBlogs();
  }, [pathname])

  const fetchBlogs = async () => {
    const response = await fetch('http://localhost:8000/api/blogosphere/all_blogs/');
    const data = await response.json();

    return data.data;

  }

  const toggleMenu = () => {
    setDropdownMenu(!dropdownMenu);
  }

  return (
    <div className="App" onDoubleClick={() => setDropdownMenu(false)}>
      <AuthProvider>
        <Header onToggleMenu={toggleMenu}  dropdownMenu={dropdownMenu} setDropdownMenu={setDropdownMenu} />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home blogs={blogs} />} />
            <Route path="/blogs/:blogId" element={<Blog blogs={blogs} />} />
            <Route path="/write" element={<Write  />} />
            <Route path="/search/:searchTerm" element={<Search />}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/profile/edit' element={<Edit/>}/>
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
