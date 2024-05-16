import React, { Fragment, useState, useEffect,createContext} from 'react';

import 'react-toastify/dist/ReactToastify.css';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Navbarhead from './pages/Navbarhead';
import Home from "./pages/Home/Home"
import FileUpload from './components/FileUpload';
import Admin from './components/Admin';
import Add from './pages/Add/Add';
import List from './pages/List/List';

export const RoleContext=createContext();
function App() {
  const [role,setRole]=useState(false);
const [isAuthenticated, setIsAuthenticated] = useState(false)
const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }
async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/verify/",
        {
          method: "GET",
          headers: { token: localStorage.token }
        })
      const parseRes = await response.json();
parseRes===true ? setIsAuthenticated(true): setIsAuthenticated(false)
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
}}
useEffect(() => {
    isAuth();
  })
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: !isAuthenticated ? <Login setAuth={setAuth} /> :  !role?<Navigate to="/admin" />: <Navigate to ="/dashboard"/>
    },
    { 
      path:"/register",
      element:!isAuthenticated ? <Register setAuth={setAuth} /> :<Navigate to="/login"/>
    },
    {
      path:"/dashboard",
      element:isAuthenticated ? <Dashboard setAuth={setAuth} /> :<Navigate to="/login" />
    },
    {
      path:"/fileupload",
      element:isAuthenticated ? <FileUpload  setAuth={setAuth} /> :<Navigate to="/login" />
    },
    {
      path:'/admin',
      element:isAuthenticated ?<Admin  setAuth={setAuth}/> :<Navigate to="/login" />,
      children: [{
        path:'/admin/add',
        element:<Add /> 
      },
    {
      path:"/admin/list",
      element:<List/>
    }]
    }
  ]);
return (
<Fragment>
  {console.log("home")}
<Navbarhead />
      <div className='con'>
      <RoleContext.Provider value={setRole}>
      <RouterProvider router={router} />
</RoleContext.Provider>
</div>
</Fragment>
);
}
export default App;
