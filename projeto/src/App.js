import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider } from './context/AuthContext';
//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Search from './pages/search/Search';
import Postu from './pages/postu/Postu';

function App() {
   const [ user, setUser ] = useState(undefined)
   const { auth } = useAuthentication()

   const loadingUser = user === undefined

   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

   }, [auth])

   if(loadingUser) {
    return <p>carregando...</p>
   }


  return (
    <div className="App">
     <AuthProvider value={{user}}> 
      <BrowserRouter>
        <Navbar />
          <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />}/>
            <Route path='/search' element={<Search />}/>
            <Route path='/post/:id' element={<Postu />}/>
            <Route path='/login' 
            element={!user ? <Login />: <Navigate to='/'/>} />
            <Route path='/register' 
            element={!user ? <Register />: <Navigate to='/'/>}/>
            <Route path='/post/create'
             element={user ? <CreatePost />: <Navigate to='/login'/>}/>
            
          </Routes>
          </div>
          <Footer />
        </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;