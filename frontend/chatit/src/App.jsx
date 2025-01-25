
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import Loader from './components/Loader'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


function App() { 
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  console.log({onlineUsers})

  const {theme, getTheme} = useAuthStore()

  useEffect(()=>{
    checkAuth()

    
  }, [checkAuth])

  useEffect(()=>{
    if(authUser){
      getTheme();
    }
  }, [authUser, getTheme])

  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // Update theme in the DOM
  }, [theme, getTheme]);



  

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  return (
    <div >
      <Navbar/>

      <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser?  <Settings />: <Login/>} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        
      </Routes>

      <Toaster/>
      
    </div>
  )
}

export default App
