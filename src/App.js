import React,{useEffect, useContext} from 'react'
import logo from './logo.svg'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import './App.css';
import CreatePage from './Pages/Create'
import LoginPage from './Pages/Login'
import SignupPage from './Pages/Signup'
import ViewPost from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/Context'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Post from './store/PostContext'
import Login from './store/LoginContext'
import ProtectedRoutes from './utils/ProtectedRoutes';
import PublicRoutes from './utils/PublicRoutes';


function App() {
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  })
  return (
    <div>
    <Post>
      <Login>
        <Router>
          <Routes>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/create' element={ <CreatePage/> }/>
              <Route path='/details' element={ <ViewPost/> }/>
            </Route>
            <Route element={<PublicRoutes/>}>
              <Route path='/signup' element={ <SignupPage/> }/>
              <Route path='/login' element={ <LoginPage/> }/>
            </Route>
            <Route path='/' element={ <Home/> }/>
          </Routes>
        </Router>
      </Login>
    </Post>
    </div>
  );
}

export default App;
