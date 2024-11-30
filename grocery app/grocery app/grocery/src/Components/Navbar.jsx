import React from 'react';
import './Store.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = ({ searchQuery, setSearchQuery }) => {
    // This function handles the search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Prevent form submission to avoid page reload
    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Fresh Grocery</a>

            {/* Toggle button for collapsing the navbar */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"  // Corrected data-bs-toggle
                data-bs-target="#navbarSupportedContent"  // Corrected data-bs-target
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar content */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home </a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center" to='/Cart'>
                            Cart
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-cart-check-fill ml-2"
                                viewBox="0 0 16 16"
                            >
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                            </svg>
                        </Link>
                    </li>
                </ul>

                {/* Search Form */}
                <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchQuery}  // Bind the value to the searchQuery state
                        onChange={handleSearchChange}  // Update the searchQuery state on input change
                    />
                </form>
            </div>
        </nav>
    );
};

export default Navbar;