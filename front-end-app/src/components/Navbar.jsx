import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import icon from '../assets/icon.webp'

const Navbar = (props) => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary mb-4'>
        <div className='container-fluid'>
          <Link to="/" className='navbar-brand d-flex align-items-center'>
            <img
              src={icon}
              alt="Logo"
              style={{ width: '85px', height: '50px' }}
            />
            <h2 className="nav-item ml-auto">User Management</h2>
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item me-4">
              <Link to="/" className='nav-link text-white fs-4'>Home</Link>
            </li>
            <li className="nav-item me-4">
              <Link to="/add" className='nav-link text-white fs-4'>{props.formMode === "Add" ? "Add" : "Update"}</Link>
            </li>
            <li className="nav-item me-4 mt-2">
              <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" onChange={props.handleSearchTerm} />

              </form>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
