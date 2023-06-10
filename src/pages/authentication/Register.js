import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState(null)
  const { first_name, last_name, username, email, password } = newUser;
  const navigate = useNavigate();



  const registerAccount = async (e) => {
    e.preventDefault();

    if (first_name === "" && last_name === "" && username === "" && email === "" && password === "") {
      return setError('All input field is required')
    }
    try {
      const res = await fetch('https://web-production-ac66.up.railway.app/api/account/register/',
        {
          method: 'POST',
          headers: { 'Content-type': 'Application/json' },
          body: JSON.stringify(newUser)
        })
      if (res.ok) {
        setNewUser({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')

      } else {
        const dataError = await res.json()
        setError(dataError.data['non_field_errors'][0])
      }


    } catch (err) {
      console.log(err);
    }


  }



  return (
    <div className="form-wrapper">
      <form onSubmit={registerAccount}>
        <h1>Create Account</h1>
        {error && <p className='error'>{error}</p>}
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input type="text" id="first_name" name="first_name" className="form-control" value={newUser.first_name} required onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })} />

        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input type="text" id="last_name" name="last_name" className="form-control" required value={newUser.last_name} onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className="form-control" required value={newUser.username} onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email</label>
          <input type="email" name="email" id="email" className="form-control" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className="form-control" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })} />
        </div>

        <div className="register-button">
          <input type="submit" value="Register" className="btn" />
        </div>
        <p>Already have an account? <Link to="/login" className="register-link">Login</Link></p>
      </form>
    </div>
  )
}

export default Register