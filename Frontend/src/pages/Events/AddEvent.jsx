import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null,  // Add a field for the image
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });  // Handle the file input separately
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('location', formData.location);
    if (formData.image) {
      formDataToSend.append('image', formData.image);  // Add image to form data
    }

    try {
      const response = await axios.post('http://localhost:5000/api/events/create', formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
      setMessage(response.data.message);
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
      setMessage('Error occurred while creating the event.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
        />
        <button
          type="submit"
          className="block w-full bg-blue-600 text-white px-8 py-2 rounded-md"
        >
          Create Event
        </button>
        {message && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default AddEvent;
