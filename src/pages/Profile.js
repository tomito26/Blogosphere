import { useAuthContext } from '../context/AuthContext'
import Avatar from '../assets/profile_avatar.png';
import UserBlogs from './UserBlogs';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  const { profile } = useAuthContext();
  console.log(profile)
  return (
    <div className='profile-container'>
      <div className="profile-wrapper">
        <div className="user-details">
          <div className="user-detail-image">
            <img src={profile.user_profile?.profile_image || Avatar} alt='' />
          </div>
          <div className="user-name">
            <div className='user-detail-wrapper'>
              <p className='user-name-details'>{`${profile.first_name} ${profile.last_name}`}</p>
              <NavLink to='/profile/edit' className='editBtn' style={{textDecoration: "none"}}>Edit Profile</NavLink>
            </div>
            <p>{`@${profile.username}`}</p>
            <p style={{color: '#333'}}>{profile.user_profile?.bio}</p>
          </div>
        </div>
        <div className="user-blogs">
          {profile?.blogs?.map(blog => <UserBlogs key={blog.uid} blog={blog} />)}
        </div>
      </div>
    </div>
  )
}

export default Profile