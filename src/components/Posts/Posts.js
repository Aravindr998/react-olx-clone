import React,{useEffect, useContext, useState} from 'react'
import { FirebaseContext } from '../../store/Context'
import { getFirestore, doc, getDocs, collection } from 'firebase/firestore'
import Heart from '../UI/Heart'
import { PostContext } from '../../store/PostContext'
import { useNavigate } from 'react-router-dom'

import './Posts.css'

function Posts() {
  const navigate = useNavigate()
  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)
  const firestore = getFirestore(firebase)
  useEffect(() => {
    getDocs(collection(firestore, 'products'))
    .then((docRef) => {
      const allPost = docRef.docs.map((products) => {
        return {
          ...products.data(),
          id: products.id
        }
      })
      setProducts(allPost)
    })
  },[])
  const postClickHandler = (product) => {
    setPostDetails(product)
    navigate('/details')
  }
  const posts = products.map(product => (
    <div className="card" onClick={() => postClickHandler(product)}>
      <div className="favorite">
        <Heart/>
      </div>
      <div className="image">
        <img src={product.url} alt="" />
      </div>
      <div className="content">
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="kilometer">{product.name}</span>
      </div>
      <div className="date">
        <span>{product.createdAt}</span>
      </div>
    </div>
  ))
  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {posts}
        </div>
      </div>
    </div>
  )
}

export default Posts