import React, { Fragment, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "./login.css";
import { FaRegEye } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [allImage, setAllImage] = useState([]);
  useEffect(() => {
    getFile()
  }, [])
  //get files from the file folder
  const getFile = async () => {
    const result = await axios.get("http://localhost:5000/fileupload/get-files")
    console.log("datasss:",result.data.data.rows);
    setAllImage(result.data.data.rows)
    console.log("allimage:", allImage)
  }
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard",
        {
          method: "GET",
          headers: { token: localStorage.token }
        })
      const parseRes = await response.json()
      setName(parseRes.name)
      setEmail(parseRes.email)
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }
  const showPdf = async (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer")
  }
  const Logout = (e) => {
    e.preventDefault();
    setTimeout(() => {
      // Navigate to '/another-page' after the delay
      setAuth(false)
    }, 2000);
    toast.success("Logout Successfully.......")
    localStorage.removeItem("token")
  }
  useEffect(() => {
    getName();
  })
  return (
    <Fragment>
      <div className="container">
        <div className="logout">
          <button className="btn btn-warning btn-block " style={{ alignItems: "flex-end" }} onClick={(e) => Logout(e)}>Logout</button>
        </div>
        <div className="dash" style={{ color: 'black' }}>
          <h2 style={{ color: 'black' }}>Name:{name}</h2>
          <h2 style={{ color: 'black' }}>Email:{email}</h2>
        </div>

        <div className="uploaded">
          <h4>Uploaded PDF:</h4>
          <br />

          {allImage === null ? "" : allImage.map((data) => {
            return <div className="inner-div">
              <h6 style={{ color: "blue" }}> </h6>

              {console.log("id:", data)}
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body ">
                  <h5 className="card-title">MCA NOTES</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Unit:{data.unit}</h6>
                  <p className="card-subtitle mb-2 text-mutedt ">Subject:{data.subject}</p>
                  <p className="card-text">Semester:{data.sem}</p>
                  {console.log("file_id", data.pdf)}
                  <FaRegEye onClick={() => showPdf(data.pdf)} style={{ marginLeft: "20px" }} />
                </div>
                <ToastContainer />
              </div>
            </div>
          })}
        </div>
      </div>
    </Fragment>
  )
}
export default Dashboard