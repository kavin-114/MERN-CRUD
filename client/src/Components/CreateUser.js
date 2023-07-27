import React, { useState } from "react";
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom'

export function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate()

  const Submit = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      phone: phone,
      age: age,
      location: location,
    };

    axios.post('http://localhost:3001/createUser', userData)
      .then(response => {
        console.log("User created:", response.data);
        navigate('/')
        setName('');
        setEmail('');
        setPhone('');
        setAge('');
        setLocation('');
      })
      .catch(error => console.log("Error creating user:", error));
  };

  return (
    <>
      <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
        <div className="w-50 p-3 rounded-3 bg-light">
          <form onSubmit={Submit}>
            <h2 className="text-center">Add User</h2>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input type='text' id="name" placeholder="Enter Name" className="form-control" value={name}
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input type='text' id="email" placeholder="Enter your email" className="form-control" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-2">
              <label htmlFor="phone">Phone</label>
              <input type='tel' id="phone" maxLength={10} placeholder="Enter your number" className="form-control" value={phone}
                onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-2">
              <label htmlFor="age">Age</label>
              <input type='text' id="age" placeholder="Enter your age" className="form-control" value={age}
                onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="mb-2">
              <label htmlFor="location">Location</label>
              <input type='text' id="location" placeholder="Enter your location" className="form-control" value={location}
                onChange={(e) => setLocation(e.target.value)} />
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
