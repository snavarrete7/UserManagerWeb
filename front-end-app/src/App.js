import './App.css';
import React from 'react'

function App() {

  let [customerList, setCustomerList] = React.useState([
    {"id":"1", "name":"Sergio", "email":"sergio.navarrete@adp.com", "password":"1234"},
    {"id":"2", "name":"Marc", "email":"marc.cives@adp.com", "password":"3333"},
    {"id":"3", "name":"Magesh", "email":"magesh.instructor@adp.com", "password":"1010"}
  ])

  let [customerIdForm, setCustomerIdForm] = React.useState("")
  let [customerNameForm, setCustomerNameForm] = React.useState("")
  let [customerEmailForm, setCustomerEmailForm] = React.useState("")
  let [customerPassForm, setCustomerPassForm] = React.useState("")


  const selectUserInForm = (name, email, pass, id) =>{
    if(id === customerIdForm){
      setCustomerNameForm("")
      setCustomerEmailForm("")
      setCustomerPassForm("")
      setCustomerIdForm("")
    }else{
      setCustomerNameForm(name)
      setCustomerEmailForm(email)
      setCustomerPassForm(pass)
      setCustomerIdForm(id)
    }
  }

  const handleChangeNameForm = (e) => {
    setCustomerNameForm(e.target.value)
  }
  const handleChangeEmailForm = (e) => {
    setCustomerEmailForm(e.target.value)
  }
  const handleChangePassForm = (e) => {
    setCustomerPassForm(e.target.value)
  }

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
                <tr key={customer.id} onClick={() => selectUserInForm(customer.name, customer.email, customer.password, customer.id)}>
                  <td style={{ fontWeight: customerIdForm === customer.id ? 'bold' : 'normal' }}>{customer.name}</td>
                  <td style={{ fontWeight: customerIdForm === customer.id ? 'bold' : 'normal' }}>{customer.email}</td>
                  <td style={{ fontWeight: customerIdForm === customer.id ? 'bold' : 'normal' }}>{customer.password}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <h2>Update</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={customerNameForm} onChange={handleChangeNameForm}></input>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={customerEmailForm} onChange={handleChangeEmailForm}></input>
          </div>
          <div>
            <label>Password:</label>
            <input type="text" name="password" value={customerPassForm} onChange={handleChangePassForm}></input>
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
