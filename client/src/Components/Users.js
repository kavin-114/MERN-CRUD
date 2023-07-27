import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/deleteUser/" + id)
      .then(result => {
        console.log(result);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="d-flex vh-100 w-100 bg-dark justify-content-center align-items-center">
        <div className="w-md-75 w-sm-75 w-50 bg-secondary-subtle rounded p-3 table-responsive">
          <Link to='/create' className="btn btn-success m-2">Add +</Link>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Age</th>
                <th scope="col">Location</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.age}</td>
                      <td>{user.location}</td>
                      <td>
                        <Link to={`/update/${user._id}`}>
                          <button className="btn btn-warning">Update</button>
                        </Link>
                        <button className="btn btn-danger m-2" onClick={(e) => handleDelete(user._id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
