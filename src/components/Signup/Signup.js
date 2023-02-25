import React, { useState, useContext, useRef } from 'react'
import { FirebaseContext } from '../../store/Context'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Link, useNavigate} from 'react-router-dom'
import './Signup.css'

function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const usernameRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const firestore = getFirestore(firebase)
  const handleSubmit = (e) => {
    e.preventDefault()
    if(usernameRef.current.value.trim() == ''){
      usernameRef.current.classList.add('error-input')
    }else{
      usernameRef.current.classList.remove('error-input')
    }
    if(emailRef.current.value.trim() == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))){
      emailRef.current.classList.add('error-input')
    }else{
      emailRef.current.classList.remove('error-input')
    }
    if(phoneRef.current.value.trim() == ''){
      phoneRef.current.classList.add('error-input')
    }else{
      phoneRef.current.classList.remove('error-input')
    }
    if(passwordRef.current.value.trim() == '' || passwordRef.current.value.trim().length<5){
      passwordRef.current.classList.add('error-input')
    }else{
      passwordRef.current.classList.remove('error-input')
    }
    if(usernameRef.current.classList.contains('error-input') || emailRef.current.classList.contains('error-input') || phoneRef.current.classList.contains('error-input') || passwordRef.current.classList.contains('error-input')){
      return
    }
    if(!loading){
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log('success')
        updateProfile(result.user, {displayName: username})
        .then(() => {
          console.log("User profile updated")
          addDoc(collection(firestore, 'users'), {
            id: result.user.uid,
            username,
            phone
          })
          .then(() => {
            setLoading(false)
            navigate('/login')
          })
        })
     })
     .catch(error => {
      console.log(error.code)
      if(error.code.toString() == 'auth/email-already-in-use'){
        setLoading(false)
        emailRef.current.classList.add('error-input')
      }
     })
    }
  }
  return (
    <div>
      <div className='backdrop'></div>
      <div className="signupParentDiv">
        <div className='guitar-image'>
          <img width="100px" height="100px" src='/Images/loginEntryPointPost.png'></img>
          <p>Help us become one of the safest places to buy and sell</p>
        </div>
        <form className='signup-form' onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder='Name'
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            ref={usernameRef}
          />
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
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone'
            ref={phoneRef}
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
          <button>{loading ? 'Loading...' : 'Signup'}</button>
        </form>
        <Link style={{color: 'black'}} to='/login'>Login</Link>
      </div>
    </div>
  )
}

export default Signup