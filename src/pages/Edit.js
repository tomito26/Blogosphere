import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { FaCamera } from 'react-icons/fa'
import Avatar from '../assets/profile_avatar.png'
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const { profile, authToken } = useAuthContext();
  const [newProfile, setNewProfile] = useState({
    profile_image: profile.user_profile?.profile_image,
    bio: profile?.user_profile?.bio
  });
  const navigate = useNavigate();
  const [alertSuccess, setAlertSuccess] = useState(null)

  const editProfile = async (e) => {
    e.preventDefault();
    const { profile_image, bio } = newProfile;

    const formData = new FormData();
    if (profile.user_profile) {
      try {
        if (profile_image !== profile.user_profile?.profile_image) {
          formData.append('profile_image', profile_image);
          formData.append('bio', bio);
          formData.append('uid', profile.user_profile?.uid);
          const res = await fetch(`http://localhost:8000/api/blogosphere/profile/`,
            {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${authToken?.access}`
              },
              body: formData
            }
          );
          const data = await res.json();
          setNewProfile({ bio: data.data.bio, profile_image: data.data.profile_image });
          setAlertSuccess(data.message);

        }  else if(bio !== profile.user_profile?.bio){
          formData.append('uid', profile.user_profile?.uid);
          formData.append('bio', bio);
          const res = await fetch(`http://localhost:8000/api/blogosphere/profile/`,
            {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${authToken?.access}`
              },
              body: formData
            }
          );
          const data = await res.json();
          setNewProfile({ ...newProfile, bio: data.data.bio })
          setAlertSuccess(data.message);
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        formData.append("profile_image", profile_image);
        formData.append("bio", bio);
        const res = await fetch(`http://localhost:8000/api/blogosphere/profile/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken?.access}`
            },
            body: formData
          }
        );

      } catch (error) {

      }
    }

  }

  return (
    <div className="edit-container">
      <div className="edit-wrapper">
        <form onSubmit={editProfile}>
          {alertSuccess && <p className='alert-success'>{alertSuccess}</p>}
          <div className="upload-image">
            <img src={newProfile.profile_image ? newProfile.profile_image : Avatar} alt={profile.username} />
            <div className="upload-button">
              <input type="file" name="profile_image" id="profile" onChange={(e) => setNewProfile({ ...newProfile, [e.target.name]: e.target.files[0] })} />
              <FaCamera />
            </div>
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
          <button className="submitBtn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Edit