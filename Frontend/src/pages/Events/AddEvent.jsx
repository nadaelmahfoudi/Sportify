import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validateEvent from '../../validations/validateEvent'; // Adjust the path if needed

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null,
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEvent(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('location', formData.location);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
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
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
        />
        {errors.date && <p className="text-red-500">{errors.date}</p>}

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
        />
        {errors.location && <p className="text-red-500">{errors.location}</p>}

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="block w-full border px-4 py-2 rounded-md"
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}

        <button
          type="submit"
          className="block w-full bg-blue-600 text-white px-8 py-2 rounded-md"
        >
          Create Event
        </button>
        {message && <p className="text-green-500">{message}</p>}
      </form>
      <button
        onClick={() => navigate('/dashboard')}
        className="my-4 block bg-indigo-600 border text-white px-8 py-2 hover:opacity-90 rounded-md"
      >
        Retour !
      </button>
    </div>
  );
};

export default AddEvent;
