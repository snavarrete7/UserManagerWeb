import React from 'react'

const CustomerForm = (props) => {
  return (
    <div>
        <h2>{props.customerIdForm === "" ? "Add" : "Update"}</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={props.customerNameForm} onChange={props.handleChangeNameForm} required></input>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={props.customerEmailForm} onChange={props.handleChangeEmailForm} required></input>
          </div>
          <div>
            <label>Password:</label>
            <input type="text" name="password" value={props.customerPassForm} onChange={props.handleChangePassForm} required></input>
          </div>
        </form>

        <div name="divButtons" padding="left">
            <button onClick={() => props.clickDelete(props.customerIdForm)}>Delete</button>
            <button onClick={() => props.clickSave(props.formMode)}>{props.customerIdForm === "" ? "Save" : "Update"}</button>
            <button onClick={() => props.clickCancel(props.customerIdForm)}>Cancel</button>
          </div>
    </div>
  )
}

export default CustomerForm
