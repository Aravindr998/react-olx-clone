import React, { useContext, useRef, useState } from "react"
import { FirebaseContext, AuthContext } from "../../store/Context"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import "./Create.css"
import { useNavigate } from "react-router-dom"

function Create() {
  const navigate = useNavigate()
  const titleRef = useRef()
  const categoryRef = useRef()
  const priceRef = useRef()
  const fileRef = useRef()
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const storage = getStorage(firebase)
  const storageRef = ref(storage, `/image/${image?.name}`)
  const firestore = getFirestore(firebase)
  const handleSubmit = (e) => {
    if(titleRef.current.value.trim() == ''){
      titleRef.current.classList.add('error-input')
    }else{
      titleRef.current.classList.remove('error-input')
    }
    if(categoryRef.current.value.trim() == ''){
      categoryRef.current.classList.add('error-input')
    }else{
      categoryRef.current.classList.remove('error-input')
    }
    if(priceRef.current.value.trim() == ''){
      priceRef.current.classList.add('error-input')
    }else{
      priceRef.current.classList.remove('error-input')
    }
    if(!fileRef.current.value){
      fileRef.current.classList.add('error-input')
    }else{
      fileRef.current.classList.remove('error-input')
    }
    if(titleRef.current.classList.contains('error-input') || categoryRef.current.classList.contains('error-input') || priceRef.current.classList.contains('error-input') || fileRef.current.classList.contains('error-input')){
      return
    }
    if(!loading){
      setLoading(true)
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes
          )
          console.log(percent)
        },
        (err) => {
          setLoading(false)
          console.log(err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            addDoc(collection(firestore, "products"), {
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: new Date().toDateString(),
            }).then(() => {
              setLoading(false)
              navigate("/")
            })
          })
        }
      )
    }
  }
  return (
    <div className="centerDiv">
      <div className="form-div">
        <input
          className="input"
          type="text"
          id="name"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Title"
          ref={titleRef}
        />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          ref={categoryRef}
        />
        <input
          className="input"
          type="number"
          id="price"
          name="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          ref={priceRef}
        />
        {image && (
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
        )}
        <input
          ref={fileRef}
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={handleSubmit} className="uploadBtn">
          {loading ? 'Loading...' : 'Upload and Submit'}
        </button>
      </div>
    </div>
  )
}

export default Create
