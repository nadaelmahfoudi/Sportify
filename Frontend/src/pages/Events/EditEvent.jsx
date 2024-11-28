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
    image: '', // Nouvelle propriété pour l'image
  });
  const [previewImage, setPreviewImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/event/${eventId}`);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          date: response.data.date.split('T')[0],
          location: response.data.location,
          image: response.data.image,
        });
        setPreviewImage(`http://localhost:5000${response.data.image}`);
      } catch (err) {
        setError('Failed to load event data');
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('location', formData.location);
    if (formData.image) formDataToSend.append('image', formData.image);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/events/${eventId}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
      navigate('/dashboard');
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
        <div>
          {previewImage && (
            <img src={previewImage} alt="Event Preview" className="w-48 h-48 mb-4" />
          )}
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="block w-full border px-4 py-2 rounded-md"
          />
        </div>
        <button type="submit" className="block w-full bg-blue-600 text-white px-8 py-2 rounded-md">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
