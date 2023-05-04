import Img from '../assets/blogosphere.svg';
import { Link, NavLink } from 'react-router-dom';
import { FaRegEdit, FaUser, FaAngleDown, FaCog, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { MdAccountCircle } from "react-icons/md";
import {  useState } from 'react';
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


const Header = ({ onToggleMenu, dropdownMenu, setDropdownMenu }) => {
	const [searchTerm, setSearchTerm]= useState("");
	const { user, logoutUser } = useAuthContext();
	const navigate = useNavigate();

	
	const signOut = () => {
		logoutUser();
		setDropdownMenu(false)
	}

	const findBlogs = (e) => {
		e.preventDefault();
		if(searchTerm) {
			navigate(`/search/${searchTerm}`)

		}
	}
	

	

	return (
		<>
			{user && <header>
				<div className="logo">
					<Link to="/">
						<img src={Img} alt="Blogosphere logo" />
						<h2>Blogosphere</h2>
					</Link>
				</div>
				<form onSubmit={findBlogs}>
					<div className="form-control">
						<FaSearch className='search-icon' />
						<input type="text" placeholder='Search for blog' onChange={(e) => setSearchTerm(e.target.value)} />
					</div>
				</form>
				<nav>
					<ul>
						<li><NavLink to="/">Home</NavLink></li>
						<li>
							<NavLink to="/write">
								<FaRegEdit style={{ marginRight: "5px" }} />
								<span>Write</span>
							</NavLink></li>
						<li>
							<div className='dropdown'>
								<div className="dropdown-menu" onClick={() => onToggleMenu()}>
									<MdAccountCircle className='profile-icon' />
									<span><FaAngleDown /></span>

								</div>
								{dropdownMenu &&
									<ul className='menu'>
										<li>
											<NavLink to="/profile" onClick={() => setDropdownMenu(false)} className="menu-item">
												<FaUser className='icon' />
												Profile
											</NavLink>
										</li>
										<li>
											<NavLink to="/settings" onClick={() => setDropdownMenu(false)} className="menu-item">
												<FaCog className='icon' />
												Settings
											</NavLink>
										</li>
										<li>
											<p onClick={signOut} className='menu-item'>
												<FaSignOutAlt className='icon' />
												Log Out
											</p>
										</li>
									</ul>
								}
							</div>
						</li>
					</ul>
				</nav>
			</header>}
		</>
	)
}

export default Header