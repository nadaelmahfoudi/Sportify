import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEvent = () => {
  const { eventId } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing event data when component loads
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/event/${eventId}`);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          date: response.data.date.split('T')[0], // Adjust date format if needed
          location: response.data.location,
        });
      } catch (err) {
        setError('Failed to load event data');
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${eventId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage(response.data.message);
      navigate('/dashboard'); // Redirect to the Dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Event</h1>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="block w-full border px-4 py-2 rounded-md"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
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
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="block w-full border px-4 py-2 rounded-md"
          required
        />
        <button type="submit" className="block w-full bg-blue-600 text-white px-8 py-2 rounded-md">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
