import React,{useEffect, useContext} from 'react'
import logo from './logo.svg'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';
import CreatePage from './Pages/Create'
import LoginPage from './Pages/Login'
import SignupPage from './Pages/Signup'
import ViewPost from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/Context'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Post from './store/PostContext'


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
      <Router>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/signup' element={ <SignupPage/> }/>
          <Route path='/login' element={ <LoginPage/> }/>
          <Route path='/create' element={ <CreatePage/> }/>
          <Route path='/details' element={ <ViewPost/> }/>
        </Routes>
      </Router>
    </Post>
      {/* <CreatePage/> */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      {/* <ViewPost/> */}
    </div>
  );
}

export default App;
