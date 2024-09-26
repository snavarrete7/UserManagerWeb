import './App.css';
import React from 'react'
import { deleteById, getAll, post, put } from './memdb';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  let [customerList, setCustomerList] = React.useState([])
  let [nCustomers, setNCustomers] = React.useState(0)

  React.useEffect(() => {
    getAll(setCustomerList, setNCustomers)
  }, []);

  let [customerIdForm, setCustomerIdForm] = React.useState("")
  let [customerNameForm, setCustomerNameForm] = React.useState("")
  let [customerEmailForm, setCustomerEmailForm] = React.useState("")
  let [customerPassForm, setCustomerPassForm] = React.useState("")

  let [formMode, setFormMode] = React.useState("Add")

  const selectUserInForm = (name, email, pass, id) => {
    if (id === customerIdForm) {
      setCustomerNameForm("")
      setCustomerEmailForm("")
      setCustomerPassForm("")
      setCustomerIdForm("")
      setFormMode("Add")
    } else {
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

  const clickCancel = (id) => {
    setCustomerNameForm("")
    setCustomerEmailForm("")
    setCustomerPassForm("")
    setCustomerIdForm("")
    setFormMode("Add")

  }

  const clickDelete = (id) => {
    if (id !== "") {

      deleteById(id, setCustomerList, setNCustomers);

      setCustomerIdForm("")
      setCustomerNameForm("")
      setCustomerEmailForm("")
      setCustomerPassForm("")
      setFormMode("Add")
    } else {
      console.log("No customer selected")
    }
  }

  const clickSave = (mode) => {
    const id = customerIdForm
    const name = customerNameForm
    const password = customerPassForm
    const email = customerEmailForm
    const newCustomer = { "id": id, "name": name, "email": email, "password": password }

    if (name === "" || password === "" || email === "") {
      console.log("Empty input value")
      return
    }

    if (mode === "Add") {
      post(newCustomer, setCustomerList, setNCustomers)
      console.log("ADD USER ID: " + newCustomer.id + " NAME: " + newCustomer.name)
    } else {
      put(id, newCustomer, setCustomerList, setNCustomers)
      console.log("UPDATE USER ID: " + newCustomer.id + " NAME: " + newCustomer.name)
    }

    setCustomerIdForm("")
    setCustomerNameForm("")
    setCustomerEmailForm("")
    setCustomerPassForm("")
    setFormMode("Add")
  }

  return (
    <Router>
      <div className="container mt-5">
        <Navbar formMode={formMode} />
        <div className="row">
          <div className="col-md-10">
            <Routes>
              <Route
                path='/'
                element={
                  <div className="col-md-9">
                  <CustomerList
                    data={customerList}
                    selectUserInForm={selectUserInForm}
                    customerIdForm={customerIdForm}
                    nCustomers={nCustomers}
                  />
                  </div>
                }
              />

              <Route
                path='/add'
                element={
                  <div className="col-md-9">
                  <CustomerForm
                    customerIdForm={customerIdForm}
                    customerNameForm={customerNameForm}
                    customerEmailForm={customerEmailForm}
                    customerPassForm={customerPassForm}
                    formMode={formMode}
                    handleChangeNameForm={handleChangeNameForm}
                    handleChangeEmailForm={handleChangeEmailForm}
                    handleChangePassForm={handleChangePassForm}
                    clickCancel={clickCancel}
                    clickDelete={clickDelete}
                    clickSave={clickSave}
                    setNCustomers={setNCustomers}
                  />
                </div>
                }
              />
            </Routes>
          </div>

        </div>
      </div>
    </Router>

  );
}

export default App;
