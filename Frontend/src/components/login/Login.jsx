import React ,{Fragment,useState,useContext}from 'react'
import {Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image1 from "../../assets/small/login.png"
import "./login.css"
import Validation from './LoginValidation';
import { jwtDecode } from 'jwt-decode'; 
import { RoleContext } from '../../App';
const Login = ({setAuth}) => {
  const navigate = useNavigate();
const setRole=useContext(RoleContext);
const [errors, setErrors] = useState({})
const [inputs,setInputs]=useState({email:"",password:""})
const {email,password}=inputs 
const onChange=(e=>{
setInputs({...inputs,[e.target.name]:e.target.value})
})
const onSubmitChange=async(e)=>{
e.preventDefault();
setErrors(Validation(inputs));
try {
if (errors.email === "" && errors.password === ""){
const body={email,password}
const response=await fetch("http://localhost:5000/auth/login",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(body)
})
var parseRes=await response.json()
// console.log("token:",parseRes.token);
if(parseRes.token){
  const user = jwtDecode(parseRes.token);
  console.log(user, user.role)
  // setRole(user.role);
  if(user.role==="Admin")
  {
    // setTimeout(() => {
    //   // Navigate to '/another-page' after the delay
    //   setRole(false)
    //    }, 2000);
    setRole(false)
    setAuth(true)
    console.log("Admin:",user.role);
    toast.success("login successfully ..........") 
    localStorage.setItem("token",parseRes.token);
    // navigate('/fileupload')
   }
  else{
    // setTimeout(() => {
    //   // Navigate to '/another-page' after the delay
    // setAuth(true)
    // setRole(true)
    // }, 2000);
    setAuth(true)
    setRole(true)
    console.log("user:",user.role);
    toast.success("login successfully ..........") 
    localStorage.setItem("token",parseRes.token);

  }}
else{
  setAuth(false)
  console.log(parseRes);
  toast.error(parseRes.message)
    }}
 } catch (err) {
  console.error(err.message)
toast.error(parseRes)
}} 
return (
    <Fragment>
    <div className=
    "image">
    <img src={Image1} style={{
        maxWidth: '100%',
        maxHeight: '93vh',
        objectFit: 'cover'
    }} alt="" />
      </div>
      <div className="container">
        <div className='col-md-offset-4 col-md-5 my-8'>
        <h1 className='text-center  my-5 '>Login</h1>
    <form onSubmit={onSubmitChange}>
     <div className="form-group">
      <input
      type='email' placeholder='Email'  name='email' value={email} onChange={e=>onChange(e)}  
      className='form-control my-3' />
      {errors.email && <span style={{color:"#FF3E3E"}}>{errors.email}</span>}
      </div>
      <div className="form-group">
      <input type="password" placeholder='Password'  name='password' value={password} onChange={e=>onChange(e)}  
        className='form-control my-3'  />
         {errors.password && <span style={{color:"#FF3E3E"}}>{errors.password}</span>}
       </div>
      <button className='btn btn-warning btn-block form-control'>Login</button>
     <Link to="/register">Register</Link>
      </form>
    </div>
    <ToastContainer />
    </div>
     </Fragment>
  )}
export default Login


