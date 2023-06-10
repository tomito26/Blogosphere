import jwt_decode from "jwt-decode";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  loginUser: () => { },
  profiles: []
});



export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem('authTokens')) || null);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({});




  const loginUser = async (loginDetails) => {
    try {
      const res = await fetch('https://web-production-ac66.up.railway.app/api/account/login/',
        {
          method: 'POST',
          headers: {
            'Content-type': 'Application/json',
          },
          body: JSON.stringify(loginDetails)
        }
      );
      const data = await res.json()
      // console.log(data.message);
      if (res?.ok && data.message === "login success") {
        localStorage.setItem('authTokens', JSON.stringify(data.data.token));
        setAuthToken(localStorage.getItem('authTokens') && JSON.parse(localStorage.getItem('authTokens')))
        setUser(localStorage.getItem('authTokens') && jwt_decode(localStorage.getItem('authTokens')));
        navigate('/')
        setAuthError(null)

      } else {
        const dataError = data.message
        setAuthError(dataError);
      }


    } catch (err) {
      setAuthError(err);
    }


  }
  const logoutUser = () => {
    setAuthToken(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')

  }
  const getProfile = async () => {
    const res = await fetch(`https://web-production-ac66.up.railway.app/api/account/user_detail/${user?.user_id}/`)
    const data = await res.json();
    setProfile(data.data);
  }

  const updateToken = async () => {
    console.log('update Token called');
    const res = await fetch(`https://web-production-ac66.up.railway.app/api/account/token/refresh/`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({refresh: authToken?.refresh})

      }
    );
    
    const data = await res.json();
    if (res?.ok) {
      localStorage.setItem('authTokens', JSON.stringify(data));
      setAuthToken(localStorage.getItem('authTokens') && JSON.parse(localStorage.getItem('authTokens')))
      setUser(localStorage.getItem('authTokens') && jwt_decode(localStorage.getItem('authTokens')));
    } else {
      logoutUser();
    }

    if(loading){
      setLoading(false)
    }
  }

  useEffect(() => {
    if(loading){
      updateToken()
    }

    const fourMinutes = 1000 * 60 * 4
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, fourMinutes);
    getProfile();
    return () => clearInterval(interval);
  }, [authToken, loading])

  return (
    <AuthContext.Provider value={{ user, loginUser, authError, authToken, logoutUser, profile }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const { user, loginUser, authError, authToken, logoutUser, profile } = useContext(AuthContext);
  return { user, loginUser, authError, authToken, logoutUser, profile }
}