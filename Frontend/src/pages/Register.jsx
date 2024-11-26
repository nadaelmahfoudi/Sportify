import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import Signup from '../assets/Signup.svg';

function Register() {
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setSuccessMessage('');
      return;
    }
  
    try {
      console.log('Form data being sent:', formData); // Log the form data
  
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
  
      if (response.status === 201) {
        setSuccessMessage('Registration successful! Please log in.');
        setErrorMessage('');
        navigate('/login');
      }
    } catch (error) {
      console.log('Error during registration:', error); // Log the error
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during registration. Please try again.');
      }
      setSuccessMessage('');
    }
  };
  

  return (
    <div>
      <Navbar />
      <section className="ezy__signup15 light flex items-center justify-center py-14 md:py-24 bg-gray-600 dark:bg-[#0b1727] text-black text-opacity-90 dark:text-white">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center">
            <div className="w-full md:w-2/3">
              <div className="bg-gray-700 dark:bg-slate-800 shadow-xl p-6 lg:p-12">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="w-full lg:w-1/2 lg:order-2">
                    <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
                      <img src={Signup} alt="Signup Illustration" />
                      <div className="text-center mt-12">
                        <Link
                          to="/login"
                          className="underline hover:text-green-500 duration-300 text-white"
                        >
                          I am already a member
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                    <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                      <h2 className="text-3xl md:text-[45px] font-bold mb-2 text-white">
                        Sign Up
                      </h2>

                      {/* Display success message */}
                      {successMessage && (
                        <p className="text-green-500 bg-green-100 p-4 mt-4 rounded-lg">
                          {successMessage}
                        </p>
                      )}

                      {/* Display error message */}
                      {errorMessage && (
                        <p className="text-red-500 bg-red-100 p-4 mb-4 rounded-lg">
                          {errorMessage}
                        </p>
                      )}

                      <form onSubmit={handleSubmit} className="mt-6">
                        <div className="w-full relative mb-6">
                          <input
                            type="text"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2"
                            id="name" // Updated ID to match backend field
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="email"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2"
                            id="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="password"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full relative mb-6">
                          <input
                            type="password"
                            className="bg-transparent border-b dark:border-gray-200 focus:outline-none focus:border-green-500 text-white text-sm w-full py-2"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4"
                        >
                          Register <i className="fas fa-arrow-right"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Register;
