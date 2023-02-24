import React, { useContext } from 'react'
import './Header.css'
import Logo from '../UI/Logo'
import Search from '../UI/Search'
import Arrow from '../UI/Arrow'
import SellButton from '../UI/SellButton'
import SellButtonPlus from '../UI/SellButtonPlus'
import { AuthContext, FirebaseContext } from '../../store/Context'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import LoginModal from '../UI/LoginModal'

function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const signOutHandler = (e) => {
    signOut(auth)
    navigate('/login')
  }
  return (
    <div className="headerParentDiv">
      <LoginModal/>
      <div className="headerChildDiv">
        <div className="brandName">
          <Logo></Logo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName : 'Login'}</span>
          <hr />
        </div>
        {user && <span onClick={signOutHandler} >Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header