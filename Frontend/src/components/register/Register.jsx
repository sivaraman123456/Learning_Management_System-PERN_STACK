import React ,{Fragment,useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Image1 from "../../assets/small/signup.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Validation from './SignupValidation';
const Register = ({setAuth}) => {
  const history=useNavigate();
const [errors, setErrors] = useState({})
const[inputs,setInputs]=useState(
   { 
    email:"",
    password:"",
    name:""
}
)
const{email,password,name}=inputs;
const onChange=(e=>{
  setInputs({...inputs,[e.target.name]:e.target.value})
})
const onSubmitForm=async(e)=>{
    e.preventDefault();
    setErrors(Validation(inputs));
try {
  if(errors.name ==="" && errors.email === "" && errors.password === ""){
  const body={email,password,name}
  const response=await fetch("http://localhost:5000/auth/register",{
method:"POST",
headers:{"Content-type":"application/json"},
body:JSON.stringify(body)
})
var parseRes=await response.json()
if(parseRes.token){
  setTimeout(() => {
    // Navigate to '/another-page' after the delay
    history('/login');
  }, 2000);
  toast.success("Register successfuly...!")
 localStorage.setItem("token",parseRes.token)
 console.log(parseRes);
        
}
else{
  toast.error(parseRes)
  setAuth(false);
  console.log(parseRes);
}}
} catch (err) {
console.error(err.message);
toast.error("edho oru error varudhu")
  }}
  return (
    <Fragment>
      <div className="container">
      <div className="image2">
     <img src={Image1} style={{
        maxWidth: '100%',
        maxHeight: '93vh',
        objectFit: 'cover'
    }} alt="" />
    </div>
    <div className='col-md-offset-4 col-md-5 my-3'>
        <h1 className='text-center my-5' style={{color:'black'}}>Register</h1>
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <input type='email' placeholder='Email' name="email" 
              onChange={e=>onChange(e)}
              value={email}
             className='form-control my-3' />   {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className="form-group">
            <input type='password'
             placeholder='Password'
              name="password" 
               onChange={e=>onChange(e)}
              value={password}
              className='form-control my-3'/>
              {errors.password && <span className='text-danger'>{errors.password}</span>}
              </div>
              <div className="form-group">
            <input type="text" name="name" placeholder='Name'
                 onChange={e=>onChange(e)}
                 value={name}
             className='form-control my-3'/>
             {errors.name && <span className='text-danger'>{errors.name}</span>}
             </div>
            <button className='btn btn-warning btn-block form-control'>Submit</button>
            <Link to="/login">Go To Login Page</Link>
            <ToastContainer />
         </form>
        </div>
        </div>
    </Fragment>
)}
export default Register