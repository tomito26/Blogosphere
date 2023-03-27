import Img from '../assets/blogosphere.svg';
import { Link, NavLink } from 'react-router-dom';
import { FaRegEdit,FaUser, FaAngleDown,FaCog, FaSignOutAlt,FaSearch } from 'react-icons/fa';
import { MdAccountCircle } from "react-icons/md";
import { useState } from 'react';


const Header = ({ onToggleMenu,dropdownMenu }) => {
	const [searchTerm, setSearchTerm] = useState("");
	console.log(searchTerm)
	return (
		<header>
			<div className="logo">
				<Link to="/">
					<img src={Img} alt="Blogosphere logo" />
					<h2>Blogosphere</h2>
				</Link>
			</div>
			<form>
				<div className="form-control">
					<FaSearch className='search-icon'/>
					<input type="text" placeholder='Search for blog' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
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
							  <MdAccountCircle className='profile-icon'/>
								<span><FaAngleDown/></span>
							</div>
							{ dropdownMenu &&
								<ul className='menu'>
									<li>
										<NavLink to="/profile">
											<FaUser  className='icon'/>
											Profile
										</NavLink>
									</li>
									<li>
										<NavLink to="/settings">
											<FaCog className='icon'/>
											Settings
										</NavLink>
									</li>
									<li>
										<NavLink to="/logout">
											<FaSignOutAlt className='icon'/>
											Log Out
										</NavLink>
									</li>
								</ul>
							}	
						</div>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header