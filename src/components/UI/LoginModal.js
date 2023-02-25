import React,{ useContext, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

import './LoginModal.css'
import { FirebaseContext } from '../../store/Context'
import { Link } from 'react-router-dom'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import GoogleIcon from './GoogleIcon'
import { LoginContext } from '../../store/LoginContext'
import Close from './Close'

function LoginModal() {
  const { login, setLogin } = useContext(LoginContext)
  const { firebase } = useContext(FirebaseContext)
  const firestore = getFirestore(firebase)
  const signInHandler = (e) => {
    const auth = getAuth(firebase)
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(credential)
      console.log(user)
      addDoc(collection(firestore, 'users'), {
        id: user.uid,
        username: user.displayName,
        phone: user.phoneNumber
      })
      setLogin(false)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(credential)
      console.log(errorMessage)
    })
  }
  return (
    <React.Fragment>
      <div className='backdrop' onClick={() => setLogin(false)}></div>
      <div className='loginModal card'>
        <div className='close-button-parent'>
          <button onClick={() => setLogin(false)}><Close/></button>
        </div>
        <div className='picture-parent'>
          <img className='picture' src="/Images/loginEntryPointPost.png" alt="" />
          <p>Help us become one of the safest places to buy and sell</p>
        </div>
        <div className='google-button-parent'>
          <button className='google-sign-in' onClick={signInHandler}><GoogleIcon/>Continue with Google</button>
          <p>OR</p>
          <Link className='a-tag' to='/signup' >Login with Email</Link>
        </div>
        <div className='bottom-text'>
          <p>All your personal details are safe with us</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginModal