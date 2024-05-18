 import './Home.css';
import React from 'react'
import { useState} from 'react'
import backgroundImg1 from "../../assets/random/coding_bg2.jpg"
import backgroundImg2 from '../../assets/random/coding_bg3.jpg'
import backgroundImg3 from '../../assets/random/coding_bg4.jpg'
// import backgroundImg4 from '../assets/random/coding bg4.jpg'
// import backgroundImg5 from '../assets/random/coding bg5.jpg'
// import backgroundImg6 from '../assets/random/coding bg6.jpeg'
// import backgroundImg7 from '../assets/random/coding bg7.jpg'
// import backgroundImg8 from '../assets/random/coding bg8.jpeg'
// import backgroundImg9 from '../assets/random/coding bg9.jpg'
// import backgroundImg10 from '../assets/random/coding bg10.jpg'
// import backgroundImg111 from '../assets/random/coding bg11.jpg'

const randomImges = [
    backgroundImg1
]
const Home = () => {
 
    const [backgroundImg, setBackgroundImg] = useState(0);


  return (
  <>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src={backgroundImg1} className="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
    <img src={backgroundImg2}className="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
    <img src={backgroundImg3} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
   <div className='header'>
            <div className='header-contents'>
                <h2>Order your favourite food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button>View Menu</button>
            </div>
        </div>
        </>
  )
}

export default Home


