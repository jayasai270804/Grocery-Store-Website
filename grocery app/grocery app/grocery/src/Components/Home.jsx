import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css'; // Add custom styles if needed

const Home = () => {
  return (
    <div className="home-container d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1>Fresh Grocery</h1>
        <div className="mt-4">
          {/* Login Button */}
          <Link to="/login" className="btn btn-primary mx-2">
            Login
          </Link>

          {/* Registration Button */}
          <Link to="/registration" className="btn btn-secondary mx-2">
            Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
