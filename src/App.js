import Header from './components/Header';
import './App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import profilePhoto from "./assets/carlosjames.webp";
import uiux from './assets/uiux.webp';
import Blog from './components/Blog';
import Write from './pages/Write';



function App() {
  const [dropdownMenu, setDropdownMenu] = useState(false)
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "10 Web Developments Trends in 2023",
      content: "While the last decade (2010 - 2020) has been dominated by Single-Page Applications (SPAs) with their client-side rendering (CSR), starting from Knockout.js and Ember.js over to Angular.js, React.js and Vue.js, the last years have seen an increasing interest in server-side rendering (SSR) with meta frameworks. From the outside it seems like the cycle is closing again, because we have been using SSR with sprinkled JavaScript (e.g. jQuery, MooTools, Dojo.js) in multi-page applications (MPAs) for a long time before (2005 - 2010). However, whereas back in the time Java (e.g. JSP) or later Ruby on Rails have been used for the SSR, it's different this time because we are relying on JavaScript instead. For a few years Next.js has been the driving force behind this trend, however, other meta frameworks like SvelteKit are catching up. SSR has been competing with static site generation (SSG) for quite a while for the perfect performance (see Next.js vs Gatsby.js) even though both patterns serve entirely different purposes. While the latter pattern is used for static content (e.g. websites like a blog), the former is used for dynamic content (e.g. web applications). If SEO is relevant, both SSR and SSG can make sense. However, with the requirement of highly dynamic content or user-centered content with authentication, developers cannot choose SSG (once build before deploy, therefore static) and have to decide between SSR (on-demand build per request with individual data on the server) or CSR (on-demand fetching of individual data on the client) these days.",
      imageUrl: "https://unsplash.com/photos/p-xSl33Wxyc/download?force=true&w=640",
      date_posted: "2023-01-26",
      author: {
        username: "Carlos James",
        profileImage: profilePhoto
      },
      tag: "Web Development",
      duration_reading: "3min read"

    },
    {
      id: 2,
      title: "Fixing MemoryLeak in a production NodeJs",
      content: "Those giant spikes of memory are actually when I tried to do something about the problem, but I'll get to that in a minute. The main issue is once that CPU usage starts getting out of hand. Pretty much after every deploy, memory would slowly increase until it hit a critical point and then it would spike along with a huge spike in CPU usage, during which time my app struggled to keep up with requests. During these spikes, people would visit my site and it felt pretty quick sometimes, but not everything worked quite right. I got plenty of complaints about this. It was really annoying.",
      imageUrl: "https://unsplash.com/photos/Skf7HxARcoc/download?force=true&w=640",
      date_posted: "2022-07-1",
      author: {
        username: "Jarvis",
        profileImage: "https://unsplash.com/photos/sibVwORYqs0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fHx8MTY3OTUyODU0NQ&force=true&w=640"
      },
      tag: "Nodejs",
      duration_reading: "4min read"
    },
    {
      id: 3,
      title: "UI/UX Trends in 2023",
      content: "Yet another year is coming to a close. Many of the 2022 trends we anticipated, did find their use in digital products across our devices this year. As we are about to welcome 2023, we are taking a more careful look at both UI and UX trends that continue to evolve, take new shape and find novel uses to the user’s benefit and delight. In this article, we highlight some of the trends we think will persist and perhaps gain even more traction in the next year.",
      imageUrl: uiux,
      date_posted: "2022-05-28",
      author: {
        username: "Mcloud",
        profileImage: "https://unsplash.com/photos/DS1h0ubirIU/download?force=true&w=640"
      },
      tag: "UI design",
      duration_reading: "3min read"
    }

  ]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setDropdownMenu(!dropdownMenu);
  }
  const addNewBlog = (blog) => {
    blog.id = blogs.length + 1;
    const username = "Axelrod"
    const profileImage = "https://unsplash.com/photos/YUu9UAcOKZ4/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc5OTExOTg4&force=true&w=640"
    blog.author =  { username,profileImage } 
    console.log(blog)
    const newBlog = [ blog, ...blogs];
    setBlogs(newBlog);
    navigate('/');



  }

  return (

      <div className="App" onDoubleClick={() => setDropdownMenu(false)}>
        <Header onToggleMenu={toggleMenu} dropdownMenu={dropdownMenu} />
        <Routes>
          <Route path='/' element={<Home blogs={blogs} />} />
          <Route path="/blogs/:blogId" element={<Blog blogs={blogs} />} />
          <Route path="/write" element={<Write addBlog={addNewBlog} />} />
        </Routes>
      </div>

  );
}

export default App;
