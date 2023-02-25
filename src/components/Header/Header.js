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
import { LoginContext } from '../../store/LoginContext'

function Header() {
  const { login, setLogin } = useContext(LoginContext)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  let userHeader = <span className='login-span' onClick={() => setLogin(true)}>Login</span>
  if(user){
    userHeader = <span>{user.displayName}</span>
  }
  const {firebase} = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const signOutHandler = (e) => {
    signOut(auth)
    navigate('/login')
  }
  const sellClickHandler = (e) => {
    if(user){
      navigate('/create')
    }else{
      setLogin(true)
    }
  }
  return (
    <div className="headerParentDiv">
      {login && <LoginModal/>}
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
          {userHeader}
          <hr />
        </div>
        {user && <span className='logout-button' onClick={signOutHandler} >Logout</span>}
        <div className="sellMenu" onClick={sellClickHandler}>
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