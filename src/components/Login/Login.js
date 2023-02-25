import React, { useState, useContext, useRef } from 'react'
import { FirebaseContext } from '../../store/Context'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const handleLogin = (e) => {
    e.preventDefault()
    if(emailRef.current.value.trim() == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))){
      emailRef.current.classList.add('error-input')
    }else{
      emailRef.current.classList.remove('error-input')
    }
    if(passwordRef.current.value.trim() == ''){
      passwordRef.current.classList.add('error-input')
    }else{
      passwordRef.current.classList.remove('error-input')
    }
    if(emailRef.current.classList.contains('error-input') || passwordRef.current.classList.contains('error-input')){
      return
    }
    if(!loading){
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        alert(error.message)
      })
    }
  }
  return (
    <div>
      <div className='backdrop'></div>
      <div className="loginParentDiv">
        <div className='guitar-image'>
          <img width="100px" height="100px" src='/Images/loginEntryPointPost.png'></img>
          <p>Help us become one of the safest places to buy and sell</p>
        </div>
        <form className='login-form' onSubmit={handleLogin}>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            ref={emailRef}
          />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            ref={passwordRef}
          />
          <button>{loading ? 'Loading...' : 'Login'}</button>
        </form>
        <Link style={{color: 'black'}} to='/signup'>Signup</Link>
      </div>
    </div>
  )
}

export default Login