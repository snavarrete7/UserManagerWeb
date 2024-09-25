import './App.css';
import React from 'react'
import { deleteById, getAll, get, post, put } from './memdb';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';


function App() {

  // let [customerList, setCustomerList] = React.useState([
  //   {"id":"1", "name":"Sergio", "email":"sergio.navarrete@adp.com", "password":"1234"},
  //   {"id":"2", "name":"Marc", "email":"marc.cives@adp.com", "password":"3333"},
  //   {"id":"3", "name":"Magesh", "email":"magesh.instructor@adp.com", "password":"1010"}
  // ])

  let [customerList, setCustomerList] = React.useState([])

  React.useEffect(() => {
    getAll(setCustomerList)
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
      // const customerDeleted = get(id)
      // console.log('Delete Customer ID: ' + id + " Name: " + customerDeleted.name);
      deleteById(id, setCustomerList);

      //const updatedCustomers = getAll()

      //setCustomerList([...updatedCustomers])

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
      post(newCustomer,setCustomerList)
      console.log("ADD USER ID: " + newCustomer.id + " NAME: " + newCustomer.name)
    }else{
      put(id, newCustomer, setCustomerList)
      console.log("UPDATE USER ID: " + newCustomer.id + " NAME: " + newCustomer.name)
    }

    //const customerListUpdated = getAll()
    //setCustomerList([...customerListUpdated])
    setCustomerIdForm("")
    setCustomerNameForm("")
    setCustomerEmailForm("")
    setCustomerPassForm("")
    setFormMode("Add")
  }

  return (
    <div className="App">

        <CustomerList data={customerList} selectUserInForm={selectUserInForm} customerIdForm={customerIdForm}/>

        <CustomerForm customerIdForm={customerIdForm} customerNameForm={customerNameForm} customerEmailForm={customerEmailForm} customerPassForm={customerPassForm}
        formMode={formMode} handleChangeNameForm={handleChangeNameForm} handleChangeEmailForm={handleChangeEmailForm} handleChangePassForm={handleChangePassForm}
        clickCancel={clickCancel} clickDelete={clickDelete} clickSave={clickSave}/>

    </div>
  );
}

export default App;
