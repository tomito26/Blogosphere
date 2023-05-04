import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const PrivateRoutes = () => {
  const { user } = useAuthContext();
   
  return (
    user ? <Outlet/> : <Navigate replace to="/login"/>
  )
}

export default PrivateRoutes