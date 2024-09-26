import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary mb-4'>
        <div className='container-fluid'>
            <Link to="/" className='navbar-brand'>
                <h2>User Management</h2>
            </Link>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item me-4">
                    <Link to="/" className='nav-link text-white fs-4'>Home</Link>
                </li>
                <li className="nav-item me-4">
                    <Link to="/add" className='nav-link text-white fs-4'>{props.formMode === "Add" ? "Add" : "Update"}</Link>
                </li>
                <li className="nav-item me-4 mt-2">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button  className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
