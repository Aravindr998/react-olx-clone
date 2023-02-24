import React, { useContext, useState } from 'react'
import { FirebaseContext, AuthContext } from '../../store/Context'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import './Create.css'
import { useNavigate } from 'react-router-dom'

function Create() {
  const navigate = useNavigate()
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  // const [percent, setPercent] = useState(0)
  const storage = getStorage(firebase)
  const storageRef = ref(storage, `/image/${image?.name}`)
  const firestore = getFirestore(firebase)
  const handleSubmit = (e) => {
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred/snapshot.totalBytes)
        )
        console.log(percent)
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          addDoc(collection(firestore, 'products'), {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: new Date().toDateString()
          })
          .then(() => {
            navigate('/')
          })
        })
      }
    )
  }
  return (
      <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input className="input" type="number" id="price" name="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
          <br />
        <br />
        {image && <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>}
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
      </div>
  )
}

export default Create