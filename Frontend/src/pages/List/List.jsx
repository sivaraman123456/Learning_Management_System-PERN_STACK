import React, { useEffect, useState } from 'react'
import './List.css'
import { url } from '../../assets/assests'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list,setList] = useState([]);
  const fetchList = async () => {
    const result = await axios.get(`${url}/fileupload/get-files`)
    
      setList(result.data.data.rows);
    
    
  }

  const removeFood = async (dataId) => {
    const send = await axios.delete(`${url}/fileupload/delete-file/${dataId}`)
    await fetchList();
    if (send.data.status === "ok") {
      toast.success("file deleted successfully..")

    }
    else {
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="list-table-format ">
            <table style={{border:"1px"}}>
              <thead>
                <tr>
            <th>Image</th>
            <th>Pdf</th>
            <th>Semester</th>
            <th>Subject</th>
            <th>Unit</th>
            <th>Delete</th>
            </tr>
            </thead>

            </table>
          </div>
          {list.map((item,index)=>{
            return (
              <table>
              <div key={index} className='list-table-format'>
                <img src={`${url}/files/`+item.image} alt="" />
                <p>{item.pdf}</p>
                <p>{item.sem}</p>
               <p>{item.category}</p>
                <p>{item.unit}</p>
                <p  onClick={()=>removeFood(item.file_id)}>x</p>
                {console.log("file_id:",item.file_id)}
              </div>
              </table>
            )
          })}
        </div>
    </div>
  )
}

export default List




