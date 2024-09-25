import './App.css';
import React from 'react'
import { deleteById, getAll, get, post, put } from './memdb';


function App() {

  // let [customerList, setCustomerList] = React.useState([
  //   {"id":"1", "name":"Sergio", "email":"sergio.navarrete@adp.com", "password":"1234"},
  //   {"id":"2", "name":"Marc", "email":"marc.cives@adp.com", "password":"3333"},
  //   {"id":"3", "name":"Magesh", "email":"magesh.instructor@adp.com", "password":"1010"}
  // ])

  let [customerList, setCustomerList] = React.useState([])

  React.useEffect(() => {
    const customers = getAll()
    setCustomerList(customers)
  }, []);

  let [customerIdForm, setCustomerIdForm] = React.useState("")
  let [customerNameForm, setCustomerNameForm] = React.useState("")
  let [customerEmailForm, setCustomerEmailForm] = React.useState("")
  let [customerPassForm, setCustomerPassForm] = React.useState("")

  let[formMode, setFormMode] = React.useState("Add")

  const selectUserInForm = (name, email, pass, id) =>{
    if(id === customerIdForm){
      setCustomerNameForm("")
      setCustomerEmailForm("")
      setCustomerPassForm("")
      setCustomerIdForm("")
      setFormMode("Add")
    }else{
      setCustomerNameForm(name)
      setCustomerEmailForm(email)
      setCustomerPassForm(pass)
      setCustomerIdForm(id)
      setFormMode("Update")
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

  const clickCancel = (id) =>{
    // if(id !== ""){
    //   setCustomerNameForm("")
    //   setCustomerEmailForm("")
    //   setCustomerPassForm("")
    //   setCustomerIdForm("")
    //   setFormMode("Add")
    // }else{
    //   console.log("No customer selected")
    // }
    setCustomerNameForm("")
    setCustomerEmailForm("")
    setCustomerPassForm("")
    setCustomerIdForm("")
    setFormMode("Add")

  }

  const clickDelete = (id) => {
    if(id !== ""){
      const customerDeleted = get(id)
      console.log('Delete Customer ID: ' + id + " Name: " + customerDeleted.name);
      deleteById(id);

      const updatedCustomers = getAll()

      setCustomerList([...updatedCustomers])
      setCustomerIdForm("")
      setCustomerNameForm("")
      setCustomerEmailForm("")
      setCustomerPassForm("")
      setFormMode("Add")
    }else{
      console.log("No customer selected")
    }
  }

  const clickSave = (mode) =>{
    const id = customerIdForm
    const name = customerNameForm
    const password = customerPassForm
    const email = customerEmailForm
    const newCustomer = {"id":id, "name":name, "email":email, "password":password}

    if(name === "" || password === "" || email === ""){
      console.log("Empty input value")
      return
    }

    if(mode === "Add"){
      post(newCustomer)
      console.log("ADD USER ID: " + newCustomer.id + " NAME: " + newCustomer.name)
    }else{
      put(id, newCustomer)
      console.log("UPDATE USER ID: " + newCustomer.id + " NAME: " + newCustomer.name)
    }

    const customerListUpdated = getAll()
    setCustomerList([...customerListUpdated])
    setCustomerIdForm("")
    setCustomerNameForm("")
    setCustomerEmailForm("")
    setCustomerPassForm("")
    setFormMode("Add")
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

        <h2>{customerIdForm === "" ? "Add" : "Update"}</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={customerNameForm} onChange={handleChangeNameForm} required></input>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={customerEmailForm} onChange={handleChangeEmailForm} required></input>
          </div>
          <div>
            <label>Password:</label>
            <input type="text" name="password" value={customerPassForm} onChange={handleChangePassForm} required></input>
          </div>
        </form>

        <div name="divButtons" padding="left">
            <button onClick={() => clickDelete(customerIdForm)}>Delete</button>
            <button onClick={() => clickSave(formMode)}>{customerIdForm === "" ? "Save" : "Update"}</button>
            <button onClick={() => clickCancel(customerIdForm)}>Cancel</button>
          </div>

       

    </div>
  );
}

export default App;
