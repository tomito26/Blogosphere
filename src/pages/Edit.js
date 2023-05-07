import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const Edit = () => {
  const { profile } = useAuthContext();
  const [newProfile, setNewProfile] = useState({
    profile_image: profile.user_profile?.profile_image || "",
    bio: profile?.user_profile?.bio || ""
  });
  // const bio = profile.user_profile?.bio
  console.log(newProfile?.bio)

  return (
    <div className="edit-container">
      <div className="edit-wrapper">
        <form>
          <div className="form-group upload-image">
            <div className="user-profile-image">
              <img src={newProfile.profile_image} alt={profile.username} />
            </div>
            <label htmlFor="image">Upload Profile Image</label>
            <input type="file" name="profile" id="profile" />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">Name</label>
            <input type="text" name="first_name" id="first_name" className='form-input' value={`${profile.first_name}  ${profile.last_name}`} disabled />
          </div>
         
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" className='form-input' value={profile.username} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" id="bio" cols="30" rows="10" value={newProfile?.bio} onChange={(e) => setNewProfile({ ...newProfile, [e.target.name]: e.target.value })}></textarea>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit