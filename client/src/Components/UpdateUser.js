import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

export function UpdateUser(){
    const {id} = useParams()
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/getUser/'+id)
    .then(result => {console.log(result)
        setName(result.data.name)
        setEmail(result.data.email)
        setPhone(result.data.phone)
        setAge(result.data.age)
        setLocation(result.data.location)
    })
    .catch(err => console.log(err))
}, [])

const Update = (e) => {
    e.preventDefault();
    const userData = {
        name: name,
        email: email,
        phone: phone,
        age: age,
        location: location,
      };
    axios.put('http://localhost:3001/updateUser/'+id, userData)
    .then(result => {
        console.log(result)
        navigate('/')
    })
}

    return(
        <>
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
        <div className="w-50 p-3 rounded-3 bg-light">
        <form onSubmit={Update}>
        <h2 className="text-center">Update User</h2>
        <div className="mb-2">
            <label htmlFor="">Name</label>
            <input type='text' placeholder="Enter Name" className="form-control"
            value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="mb-2">
            <label htmlFor="">Email</label>
            <input type='text' placeholder="Enter your email" className="form-control"
            value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-2">
            <label htmlFor="">Phone</label>
            <input type='text' maxLength={10} placeholder="Enter your number" className="form-control"
            value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="mb-2">
            <label htmlFor="">Age</label>
            <input type='text' placeholder="Enter your age" className="form-control"
            value={age} onChange={(e) => setAge(e.target.value)}/>
        </div>
        <div className="mb-2">
            <label htmlFor="">Location</label>
            <input type='text' placeholder="Enter your location" className="form-control"
            value={location} onChange={(e) => setLocation(e.target.value)}/>
        </div>
        <button className="btn btn-warning">Update</button>
    </form>
    </div>
     </div>
    </>
    );
}