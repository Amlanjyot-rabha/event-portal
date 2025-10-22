import './App.css'
import Home from './pages/home/Home'
import {Routes, Route, useLocation} from 'react-router-dom'
import Login from './pages/login/Login'
import Post from './pages/postpage/Post'
import Verify from './verify'
import { useEffect } from 'react'
import NProgress from 'nprogress';
import Profile from './pages/profile/profile'
function App() {
  const location = useLocation();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({ 
      showSpinner: false,
      easing: 'ease',
      speed: 500
    });
    
    // Start progress bar
    NProgress.start();
    NProgress.set(0.4);

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}
 

export default App
