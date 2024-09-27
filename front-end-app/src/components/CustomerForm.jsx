import React from 'react'
import { Link } from 'react-router-dom'

const CustomerForm = (props) => {
  return (
    <div className="card p-3">
        <h2 className="mb-4">{props.customerIdForm === "" ? "Add" : "Update"}</h2>
        <form>
          <div className="form-group">
            <label htmlFor='name'>Name:</label>
            <input id="name" type="text" name="name" className="form-control" value={props.customerNameForm} onChange={props.handleChangeNameForm} required></input>
          </div>
          <div className="form-group">
            <label htmlFor='email'>Email:</label>
            <input id='email' type="email" name="email" className="form-control" value={props.customerEmailForm} onChange={props.handleChangeEmailForm} required></input>
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password:</label>
            <input id='password' type="text" name="password" className="form-control" value={props.customerPassForm} onChange={props.handleChangePassForm} required></input>
          </div>
        </form>

        <div name="divButtons" padding="left" className="d-flex justify-content-between mt-4">
            <button className="btn btn-danger" onClick={() => props.clickDelete(props.customerIdForm)}>Delete</button>
            <button className="btn btn-primary" onClick={() => props.clickSave(props.formMode)}>{props.customerIdForm === "" ? "Save" : "Update"}</button>
            {/* <button className="btn btn-secondary" onClick={() => props.clickCancel(props.customerIdForm)}>Cancel</button> */}
            <Link to="/" className="btn btn-secondary" onClick={() => props.clickCancel(props.customerIdForm)}>Cancel</Link>
          </div>
    </div>
  )
}

export default CustomerForm
