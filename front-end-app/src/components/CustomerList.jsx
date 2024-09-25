import React from 'react'

const CustomerList = (props) => {
  return (
    <div className="card p-1">
      <h2>Customer list</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {
              props.data.map(customer =>(
                <tr key={customer.id} onClick={() => props.selectUserInForm(customer.name, customer.email, customer.password, customer.id)} >
                  <td style={{ fontWeight: props.customerIdForm === customer.id ? 'bold' : 'normal' }}>{customer.name}</td>
                  <td style={{ fontWeight: props.customerIdForm === customer.id ? 'bold' : 'normal' }}>{customer.email}</td>
                  <td style={{ fontWeight: props.customerIdForm === customer.id ? 'bold' : 'normal' }}>{customer.password}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default CustomerList
