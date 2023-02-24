import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../store/Context'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { useNavigate} from 'react-router-dom'
import './Signup.css'

function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const firestore = getFirestore(firebase)
  const handleSubmit = (e) => {
    e.preventDefault()
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
          navigate('/login')
        })
      })
   })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src='/Images/olx-logo.png'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  )
}

export default Signup