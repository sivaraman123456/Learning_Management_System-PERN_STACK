import React from 'react'
import { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FileUpload = ({ setAuth }) => {
  const [unit, setUnit] = useState();
  const [subject, setSubject] = useState();
  const [sem, setSem] = useState();
  const [file, setFile] = useState();
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    getFile()
  }, [])
  //get files from the file folder
  const getFile = async () => {
    const result = await axios.get("http://localhost:5000/fileupload/get-files")
    // console.log("datasss:",result.data.data.rows);
    setAllImage(result.data.data.rows)
    // console.log("allimage:",allImage)
  }
  const submitImage = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("unit", unit)
      formdata.append("subject", subject)
      formdata.append("sem", sem)
      formdata.append("file", file)
      console.log(unit, subject, sem, file);
      const result = await axios.post("http://localhost:5000/fileupload/upload-files", formdata, {
        headers: { "Content-type": "multipart/form-data" }
      })
      // console.log(result);
      if (result.data.status === "ok") {
        toast.success("Upload successfully...!")
        alert("Upload successfully...!")
        console.log("Upload successfully...!");

      }
      getFile();
    }
    catch (err) {
      console.error(err.message);
    }
  }
  const showPdf = async (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer")
  }
  const deletePdf = async (pdf) => {

    try {
      let del = prompt("Are you sure?", "yes");
      if (del === "yes") {
        const send = await axios.delete(`http://localhost:5000/fileupload/delete-file/${pdf}`)
        if (send.data.status === "ok") {
          toast.success("file deleted successfully..")

        }
        getFile();
      }
    } catch (err) {
      console.error(err.message);
    }
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
  return (
    <div>
      <div className="logout">
        <button className="btn btn-warning btn-block " style={{ alignItems: "flex-end" }} onClick={(e) => Logout(e)}>Logout</button>
      </div>


      <div className="file">
        <div className=" col-md-3 text-center" >
          <form className='form-control' onSubmit={submitImage}>
            <h4 className='text-center'>Upload File</h4><br />
            <input type='text'
              placeholder='Semester'
              required
              onChange={(e) => setSem(e.target.value)}
              className='form-control my-4 md-4 text-center' />
            <input type='text'
              placeholder='Subject'
              required
              onChange={(e) => setSubject(e.target.value)}
              className='form-control my-4 md-4 text-center' />
            <input type='text'
              placeholder='Unit'
              required
              onChange={(e) => setUnit(e.target.value)}
              className='form-control my-4 md-4  text-center' />


            <input type='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='form-control my-4  md-4'
              required
              accept='application/pdf' />
            <button className='btn btn-primary btn-block ' style={{ marginLeft: "5px" }}>submit</button>

          </form>
        </div>
      </div>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <br />

        {allImage === null ? "" : allImage.map((data) => {
          return <div className="inner-div">
            <h6 style={{ color: "blue" }}> </h6>

            {/* {console.log("id:",data.file_id)} */}
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body ">
                <h5 className="card-title">MCA NOTES</h5>
                <h6 className="card-subtitle mb-2 text-muted">Unit:{data.unit}</h6>
                <p className="card-subtitle mb-2 text-mutedt ">Subject:{data.subject}</p>
                <p className="card-text">Semester:{data.sem}</p>
                {/* { console.log("file_id",data.file_id)} */}
                <FaTrash onClick={() => deletePdf(data.pdf)} />
                <FaRegEye onClick={() => showPdf(data.pdf)} style={{ marginLeft: "20px" }} />
              </div>
              <ToastContainer />
            </div>
          </div>
        })}
      </div>
    </div>


  )
}

export default FileUpload;




