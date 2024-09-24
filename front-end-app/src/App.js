import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {

  let [customerList, setCustomerList] = React.useState([
    {"id":"1", "name":"Sergio", "email":"sergio.navarrete@adp.com", "password":"1234"},
    {"id":"2", "name":"Marc", "email":"marc.cives@adp.com", "password":"3333"},
    {"id":"3", "name":"Magesh", "email":"magesh.instructor@adp.com", "password":"1010"}
  ])

  return (
    <div className="App">
        <h2>Customer list</h2>

        <table cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {
              customerList.map(customer =>(
                <tr key={customer.id} onClick={() => console.log(customer.name)}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.password}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <h2>Update</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" name="name"></input>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email"></input>
          </div>
          <div>
            <label>Password:</label>
            <input type="text" name="password"></input>
          </div>
        </form>

        <div name="divButtons" padding="left">
            <button onClick={() => console.log("Delete")}>Delete</button>
            <button onClick={() => console.log("Save")}>Save</button>
            <button onClick={() => console.log("Cancel")}>Cancel</button>
          </div>

       

    </div>
  );
}

export default App;
