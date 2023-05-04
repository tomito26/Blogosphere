import {  useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext'


const Login = () => {
  const [userLoginDetails, setUserLoginDetails] = useState({
    username: "",
    password: ""
  });

  const { username, password } = userLoginDetails;
  const { loginUser, authError } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!username && !password){
      console.log('All fields are required');
    }
 
    try {
      const signin = await loginUser(userLoginDetails)
      

    } catch (err) { 
      console.log(err)
    }
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleLogin}>
        <h1>Sign In </h1>
        {authError && <p className='error'>{authError}</p>}
        <div className="form-group">
          <label htmlFor="userame">Username</label>
          <input type="text" name="username" id="username" className="form-control" value={userLoginDetails.username} onChange={(e) => setUserLoginDetails({ ...userLoginDetails, [e.target.name]: e.target.value })} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className="form-control" value={userLoginDetails.password} onChange={(e) => setUserLoginDetails({ ...userLoginDetails, [e.target.name]: e.target.value })} required />
        </div>
        <div className="register-button">
          <input type="submit" value="Login" className="btn" />
        </div>
        <p>Do you have an account? <Link to="/register" className="register-link">Register</Link></p>
      </form>
    </div>
  )
}

export default Login