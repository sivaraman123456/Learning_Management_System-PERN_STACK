 import './Home.css';
import React from 'react'
import { useState} from 'react'

// background random images
import backgroundImg1 from "../../assets/random/coding bg10.jpg"
// import backgroundImg2 from '../assets/random/coding bg2.jpg'
// import backgroundImg3 from '../assets/random/coding bg3.jpg'
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
    // backgroundImg2,
    // backgroundImg3,
    // backgroundImg4,
    // backgroundImg5,
    // backgroundImg6,
    // backgroundImg7,
    // backgroundImg8,
    // backgroundImg9,
    // backgroundImg10,
    // backgroundImg111,
];

const Home = () => {
 
    const [backgroundImg, setBackgroundImg] = useState(0);
// useEffect(() => {
//   const value1=Math.floor(Math.random() * randomImges.length)
//   console.log(randomImges.length);
  
//         setBackgroundImg(value1);
//     })

  return (
    // <img src={backgroundImg} style={{
    //     maxWidth: '100%',
    //     maxHeight: '93vh',
    //     objectFit: 'cover'
    // }} alt="" />
   <div className="Home"   style={{
    backgroundImage:`url(${randomImges[backgroundImg]})`,
            backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    height: "89.7vh",
                    width: "100%",
                    backgroundRepeat:'no-repeat'
   }}>
  
   </div>
  )
}

export default Home


// import React from 'react';
// import backgroundImg1 from '../assets/random/coding bg2.jpg';

// import React, { Component } from "react";
 
// class App extends Component {
//     render() {
//         const myStyle = {
//             backgroundImage:
//                 "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
//             height: "100vh",
//             marginTop: "-70px",
//             fontSize: "50px",
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//         };

// const Home = () => {
//   return (
//     <div  
//     style={{
//         backgroundImage:`url(${backgroundImg1})`,
//         backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 height: "100vh",
//                 width: "100%",
//                 backgroundRepeat:'no-repeat'
//     }}
//     >
//       <img src={backgroundImg1} alt="Background" />
//     </div>
//   );
// };

// export default Home;

