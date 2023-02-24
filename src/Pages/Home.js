import React from 'react'
import Banner from '../components/Banner/Banner'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Posts from '../components/Posts/Posts'

function Home() {
  return (
    <div className='homeParentDiv'>
      <Header/>
      <Banner/>
      <Posts/>
      <Footer/>
    </div>
  )
}

export default Home