import React,{ useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../../store/Context'
import { PostContext } from '../../store/PostContext'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import './View.css'

function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  const firestore = getFirestore(firebase)
  useEffect(() => {
    const { userId } = postDetails
    const q = query(collection(firestore, 'users'), where('id', '==', userId))
    getDocs(q)
    .then((snapshot) => {
      snapshot.forEach(doc => {
        setUserDetails(doc.data())
      })
    })
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  )
}

export default View