import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';

function App() {
  const[patientList,setpatientList]=useState([]);
  const[patientData,setpatientData]=useState({
    id:"",
    name:"",
    dob:"",
    blood:"",
    contact:"",
    dov:"",
    _id:"",
    chronic:false
  })

  let insertData = (e)=>{
    e.preventDefault();
    if(patientData._id){
      axios.put(`http://localhost:3002/api/patient/update/${patientData._id}`,patientData).then(()=>{
        toast.success("Details updated successfully");
        getAllData();
        setpatientData({
        id:"",
        name:"",
        dob:"",
        blood:"",
        contact:"",
        dov:"",
        _id:"",
        chronic:false
      })
      })
    }else{
      axios.post(`http://localhost:3002/api/patient/insert`,patientData).then(()=>{
      toast.success("Patient details added");
      getAllData();
      setpatientData({
        id:"",
        name:"",
        dob:"",
        blood:"",
        contact:"",
        dov:"",
        _id:"",
        chronic:false
      })
    })
    }
  }


  let getValues = (e)=>{
    let {name,type,value,checked}=e.target;
    setpatientData({
      ...patientData,
      [name] : type==="checkbox" ? checked : value
  })
  }

  let getAllData = ()=>{
    axios.get(`http://localhost:3002/api/patient/view`).then((res)=>{
      return res.data;
    }).then((data)=>{
      if(data.status){
        setpatientList(data.viewRes);
      }
    })
  }

  useEffect(()=>{
    getAllData();
  },[])

  let deleteDetails = (id)=>{
    axios.delete(`http://localhost:3002/api/patient/delete/${id}`).then(()=>{
      toast.warn("Deleted patient details");
      getAllData(); 
    })
  }

  let getSingleDetail = (id)=>{
    axios.get(`http://localhost:3002/api/patient/view/${id}`).then((res)=>{
      return res.data;
    }).then((data)=>{
      if(data.status){
        setpatientData(data.viewRes);
      }
    })
  }

  return (
    <>
      <h1 className='text-center'>Patient Management System </h1>
      <div className='p-2 d-flex gap-2'>
        <div className='col-md-4 bg-dark text-white p-3 rounded'>
          <form onSubmit={insertData}>
            <label className='form-label'>Patient Id: </label>
            <input 
            type="text" 
            name="id" 
            className='form-control'
            value={patientData.id}
            onChange={getValues}
             />
            <label className='form-label'>Patient full name: </label>
            <input 
            type="text" 
            name="name" 
            className='form-control'
            value={patientData.name}
            onChange={getValues}
             />
            <label className='form-label'>Date of birth: </label>
            <input 
            type="date" 
            name="dob" 
            className='form-control'
            value={patientData.dob}
            onChange={getValues}
             />
            <label className='form-label'>Blood Group: </label>
            <input 
            type="text" 
            name="blood" 
            className='form-control'
            value={patientData.blood}
            onChange={getValues}
             />
            <label className='form-label'>Emergency contact: </label>
            <input 
            type="text" 
            name="contact" 
            className='form-control'
            value={patientData.contact}
            onChange={getValues}
             />
            <label className='form-label'>Last date of visit: </label>
            <input 
            type="date" 
            name="dov" 
            className='form-control'
            value={patientData.dov}
            onChange={getValues}
             />
            <div className='form-check mt-3'>
              <label className='form-check-label'>Is chronic condition </label>
              <input 
              type="checkbox" 
              name="chronic" 
              className='form-check-input'
              value={patientData.chronic}
              onChange={getValues}
               />
            </div>
            <button type="submit" className='form-control mt-2 btn btn-success'>{
            (patientData._id)?"Update patient details":"Add patient details"}</button>
          </form>
        </div>
        <div className='col-md-8 bg-dark text-white p-3 rounded'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Patient Id</th>
                <th>Patient Name</th>
                <th>DOB</th>
                <th>Blood Group</th>
                <th>Emergency contact</th>
                <th>Last Visit</th>
                <th>Is Chronic</th>
                <th>Actions</th>
              </tr>
            </thead>
            {
              patientList.map((item,index)=>{
                return(
                  <>
                  <thead className='text-center align-middle'>
                    <tr>
                      <td>{index+1}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{new Date(item.dob).toLocaleDateString("en-GB")}</td>
                      <td>{item.blood}</td>
                      <td>{item.contact}</td>
                      <td>{new Date(item.dov).toLocaleDateString("en-GB")}</td>
                      <td>{(item.chronic)?"Positive":"Negative"}</td>
                      <td>
                        <button className='btn btn-warning m-1' onClick={()=>getSingleDetail(item._id)}>Edit</button>
                        <button className='btn btn-danger m-1' onClick={()=>deleteDetails(item._id)}>Delete</button>
                      </td>
                    </tr>
                  </thead>
                  </>
                )
              })
            }
          </table>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default App
